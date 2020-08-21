const axios = require('axios');
const key = require('../config/keys.json').Marvel.public;
const hash = require('../config/keys.json').Marvel.hash;

module.exports = {

    async getCharacters(req, res, next) {
        try {
                    
            response = await axios.get('https://gateway.marvel.com/v1/public/characters', {
                params: {
                    apikey: key,
                    ts: 1,
                    hash: hash,
                }
            });

            console.log(response);
            return res.json(response);
        } catch (error) {
            next(error);
            console.log(error.message);
        }
    }
}