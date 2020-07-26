const nerds = require('nerds');

module.exports = {
    
    getTopics(req, res, next) {
        try {
            const topics = nerds.resolve();

            console.log('All topics: ', topics)
            return res.send({
                message: "All Nerds topics",
                topics: topics
            });
        } catch (error) {
            next(error);
        }
    },

    singleHarryPotter(req, res, next) {
        try {
            const character = nerds.resolve('Harry Potter').asArray();
            
            console.log('Showing the character: ', character);
            return res.send({
                character
            });
        } catch (error) {
            next(error);
        }
    },

    multiPokemon(req, res, next) {
        try {
            const pokemons = nerds.resolve('Pokemon', 5).include(['name', 'type', 'hp']).asArray();

            console.log('Showing 5 pokemons: ', pokemons);
            return res.send({
                pokemons
            });
        } catch (error) {
            next(error)
        }
    }
}