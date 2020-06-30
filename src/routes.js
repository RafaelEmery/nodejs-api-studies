const express = require('express');
const routes = express.Router();

//Consuming API with axios
const axios = require('axios');

//Importing the Controllers
const ProductController = require('./controllers/ProductController');

routes.get('/', (req, res) => {
    return res.json({
        name: "Learning NodeJS",
        date: "28/06/2019",
        author: "Rafael Emery",
        description: "Everything sucks!"
    });
});

routes.get('/api', (req, res) => {
    const url = 'https://rafaelemery-fake-data-api.herokuapp.com/shop';
    axios.get(url)
         .then((response) => {
             return response.data;
         })
         .then((data) => {
             return res.json(data);
         })
         .catch((e) => {
             console.error(e);
         });
});

routes.get('/products', ProductController);

module.exports = routes;

