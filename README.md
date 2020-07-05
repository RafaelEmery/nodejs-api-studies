# :green_book: My Personal NodeJS API

The ideia is to study and practice about Javascript applications and Node's REST APIs.

The structure of *src* directory:

![](assets/src.png)

## :bulb: Techs and Packages

- [NodeJS](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Express.js](https://expressjs.com/pt-br/)
- [Nodemon](https://nodemon.io/)
- [Knex.js](http://knexjs.org/)
- [Celebrate](https://github.com/arb/celebrate)
- [BCrypt](https://www.npmjs.com/package/bcrypt)
- [Postman](https://www.postman.com/)

## :running: Run the API
 
Installing all the packages 
```npm install``` 

Running on *http://localhost:3000*
```npm start``` 

## :wrench: Random Features

Here are some features made to apply my personal studies.

### Migrations abd Seeds with Knex.js

Simple Migration for products at the PostgreSQL's learning_nodejs database. In this case i test the OneToMany relation and some of Knex.js types for tables:
```javascript
//Up function to create products table
exports.up = knex => knex.schema.createTable('products', table => {
    table.increments('id');

    //OneToMany relationship with user's table
    table.integer('user_id').references('users.id').notNullable().onDelete('CASCADE');

    table.string('title');
    table.text('description');
    table.float('value');
    table.boolean('available');
    table.enu('payment_method', ['Cash', 'Credit Card', 'Paypal', 'Gold']);

    table.timestamps(true, true);
});

//Down function to drop products table
exports.down = knex => knex.schema.dropTableIfExists('products');
```

Also worked in Seeds for generating fake testing data in database:
```javascript
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('products').del()
        then(function () {
        // Inserts seed entries
        return knex('products').insert([
            { 
            user_id: 1, 
            title: "Coleira da Nina",
            description: "Uma coleira usada pela gata preta mais safada do mundo! A gata não vale nada, mas a coleira vale muito.",
            value: 1499.99,
            available: 1,
            payment_method: 'Gold',
            },
        ]);
    });
};
```

### Request's validations using Celebrate

To validate the requests made with Postman Software was used the Celebrate package which is basically a middleware validation using Joi:
```javascript
//Route for the updating method (PUT)
route.put('/:id', celebrate({
        //Validating the URL params
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        }),
        //Validating the request's body
        [Segments.BODY]: Joi.object().keys({
            user_id: Joi.number().required(),
            title: Joi.string().required(),
            description: Joi.string().min(15).max(2000),
            value: Joi.number().required(),
            available: Joi.boolean(),
            payment_method: Joi.string().valid('Cash', 'Credit Card', 'Paypal', 'Gold').required()
        }),
    }), ProductController.update);

```

Made with :hearts: by [Rafael Emery](https://rafaelemery.github.io)