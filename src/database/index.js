const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

//Export for using in controllers
module.exports = knex;