var express = require('express');
var router = express.Router();
var https = require('https');
var config = require('../config.js');

var request = require("request");

router.get('/', function(req, res, next) {

  var query = req.query.query;

  request("http://localhost:3000/api/search?query=" + query, function (error, response, body) {
    if (error) throw new Error(error);
    res.render('pages/search-results', {
      results: JSON.parse(body).results || [],
      username: req.user? req.user.username : null,
      loggedIn: !!req.user,
      page_title: "Search"
    });
  });
});


module.exports = router;
