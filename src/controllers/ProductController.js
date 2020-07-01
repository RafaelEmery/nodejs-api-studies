const knex = require('../database');

module.exports = {

    async index(req, res) {
        const results = await knex('products')
                                .select('id', 'title', 'description', 'value', 'payment_method')

        return res.json(results);
    },

    //Need to have a function for all products available products (maybe a query)

    //Working but need to think about not having a function for it... Maybe some scope or query stuff
    async orderByExpensive(req, res) {
        const results = await knex('products')
                                .orderBy('value', 'desc')
                                .select('id', 'title', 'description', 'value', 'payment_method');

        return res.json(results);
    },

    //Neet to have a function to order by  cheaper

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
        const { user_id, title, description, value, available, payment_method } = req.body;

        await knex('products').where({ id }).update({
            user_id: user_id,
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

    //Wrong (!!!)
    async updateAvailable(req, res) {
        const { id } = req.params;
        const product = await knex('products').where({ id });

        //Need to access the available attribute
        //product.available and product['available'] == undefined
        console.log(product);

        //Always goes this way...
        if (product.available) {
            await knex('products').update('available', false);

            return res.send({
                message: "Now your product is not available!"
            })
        }
        else {
            await knex('products').update('available', true);

            return res.send({
                message: "Now your product is available!"
            })  
        }
    },

    async delete(req, res) {
        const { id } = req.params;

        await knex('products').where({ id }).del();

        return res.send({
            message: "Product deleted!"
        });
    }

};
