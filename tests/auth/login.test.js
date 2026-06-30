// Allow jest to mock the database for relevant tests
jest.mock('../../db/db.js', () => ({ query: jest.fn() }));

// Import the necessary modules and functions for testing
const request = require('supertest');
const app = require('../../api/app.js');
const pool = require('../../db/db.js');
const bcrypt = require('bcrypt')
require('dotenv').config();

// Define a test suite for the API POST endpoint to login users
describe('API POST login', () => {
    // Define a test case for the POST /api/auth/login endpoint with valid credentials
    test('POST /api/auth/login should return a JWT token when valid credentials are provided', async () => {
        // Mock the database qresponse to include a username and a hashed password
        const hashedPassword = await bcrypt.hash('Zakariyya123', 10)
        pool.query.mockResolvedValue({ rowCount: 1, rows: [{ username: 'Zakariyya', password: hashedPassword}]})

        // Send the POST request to the endpoint expecting the token and 200 status code as response
        const res = await request(app).post('/api/auth/login').send({ username: 'Zakariyya', password: 'Zakariyya123'})
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('token')
        
    })

    // Define a test case for the POST /api/auth/login endpoint with incorrect password
    test('POST /api/auth/login should return a 400 error when invalid password is entered', async () => {
        // Mock the database to contain a hashed password that isn't the same
        const hashedPassword = await bcrypt.hash('Zakariyya321', 10)
        pool.query.mockResolvedValue({ rowCount: 1, rows: [{ username: 'Zakariyya', password: hashedPassword}]})

        // Send the POST request with the invalid password expecting the 400 error and relevant response
        const res = await request(app).post('/api/auth/login').send({ username: 'Zakariyya', password: 'Zakariyya123'})
        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({message: "Invalid username or password"})
    })
})
