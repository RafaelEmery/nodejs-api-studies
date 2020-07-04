const express = require('express');
const routes = express.Router();

const UserController = require('../controllers/UserController');

routes
.get('/', UserController.index)
.post('/', UserController.create)
.put('/:id', UserController.update)
.delete('/:id', UserController.delete);

module.exports = routes;