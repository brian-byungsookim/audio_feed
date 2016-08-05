var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Set up HTTP things
app.use(bodyParser.json());


// Set up routes
var routes = require('./routes');
app.use('/audio-feed', routes);

// Set listening port
app.listen(3000, function() {
    console.log("Connected and listening on port 3000!");
});



/*
TODO:
- set up proper logging
- in mongo_layer.js, commit to db if no errors at all
*/
