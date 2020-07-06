const express = require('express');
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');

const AuthController = require('../controllers/AuthController');

routes
    .post('/login', AuthController.session)
    
    .post('/register', celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            // status: Joi.string().max(150),
            // rating: Joi.number().min(0).max(10.0)
        }) 
    }), AuthController.register)

module.exports = routes;
