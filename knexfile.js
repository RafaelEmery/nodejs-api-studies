// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
     database: 'learning_nodejs',
     user: 'postgres',
     password: '1234'
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  }
};
