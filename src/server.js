const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(routes);

//Catching all errors
app.use((error, req, res, next) => {  
    res.status(error.status || 500);
    res.json({
        error: error.message
    });
});

//Error 'Not Found'
app.use((req, res, next) => {
    const error = new Error('Not Found!');
    error.status = 404;

    next(error);
});

app.listen(3000, () => {
    console.log('Server Ready at port 3000.');
});
