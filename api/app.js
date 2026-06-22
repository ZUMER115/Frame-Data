// Import the necessary modules and create an instance of the Express application to act as the server for the API
const express = require('express');
const app = express();

// Import the dotenv package to manage env variables
require('dotenv').config();

// Allow the app to read JSON data from the request body
app.use(express.json());

// Import the router to define the routes for the API
app.use('/api', require('./routes/charactersRoutes.js'));

module.exports = app;


