const { onUpdateTrigger } = require('../../../knexfile')

exports.up = knex => knex.schema.createTable('users', table => {
    table.increments('id');

    table.string('name');
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.text('status');
    table.float('rating').default(0.0);

    table.timestamps(true, true);
    
    //Using the procedure (automated) from knexfile.js and custom_functions table
}).then(() => knex.raw(onUpdateTrigger('users')));
  
exports.down = knex => knex.schema.dropTableIfExists('users');

