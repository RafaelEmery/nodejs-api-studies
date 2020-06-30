
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          title: "Coleira da Nina",
          description: "Uma coleira usada pela gata preta mais safada do mundo! A gata não vale nada, mas a coleira vale muito.",
          value: 1499.99,
          available: 1,
          payment_method: 'Gold',
        }
      ]);
    });
};
