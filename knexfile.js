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
  },

  //Used so we don't need to call the procedure (custom_functions table) in every migration
  onUpdateTrigger: table => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `
};
