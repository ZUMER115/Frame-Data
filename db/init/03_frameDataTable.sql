CREATE TABLE IF NOT EXISTS frame_data (
    id SERIAL PRIMARY KEY,
    characters_id INTEGER REFERENCES characters(id),
    moves_id INTEGER REFERENCES moves(id),
    startup INTEGER NOT NULL,
    on_block INTEGER,
    recovery INTEGER,
    on_hit INTEGER,
    notes TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_frameData_character_move ON frame_data(characters_id, moves_id);