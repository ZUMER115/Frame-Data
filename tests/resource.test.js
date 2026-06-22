// Define a test that allows database connections to be mocked for testing purposes
jest.mock('../db/db.js', () => ({ query: jest.fn() }));

// Import the necessary modules and functions for testing
const request = require('supertest');
const app = require('../api/app.js');
const pool = require('../db/db.js');

// Define a test suite for the API endpoints
describe('API Endpoints', () => {
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
