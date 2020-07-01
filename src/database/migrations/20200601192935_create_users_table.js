exports.up = knex => knex.schema.createTable('users', table => {
    table.increments('id');

    table.string('name');
    table.string('email').unique().notNullable();
    table.string('password').unique().notNullable();
    table.text('status');
    table.float('rating').default(0.0);

    table.timestamps(true, true);
});
  
exports.down = knex => knex.schema.dropTableIfExists('users');

