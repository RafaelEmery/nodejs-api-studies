const axios = require('axios');

module.exports = {

    async shop(req, res) {
        try {
            const url = 'https://rafaelemery-fake-data-api.herokuapp.com/shop';
            const results = await axios.get(url);

            //Is returning object Object (?)
            console.log("Chamando os results" + results);
            return res.json(results);
        } catch (error) {
            res.status(400).send({
                message: "There's something wrong at the products request!",
                error: error
            })
        }
    },

    async posts(req, res) {
        try {
            const url = 'https://rafaelemery-fake-data-api.herokuapp.com/blog/posts';
            const results = await axios.get(url);

            return res.json(results);
        } catch (error) {
            res.status(400).send({
                message: "There's something wrong at the posts requests!",
                error: error
            })
        }
    },

    async postComments(req, res) {

    },
}

// get(req, res) => {
//     const url = 'https://rafaelemery-fake-data-api.herokuapp.com/shop';
//     axios.get(url)
//         .then((response) => {
//             return response.data;
//         })
//         .then((data) => {
//             return res.json(data);
//         })
//         .catch((e) => {
//             console.error(e);
//         });
// });
