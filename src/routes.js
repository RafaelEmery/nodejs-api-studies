const express = require('express');
const routes = express.Router();

//Importing the Controllers
const ProductController = require('./controllers/ProductController');
const UserController = require('./controllers/UserController');

//Importing the APIs
const FakeDataAPI = require('./services/FakeDataAPI');

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
    .get('/api/posts', FakeDataAPI.posts)
    .get('/api/posts/:id/comments', FakeDataAPI.postComments);

routes
    .get('/products', ProductController.index)
    // .get('/products/expensive', ProductController.orderByExpensive)
    // .get('/products/cheap', ProductController.orderByCheaper)
    // .get('/products/:id/show', ProductController.show)
    .post('/products', ProductController.create)
    .put('/products/:id', ProductController.update)
    .put('/products/:id/toggle', ProductController.toggleAvailable)
    .delete('/products/:id', ProductController.delete);

routes
    .get('/users', UserController.index)
    .post('/users', UserController.create)
    .delete('/users/:id', UserController.delete);

module.exports = routes;

