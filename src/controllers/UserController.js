const knex = require('../database');

module.exports = {

    async index(req, res) {
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
    },

    async create(req, res) {
        const { name, email, password, status, rating } = req.body;

        await knex('users').insert({
            name: name,
            email: email,
            password: password,
            status: status,
            rating: rating,
        });

        return res.send({
            message: "User created!"
        });
    },

    async update(req, res) {
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
        })
    },

    async delete(req, res) {
        const { id } = req.params;

        await knex('users').del().where({ id });

        return res.send({
            message: "User deleted!"
        })
    }
};