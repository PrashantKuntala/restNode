var express = require('express');
var app = express();

// add routes
const sampleRoutes = require('./routes/samples');
const newRoutes = require('./routes/news');

app.use('/samples',sampleRoutes);
app.use('/news',newRoutes);

//listen to port
app.listen(8080);
console.log('Listening on port 8080');
