// Import the necessary modules
const pool = require('../../db/db.js');

// Import the bcrypt package to hash passwords
const bcrypt = require('bcrypt');

// Import the jsonwebtoken package to generate and verify JWT tokens
const jwt = require('jsonwebtoken');

// Import the dotenv package to manage env variables
require('dotenv').config();

// Import the validation schemas
const { registerSchema, loginSchema } = require('../validation/authValidation.js');


// Define a function to handle user registration
const registerUser = async (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { username, password } = req.body;
    try {
        // Check if the username already exists in the database
        const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (existingUser.rowCount > 0) {
            return res.status(400).json({message: "Username already exists"});
        }
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert the new user into the table
        const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
        if (result.rowCount === 0) {
            return res.status(400).json({message: "Failed to register user"});
        }
        res.status(201).json({message: "User registered successfully", user: result.rows[0].username});
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

// Define a function to handle user login
const loginUser = async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { username, password } = req.body;
    try {
        // Check if the username exists in the database
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rowCount === 0) {
            return res.status(400).json({message: "Invalid username or password"});
        }
        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
        if (!isPasswordValid) {
            return res.status(400).json({message: "Invalid username or password"});
        }
        // Generate a JWT token for the authenticated user
        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({message: "Login successful", token});
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

// Export the controller functions to be used in the routes
module.exports = {
    registerUser,
    loginUser
};