const axios = require('axios');
const url = 'https://rafaelemery-fake-data-api.herokuapp.com';

module.exports = {
    
    async shop(req, res, next) {
        try {
            const response = await axios.get(`${url}/shop`);

            return res.json(response.data);
        } catch (error) {
            next(error);
        }
    },

    async posts(req, res, next) {
        try {
            const response = await axios.get(`${url}/blog/post`);

            return res.json(response.data);
        } catch (error) {
            next(error);
        }
    },

    //Issue: learn how to manage the url params
    async postComments(req, res, next) {
        try {
            const { id } = req.params;
            const response = await axios.get(
                `${url}/posts/{id}/comment`, {
                    params: {
                        id: id
                    }
            });

            return res.json(response.data);
        } catch (error) {
            next(error);
            console.error(error);
        }
    }
}