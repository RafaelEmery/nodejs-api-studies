const express = require('express');
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');

const AuthController = require('../controllers/AuthController');

routes
    .post('/register', celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }) 
    }), AuthController.register)

    .post('/login', AuthController.login)

module.exports = routes;
