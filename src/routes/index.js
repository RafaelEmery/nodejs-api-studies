const express = require('express');
const routes = express.Router();

//Importing the APIs
const FakeDataAPI = require('../services/FakeDataAPI');

//Importing the micellaneous controllers
const NerdController = require('../controllers/NerdController');
const EmailController = require('../controllers/EmailController');
const FileController = require('../controllers/FileController');

//Basic testing route
routes
    .get('/', (req, res) => {
        return res.json({
            name: "Learning NodeJS",
            date: "28/06/2019",
            author: "Rafael Emery",
            description: "Hello World"
        });
    })
    .get('/jest', (req, res) => {
        return res.json({
            message: "Testing the jest things at home route!"
        });
    })
    .get('/api/shop', FakeDataAPI.shop)
    // .get('/api/posts', FakeDataAPI.posts)
    // .get('/api/posts/:id/comments', FakeDataAPI.postComments);
    .get('/nerds/topics', NerdController.getTopics)
    .get('/nerds/hp', NerdController.singleHarryPotter)
    .get('/nerds/pokemon', NerdController.multiPokemon)
    .get('/email/test', EmailController.sendTestEmail)
    .post('/upload', FileController.upload);

module.exports = routes;