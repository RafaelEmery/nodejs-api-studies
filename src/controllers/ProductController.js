const knex = require('../database');

module.exports = {

    async index(req, res) {
        const { user_id, id, available, order } = req.query;
        const results = await knex('products')
                                .select('id', 'title', 'description', 'value', 'payment_method');

        //If ?user_id= get the user's products                        
        if (user_id) {
            results = await knex('products')
                                    .where({ user_id })
                                    .join('users', 'users.id', '=', 'products.user_id')
                                    .select('products.*', 'users.name');
            
            console.log('Showing the user ' + id + ' products');
            return res.json(results);
        }

        //If ?id= get product with query's value
        if (id) {
            const query = await knex('products')
                                    .where({ id })
                                    .join('users', 'users.id', '=', 'products.user_id')
                                    .select('products.*', 'users.name', 'users.rating', 'users.status');
            
            console.log('Showing the product number ' + id);
            return res.json(query);
        }

        //If ?available=true get only the available
        if (available) {
            results = await knex('products')
                                .where('available', true)
                                .select('id', 'title', 'description', 'value', 'payment_method');
        
            console.log('Showing only the available products');
            return res.json(results);  
        }

        //If ?order=expensive get the desc order
        if (order == 'expensive') {
            results = await knex('products')
                                .orderBy('value', 'desc')
                                .select('id', 'title', 'description', 'value', 'payment_method');
        
            console.log('Showing products by most expensive');
            return res.json(results);                                
        }

        //If ?order=cheaper get the desc order
        if (order == 'cheaper') {
            results = await knex('products')
                                .orderBy('value', 'asc')
                                .select('id', 'title', 'description', 'value', 'payment_method');
                                
            console.log('Showing the product by cheaper');
            return res.json(results); 
        }
        
        //If is only /products with no query
        console.log('Showing all products');
        return res.json(results);
    },

    async create(req, res) {
        const { user_id, title, description, value, available, payment_method } = req.body;

        await knex('products').insert({
            user_id: user_id,
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
    async toggleAvailable(req, res) {
        const { id } = req.params;
        const product = await knex('products').where({ id });

        //Need to access the available attribute
        //product.available and product['available'] == undefined
        console.log(product);

        //Always goes this way...
        if (product.available) {
            await knex('products').update('available', false);

            return res.send({
                message: "Now your product is NOT available!"
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
