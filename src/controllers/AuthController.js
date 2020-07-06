const knex = require('knex');
const bcrypt = require('bcrypt');

module.exports = {

    //Create a new user
    async register(req, res, next) {
        try {
            const { name, email, password, status, rating } = req.body;

            const hash = bcrypt.hash(password, 10);

            await knex('users').insert({
                name: name,
                email: email,
                password: hash,
                // status: status,
                // rating: rating,
            });

            return res.send({
                message: "User created!",
                email: email,
                password: hash
            });
        } catch (error) {
            next(error)
        }
    }
}