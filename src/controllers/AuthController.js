const knex = require('../database');
const bcrypt = require('bcrypt');

const generateToken = require('../utils/generateToken');
 
module.exports = {

    //Create a new user
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;

            //Issue (!!!)
            //The verification below doens't work correctly
            //When we use the unique() email to prevent repeating, works
            //But the id counts (don't know why)
            //Need to look up for fix the verification
            // if (await knex('users').where({ email }).select()) {
            //     return res.status(400).send({
            //         message: 'This user already exists'
            //     });
            // }

            const hash = await bcrypt.hash(password, 10);

            const user = await knex('users').insert({
                name: name,
                email: email,
                password: hash
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