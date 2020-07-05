const knex = require('../database');
const bcrypt = require('bcrypt');

module.exports = {

    async index(req, res, next) {
       try {
            const { id, order } = req.query;

            if (id) {
                const results = await knex('users').where({ id }).select();

                console.log('Showing the user (id: ' + id + ')');
                return res.json(results);
            }

            if (order) {
                if (order == 'rating') {
                    const results = await knex('users').orderBy('rating', 'desc')
                                                    .select('id', 'name', 'status', 'rating');
                    
                    console.log('Show the best rated users');
                    return res.json(results);
                }
            }
                
            const results = await knex('users').select('id', 'name', 'status', 'rating');

            console.log('Showing all users');
            return res.json(results);
       } catch (error) {
           next(error);
       }
    },

    async create(req, res, next) {
        try {
            const { name, email, password, status, rating } = req.body;

            const hash = bcrypt.hash(password, 10);

            await knex('users').insert({
                name: name,
                email: email,
                password: hash,
                status: status,
                rating: rating,
            });

            return res.send({
                message: "User created!",
                email: email,
                password: hash
            });
        } catch (error) {
            next(error)
        }
    },

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, email, password, status, rating } = req.body;

            await knex('users').where({ id }).update({
                name: name,
                email: email,
                password: password,
                status: status,
                rating: rating,
            });

            return res.send({
                message: "User updated!"
            });
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            await knex('users').del().where({ id });

            return res.send({
                message: "User deleted!",
                id: id
            });
        } catch (error) {
            next(error);
        }
    }
};