// Allow jest to be able to mock database responses for relevant tests
jest.mock('../../db/db.js', () => ({query: jest.fn() }));

const request = require('supertest')
const app = require('../../api/app.js')
const pool = require('../../db/db.js')
require('dotenv').config();

// Define a test suite for POST requests to the register route
describe('API POST', () => {
    // Define a test for POST requests with valid body
    test('POST /api/auth/register returns 201 when valid body is sent', async () => {
        // First call (SELECT - user doesn't exist): rowCount: 0
        pool.query.mockResolvedValueOnce({ rowCount: 0, rows: [] });
        // Second call (INSERT - user created): rowCount: 1
        pool.query.mockResolvedValueOnce({ rowCount: 1, rows: [{ username: 'Zakariyya' }] });

        // Make the post request expecting the 201 status code
        const res = await request(app).post('/api/auth/register').send({ username: 'Zakariyya', password: 'Zakariyya123'})
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({message: "User registered successfully", user: 'Zakariyya'})
    })

    // Define a test for POST requests with an existing username
    test('POST /api/auth/register returns 400 when username already exists', async () => {
        // First call (SELECT - user exists): rowCount: 1
        pool.query.mockResolvedValueOnce({ rowCount: 1, rows: [{ username: 'Zakariyya' }] });

        // Make the post request expecting the 400 status code
        const res = await request(app).post('/api/auth/register').send({ username: 'Zakariyya', password: 'Zakariyya123'})
        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({message: "Username already exists"})
    })

    // Define a test for POST requests with an invalid body
    test('POST /api/auth/register expecting a 400 error when invalid body', async () => {
        // Make the POST request
        const res = await request(app).post('/api/auth/register').send({username: 'Zakariyya', password: 'Za'})
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message')
    })
})
