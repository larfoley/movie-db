var config = require('../config');
var express = require('express');
var router = express.Router();
var request = require("request");
var rp = require('request-promise');

router.get('/', function(req, res, next) {
 // Render the example view
 rp({
     method: 'GET',
     url: 'https://api.themoviedb.org/3/person/74568',
     qs: {
       api_key: config.api_key
     },
     body: '{}'
   })
   .then(function (response) {
     var cast_member = JSON.parse(response);
     res.render('pages/cast-member', {cast_member: cast_member});
   })
 // The first paramater here is the path to the ejs template, the second paramter is an
 // optional object which contains data that the ejs template can access
});
 // NOTE: this method will look for a file called /views/pages/example.ejs
 // If this file does not exists you will get an error


module.exports = router;
