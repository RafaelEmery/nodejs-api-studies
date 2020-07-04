const express = require('express');
const app = express();

//Importing all the routes
const indexRoutes = require('./routes');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');

app.use(express.json());

//Using all the routes
app.use('/', indexRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);

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
