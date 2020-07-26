const knex = require('knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400    
    });
}
 
module.exports = {

    //Create a new user
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            console.log('Heyyy, entrei no método register');

            if (await knex('users').where({ email })) {
                return res.status(400).send({
                    message: 'This user already exists'
                });
            }

            const hash = bcrypt.hash(password, 10);

            await knex('users').insert({
                name: name,
                email: email,
                password: hash,
            });

            return res.send({
                message: "User created!",
                email: email,
                password: hash,
                token: generateToken({ id: user.id })
            });
        } catch (error) {
            next(error)
        }
    },

    //Create a new Login (session)
    async login(req, res) {
        const { email, password } = req.body;

        const user = await knex('users').where({ email }).first();

        if (!user) {
            return res.status(400).send({
                message: 'This credencials does not match with our users data!'
            });
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({
                message: 'Invalid password'
            });
        } 

        return res.send({
            message: 'Login OK!',
            email: user.email,
            token: generateToken({ id: user.id })
        });
    }

}