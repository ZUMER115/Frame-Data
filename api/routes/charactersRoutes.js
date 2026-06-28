// Import the Express library and create a new router to define routes for the API
const router = require('express').Router();

// Import the relevant controller functions to handle the logic for each route
const {
    getCharacters,
    addCharacters,
    getMoves,
    addMoves,
    getFrameData,
    addFrameData,
    updateFrameData,
    deleteFrameData }
    = require('../controllers/charactersController.js');

// Import the authentication middleware to protect certain routes
router.use(require('../middleware/authMiddleware.js'));


// Define a route for GET requests to get characters from the database
router.get('/characters', getCharacters);

// Define a route for POST requests to add characters to the database
router.post('/characters', addCharacters)

// Define a route for GET requests to get moves from the database
router.get('/moves', getMoves);

// Define a route for POST requests to add moves to the database
router.post('/moves', addMoves)

// Define a route for GET requests to get the frame data for a specific character's moves from the database
router.get('/frame-data/:characterName', getFrameData);

// Define a route for POST requests to add frame data for specific character's moves to the database
router.post('/frame-data', addFrameData);

// Define a route to update frame data for a specific character's move in the database
router.put('/frame-data/:characterName/:move', updateFrameData);

// Define a route to delete frame data for a specific character's move from the database
router.delete('/frame-data/:characterName/:move', deleteFrameData);

module.exports = router;