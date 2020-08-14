const request = require('supertest');
const server = require('../src/server');

beforeAll(async () => {
    console.log('Before all function! TDD stuff with Jest!');
});

afterAll(() => {
    console.log('After all function! Server closed!');
});

describe('Starting tests...', () => {
    
    // it('Should the test (/jest) route', async () => {
    //     const response = await request(server).get('/jest');

    //     expect(response.status).toEqual(200);
    //     expect(response.body).objectContaining({
    //         message: "Testing the jest things at home route!"
    //     });
    // });
});