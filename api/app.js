// Import the necessary modules and create an instance of the Express application to act as the server for the API
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const path = require('path');

// Import the dotenv package to manage env variables
require('dotenv').config();

// Set secure HTTP headers
app.use(helmet());

// Allow requests from the S3-hosted frontend origin
const allowedOrigins = [process.env.FRONTEND_ORIGIN, 'https://my-bucket.s3.amazonaws.com'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

// Allow the app to read JSON data from the request body
app.use(express.json());

// Create a static web page
app.use(express.static(path.join(__dirname, '../public')));

// Import the router to define the routes for the API
app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api', require('./routes/charactersRoutes.js'));

// Centralized error handler - must be last
app.use(require('./middleware/errorHandler.js'));

module.exports = app;


