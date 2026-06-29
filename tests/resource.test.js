// Define a test that allows database connections to be mocked for testing purposes
jest.mock('../db/db.js', () => ({ query: jest.fn() }));

// Import the necessary modules and functions for testing
const request = require('supertest');
const app = require('../api/app.js');
const pool = require('../db/db.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate a real JWT token once before all tests run
let token;
beforeAll(() => {
    token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });
});



// Define a test suite for the API GET endpoints to retrieve all characters and moves from the database
describe('API GET all', () => {
    // Define a test case for the GET /api/characters endpoint
    test('GET /api/characters should return a list of characters', async () => {
        // Mock the database query to return a list of characters
        pool.query.mockResolvedValue({ rowCount: 2, rows: [{ name: 'Ryu' }, { name: 'Ken' }] });

        // Send a GET request to the endpoint and check the response
        const res = await request(app)
            .get('/api/characters')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([{ name: 'Ryu' }, { name: 'Ken' }]);
    });

    test('GET /api/characters should return 404 when no characters are found', async () => {
        // Mock the database query to return no characters
        pool.query.mockResolvedValue({ rowCount: 0, rows: [] });

        // Send a GET request to the enpoint and check the response for our expected 404 error and response
        const res = await request(app).get('/api/characters').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({ message: 'No characters found' });
    })
});

// Define a test suite for the API post endpoint to add characters to the database
describe('API POST characters', () => {
    // Define a test case for the POST /api/characters endpoint
    test('POST /api/characters should add a character to the database', async () => {
        // Mock the database query to return the added character
        pool.query.mockResolvedValue({ rowCount: 1, rows: [{ name: 'Chun-Li' }] });

        // Send a POST request to the endpoint with the character data and check the response
        const res = await request(app)
            .post('/api/characters')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Chun-Li' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({ name: 'Chun-Li' });

        
    })
    // Define a test case for the POST /api/characters endpoint
    test('POST /api/characters should return 400 if the request body doesnt contain the name field', async () => {
        // Send a POST request to the endpoint and expect the 400 error
        const res = (await request(app).post('/api/characters').set('Authorization', `Bearer ${token}`).send({}));
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message')
    })

    // Define a test case for the POST /api/characters endpoint
    test('POST /api/characters should return 400 if the request contains a name that exceeds the expected length', async () => {
        // Send a POST request to the endpoint and expect the 400 error
        const res = await request(app).post('/api/characters').set('Authorization', `Bearer ${token}`).send( {name: 'a'.repeat(101)});
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message')
    })
});

// Define a test suite 

