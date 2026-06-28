// Define a test that allows database connections to be mocked for testing purposes
jest.mock('../db/db.js', () => ({ query: jest.fn() }));

// Import the necessary modules and functions for testing
const request = require('supertest');
const app = require('../api/app.js');
const pool = require('../db/db.js');

// Define a test suite for the API GET endpoints to retrieve all characters and moves from the database
describe('API GET all', () => {
    // Define a test case for the GET /api/characters endpoint
    test('GET /api/characters should return a list of characters', async () => {
        // Mock the database query to return a list of characters
        pool.query.mockResolvedValue({ rowCount: 2, rows: [{ name: 'Ryu' }, { name: 'Ken' }] });

        // Send a GET request to the endpoint and check the response
        const res = await request(app).get('/api/characters');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([{ name: 'Ryu' }, { name: 'Ken' }]);
    });
});

// Define a test suite for the API post endpoint to add characters to the database
describe('API POST characters', () => {
    // Define a test case for the POST /api/characters endpoint
    test('POST /api/characters should add a character to the database', async () => {
        // Mock the database query to return the added character
        pool.query.mockResolvedValue({ rowCount: 1, rows: [{ name: 'Chun-Li' }] });

        // Send a POST request to the endpoint with the character data and check the response
        const res = await request(app).post('/api/characters').send({ name: 'Chun-Li' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({ name: 'Chun-Li' });

        
    })
});


