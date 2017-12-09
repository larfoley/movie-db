// file name: /routes/example.js

var express = require('express');
var router = express.Router();

// file name: app.js

var index = require('./routes/index');
var login = require('./routes/login');

// Require route here
var example = require('./routes/example.js');

router.get('/', function(req, res, next) {
 // Render the example view

 // The first paramater here is the path to the ejs template, the second paramter is an
 // optional object which contains data that the ejs template can access

 res.send("cast")

 // NOTE: this method will look for a file called /views/pages/example.ejs
 // If this file does not exists you will get an error
}

module.exports = router;
