const express = require('express');
const app = express();

// adding loggin middleware
const morgan = require('morgan');

// adding body-parser
const bodyParser = require('body-parser');

// adding mongoose ORM for mongodb
const mongoose = require('mongoose');

// connecting to mongodb using mongoclient 
mongoose.connect('mongodb://localhost/restTest',{ useNewUrlParser: true });
mongoose.Promise = global.Promise;

// adding (middle-ware)response headers to handle CORS
app.use((req,res,next)=> {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({});
    }
    next();
});


// add routes
const sampleRoutes = require('./routes/samples');

// adding the logger
app.use(morgan('dev'));

// adding the body-parser to handle request bodies
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// let express use the specific routes
app.use('/samples',sampleRoutes);


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
