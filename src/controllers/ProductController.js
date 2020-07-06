const knex = require('../database');

module.exports = {

    async index(req, res, next) {
        try {
            const { user_id, id, available, order } = req.query;
            const { page = 1} = req.query;

            // If ?user_id= get the user's products                        
            if (user_id) {
                const results = await knex('products').limit(5).offset((page - 1 ) * 5).where({ user_id })
                                                      .join('users', 'users.id', '=', 'products.user_id')
                                                      .select('users.name', 'products.title', 'products.description', 'products.value');
                
                console.log('Showing the user (id: ' + user_id + ') products');
                return res.json(results);
            }

            //If ?id= get product with query's value
            if (id) {
                const results = await knex('products').where({ id }).select();
                
                console.log('Showing the product (id: ' + id + ')');
                return res.json(results);
            }

            //If ?available=
            if (available) {
                if (available == 'true') {
                    const results = await knex('products').limit(5).offset((page - 1 ) * 5).where('available', true)
                                                          .select('id', 'title', 'description', 'value', 'payment_method', 'available');

                    console.log('Showing only the available products');
                    return res.json(results);
                }
                if (available == 'false') {
                    const results = await knex('products').limit(5).offset((page - 1 ) * 5).where('available', false)
                                                          .select('id', 'title', 'description', 'value', 'payment_method', 'available');

                    console.log('Showing only the NOT available products');
                    return res.json(results);
                }
            }

            //If ?order=
            if (order) {
                if (order == 'expensive') {
                    const results = await knex('products').limit(5).offset((page - 1 ) * 5).orderBy('value', 'desc')
                                                          .select('id', 'title', 'description', 'value', 'payment_method');
                
                    console.log('Showing products by ' + order);
                    return res.json(results);  
                }
                if (order == 'cheaper') {
                    const results = await knex('products').limit(5).offset((page - 1 ) * 5).orderBy('value', 'asc')
                                                          .select('id', 'title', 'description', 'value', 'payment_method'); 
                
                    console.log('Showing products by ' + order);
                    return res.json(results);
                }
            }
            
            //If is only /products with no query
            //Showing with pagination (5 per page)
            const results = await knex('products').limit(5).offset((page - 1 ) * 5)
                                                  .select('id', 'title', 'description', 'value', 'payment_method');

            const [ count ] = await knex('products').count();

            console.log('Showing all ' + count + ' products');
            res.header('X-total-count', count['count']);

            return res.json(results);

        } catch(error) {
            next(error);
        }
    },

    async create(req, res, next) {
        try {
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
        } catch (error) {
            next(error);
        }
    },

    async update(req, res, next) {
        try {
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
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            await knex('products').where({ id }).del();

            return res.send({
                message: "Product deleted!"
            });
        } catch (error) {
            next(error);
        }
    }

};
