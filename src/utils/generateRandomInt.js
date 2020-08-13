module.exports = function generateRandomInt() {
    min = Math.ceil(1);
    max = Math.floor(100);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}