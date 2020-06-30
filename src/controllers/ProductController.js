const knex = require('../database');

module.exports = {

    async index(req, res) {
        const results = await knex('products')
                                .select('id', 'title', 'description', 'value', 'payment_method')
                                .where('available', true);

        return res.json(results);
    },

    //Error
    async show(req, res) {
        const { id } = req.params;
        const result = await knex('products').where({ id });

        return res.json(result);
    },

    async create(req, res) {
        const { title, description, value, available, payment_method } = req.body;

        await knex('products').insert({
            title: title,
            description: description,
            value: value,
            available: available,
            payment_method: payment_method
        });

        return res.status(201).send({
            message: "Product created!"
        });
    },

    async update(req, res) {
        const { id } = req.params;
        const { title, description, value, available, payment_method } = req.body;

        await knex('products').where({ id }).update({
            title: title,
            description: description,
            value: value,
            available: available,
            payment_method: payment_method
        });

        return res.send({
            message: "Product updated!"
        });
    },

    async delete(req, res) {
        const { id } = req.params;

        await knex('products').where({ id }).del();

        return res.send({
            message: "Product deleted!"
        });
    }

};
