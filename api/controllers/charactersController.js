// Import the pool connections to the database so we can connect to the database and perform queries
const pool = require('../../db/db.js');

// Define a function to get all characters from the database
const getCharacters = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM characters');
        if (result.rowCount === 0) {
            return res.status(404).json({message: "No characters found"});
        }
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

// Define a function to add a character to the database
const addCharacters =  async (req, res) => {
    const { name} = req.body;
    try {
        const result = await pool.query('INSERT INTO characters (name) VALUES ($1) RETURNING *', [name]);
        if (result.rowCount === 0) {
            return res.status(400).json("Failed to add character");
        }
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

// Define a function to get all moves from the database
const getMoves = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM moves');
        if (result.rowCount === 0) {
            return res.status(404).json({message: "No moves found"});
        } 
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

// Define a function to add a move to the database
const addMoves = async (req, res) => {
    const { move } = req.body;
    try {
    const result = await pool.query('INSERT INTO moves (move) VALUES ($1) RETURNING *', [move]);
    if (result.rowCount === 0) {
        return res.status(404).json({message: "Failed to add move"});
    }
    return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

// Define a function to get the frame data for a specific character's moves from the database
const getFrameData = async (req, res) => {
    const { characterName } = req.params;
    const characterID = await pool.query('SELECT id FROM characters WHERE name = $1', [characterName]);
    if (characterID.rowCount === 0) {
        return res.status(404).json({message: "Character not found"});
    }
    try {
        const result = await pool.query('\
            SELECT characters.name, moves.move, frame_data.startup, frame_data.on_block, frame_data.recovery, frame_data.on_hit, frame_data.notes \
            FROM frame_data \
            JOIN characters ON frame_data.characters_id = characters.id \
            JOIN moves ON frame_data.moves_id = moves.id \
            WHERE characters.name = $1', [characterName]);
        if (result.rowCount === 0) {
            return res.status(400).json({message: "No frame data found for this character"});
        }
            return res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

// Define a function to add frame data for specific character's moves to the database
const addFrameData =  async (req, res) => {
    const { character, move, startup, on_block, recovery, on_hit, notes } = req.body;
    const characterID = await pool.query('SELECT id FROM characters WHERE name = $1', [character]);
    if (characterID.rowCount === 0) {
        return res.status(404).json({message: "Character not found"});
    }
    const moveID = await pool.query('SELECT id FROM moves WHERE move = $1', [move]);
    if (moveID.rowCount === 0) {
        return res.status(404).json({message: "Move not found"});
    }
    try {
        const result = await pool.query('\
            INSERT INTO frame_data (characters_id, moves_id, startup, on_block, recovery, on_hit, notes) \
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
            [characterID.rows[0].id, moveID.rows[0].id, startup, on_block, recovery, on_hit, notes]);
        if (result.rowCount === 0) {
            return res.status(400).json({message: "Failed to add frame data"});
        }
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

// Define a route to update frame data for a specific character's move in the database
const updateFrameData =  async (req, res) => {
    const { characterName, move } = req.params;
    const { startup, on_block, recovery, on_hit, notes } = req.body;
    const characterID = await pool.query('SELECT id FROM characters WHERE name = $1', [characterName]);
    if (characterID.rowCount === 0) {
        return res.status(404).json({message: "Character not found"});
    }
    const moveID = await pool.query('SELECT id FROM moves WHERE move = $1', [move]);
    if (moveID.rowCount === 0) {
        return res.status(404).json({message: "Move not found"});
    }
    try {
        const result = await pool.query('\
            UPDATE frame_data \
            SET startup = $1, on_block = $2, recovery = $3, on_hit = $4, notes = $5 \
            WHERE characters_id = $6 AND moves_id = $7 RETURNING *',
            [startup, on_block, recovery, on_hit, notes, characterID.rows[0].id, moveID.rows[0].id]);
        if (result.rowCount === 0) {
            return res.status(400).json({message: "Failed to update frame data"});
        }
        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

// Define a route to delete frame data for a specific character's move from the database
const deleteFrameData =  async (req, res) => {
    const { characterName, move } = req.params;
    const characterID = await pool.query('SELECT id FROM characters WHERE name = $1', [characterName]);
    if (characterID.rowCount === 0) {
        return res.status(404).json({message: "Character not found"});
    }
    const moveID = await pool.query('SELECT id FROM moves WHERE move = $1', [move]);
    if (moveID.rowCount === 0) {
        return res.status(404).json({message: "Move not found"});
    }
    try {
        const result = await pool.query('\
            DELETE FROM frame_data \
            WHERE characters_id = $1 AND moves_id = $2 RETURNING *',
            [characterID.rows[0].id, moveID.rows[0].id]);
        if (result.rowCount === 0) {
            return res.status(400).json({message: "Failed to delete frame data"});
        }
        return res.status(200).json({message: "Frame data deleted successfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

// Export the functions so they can be used in the routes
module.exports = {
    getCharacters,
    addCharacters,
    getMoves,
    addMoves,
    getFrameData,
    addFrameData,
    updateFrameData,
    deleteFrameData
};