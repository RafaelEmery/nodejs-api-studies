
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
        },
        {
          title: "Corda da Smell",
          description: "A corda que tem a honra de ser mordida e destruída pela Smell. Seu aroma oriundo do bafo da fera é um aspecto único!",
          value: 1349.99,
          available: 1,
          payment_method: 'Paypal',
        }
      ]);
    });
};
