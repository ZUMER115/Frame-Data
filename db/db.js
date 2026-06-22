// Import the postgreSQL framework
const { Pool } = require('pg');

// Import the dotenv package to manage env variables
require('dotenv').config();


// Create a pool instance to mange connections to the database
const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

module.exports = pool;