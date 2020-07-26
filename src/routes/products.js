const express = require('express');
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');

const ProductController = require('../controllers/ProductController');

const AuthMiddleware = require('../middlewares/auth');

routes.use(AuthMiddleware);

routes
    .get('/', celebrate({
        [Segments.QUERY]: Joi.object().keys({
            user_id: Joi.number(),
            id: Joi.number(),
            available: Joi.valid('true', 'false'),
            order: Joi.valid('expensive', 'cheaper'),    
        })
    }), ProductController.index)

    .post('/', celebrate({
        [Segments.BODY]: Joi.object().keys({
            user_id: Joi.number().required(),
            title: Joi.string().required(),
            description: Joi.string().min(15).max(2000),
            value: Joi.number().required(),
            available: Joi.boolean(),
            payment_method: Joi.string().valid('Cash', 'Credit Card', 'Paypal', 'Gold').required()
        }),
    }), ProductController.create)

    .put('/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        }),
        [Segments.BODY]: Joi.object().keys({
            user_id: Joi.number().required(),
            title: Joi.string().required(),
            description: Joi.string().min(15).max(2000),
            value: Joi.number().required(),
            available: Joi.boolean(),
            payment_method: Joi.string().valid('Cash', 'Credit Card', 'Paypal', 'Gold').required()
        }),
    }), ProductController.update)

    .delete('/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().integer().required()
        })
    }), ProductController.delete);

module.exports = routes;