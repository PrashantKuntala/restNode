var express = require('express');
var app = express();

// adding loggin middleware
const morgan = require('morgan');

// add routes
const sampleRoutes = require('./routes/samples');
const newRoutes = require('./routes/news');

// adding the logger
app.use(morgan('dev'));

// let express use the specific routes
app.use('/samples',sampleRoutes);
app.use('/news',newRoutes);

// handling default route errors
app.use((req,res,next) => {
    const error = new Error('Not Found'); // adding your custom error message here
    error.status = 404;
    next(error);
})

// to trigger any above route errors you define, like a 404 page or something 
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    });
});

//listen to port
app.listen(8080);
console.log('Listening on port 8080');
