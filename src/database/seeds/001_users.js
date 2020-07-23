
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          name: 'Rafael',
          email: 'rafael@example.com',
          password: '123456',
          status: 'Love my petzz',
          rating: 4.8
        },
        {
          id: 2,
          name: 'Luciana',
          email: 'luciana@example.com',
          password: '654321',
          status: 'Sai daí Smell, não tem nada pra você!',
          rating: 7.8
        },
      ]);
    });
};
