const express = require('express');
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('../controllers/UserController');

routes
    .get('/', celebrate({
        [Segments.QUERY]: Joi.object().keys({
            id: Joi.number(),
            order: Joi.string().valid('order')
        })
    }), UserController.index)

    .post('/', celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            status: Joi.string().max(150),
            rating: Joi.number().min(0).max(10.0)
        })
    }), UserController.create)

    .put('/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        }),
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            status: Joi.string().max(150),
            rating: Joi.number().min(0).max(10.0)
        })
    }), UserController.update)

    .delete('/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }), UserController.delete);

module.exports = routes;