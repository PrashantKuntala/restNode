var express = require('express');
var app = express();

app.use((req,res,next) => {
    res.status(200).json({
        message : "It works"
    });
});

//listen to port
app.listen(8080);
console.log('Listening on port 8080');
