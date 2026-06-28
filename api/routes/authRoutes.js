// Import the express library and create a new router to define routes for the API
const router = require('express').Router();

// Import the relevant controller functions to handle the logic for each route
const { registerUser, loginUser } = require('../controllers/authController.js');

// Import the rate limiter middleware to limit the number of requests a user can make to the authentication routes within a certain time frame
const { rateLimiter } = require('../middleware/rateLimiter.js');

// Apply the rate limiter middleware to the authentication routes
router.use(rateLimiter);

// Define a route for POST requests to register a new user
router.post('/register', registerUser)

// Define a route for POST requests to log in an existing user
router.post('/login', loginUser)

// Export the router to be used in the main application
module.exports = router;