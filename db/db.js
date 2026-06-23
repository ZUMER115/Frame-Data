// Import the postgreSQL framework
const { Pool } = require('pg');

// Import the dotenv package to manage env variables
require('dotenv').config();


// Create a pool instance to mange connections to the database
const pool = new Pool ({
    user: process.env.POSTGRES_USER,
    host: process.env.DB_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.DB_PORT,
})

module.exports = pool;