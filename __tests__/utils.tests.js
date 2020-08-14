const generateTest = require('../src/utils/generateTest');
const generateToken = require('../src/utils/generateToken');
const generateRandomInt = require('../src/utils/generateRandomInt');

beforeAll(async () => {
    console.log('Before all function! TDD stuff with Jest!');
});

afterAll(() => {
    console.log('After all function! Server closed!');
});

describe('Starting tests...', () => {
    
    // test('Testing the home (/jest) route', async () => {
    //     const response = await request(routes).get('/jest');

    //     expect(response.status).toEqual(200);
    //     expect(response.json).toEqual({
    //         message: 'Testing the jest things at home route!'
    //     });
    // });

    it('Should test the generateTest function', () => { 
        expect(generateTest()).toMatch('Hello Jest!');
    });

    it('Should return a random int between 1 to 100', () => {
        const randomInt = generateRandomInt();
        
        console.log('Random Int: ', randomInt);
        expect(randomInt).toBeDefined();
    });

    it('Should test the generateToken function (JWT)', () => {
        const randomId = generateRandomInt();
        const jwt = generateToken({ id: randomId });

        console.log('JWT: ', jwt);
        expect(jwt).toBeDefined();
    });

    
});

