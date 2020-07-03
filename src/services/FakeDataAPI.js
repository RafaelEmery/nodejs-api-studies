const axios = require('axios');

module.exports = {

    async getProducts(message) {
        try {
            console.log(message);
            console.log('Got it! All the products');
            return await axios.get('https://rafaelemery-fake-data-api.herokuapp.com/shop');
        } catch (error) {
            console.error(error);
        }
    },

    async shop(req, res, next) {
        try {
            const products = await getProducts();
        
            console.log('Showing all products');
            return res.json(products); 
        } catch (error) {
            next(error);
        }
    },

    // async getPosts() {
    //     try {
    //         return await axios.get(``);
    //     } catch (error) {
            
    //     }
    // },

    // async posts(req, res) {
    //     const posts = await getPosts();

    //     console.log('Showing all posts');
    //     return res.json(posts);
    // },

    // async postComments(req, res) {

    // },
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
