exports.up = knex => knex.schema.createTable('products', table => {
    table.increments('id');

    table.integer('user_id').references('users.id').notNullable().onDelete('CASCADE');

    table.string('title');
    table.text('description');
    table.float('value');
    table.boolean('available');
    table.enu('payment_method', ['Cash', 'Credit Card', 'Paypal', 'Gold']);

    table.timestamps(true, true);
});
  
exports.down = knex => knex.schema.dropTableIfExists('products');
