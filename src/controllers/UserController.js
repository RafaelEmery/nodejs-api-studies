const knex = require('../database');

module.exports = {

    async index(req, res) {
        const results = await knex('users')
                                .select('id name status rating');

        return res.json(results);
    },

    async create(req, res) {
        const { name, email, password, status, rating } = req.body;

        await knex('users').insert({
            name,
            email,
            password,
            status,
            rating
        });

        return res.send({
            message: "User created!"
        });
    },

    async delete(req, res) {
        const { id } = req.params;

        await knex('users').del().where({ id });

        return res.send({
            message: "User deleted!"
        })
    }
};