const express = require('express');
const routes = express.Router();

//Importing the APIs
const FakeDataAPI = require('../services/FakeDataAPI');

//Basic testing route
routes.get('/', (req, res) => {
    return res.json({
        name: "Learning NodeJS",
        date: "28/06/2019",
        author: "Rafael Emery",
        description: "Everything sucks!"
    });
});

routes
    .get('/api/shop', FakeDataAPI.shop)
    // .get('/api/posts', FakeDataAPI.posts)
    // .get('/api/posts/:id/comments', FakeDataAPI.postComments);

module.exports = routes;