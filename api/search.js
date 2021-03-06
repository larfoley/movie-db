var config = require("../config.js");
var express = require('express');
var router = express.Router();
var request = require("request");

router.get('/', function(req, res, next) {
  var query = req.query.query;

  request(
    { method: 'GET',
      url: 'https://api.themoviedb.org/3/search/multi',
      qs: { api_key: config.api_key, query: query},
      body: '{}'
    }, function (error, response, body) {
      if (error) next(error);
      res.json(JSON.parse(body));
  });

});



module.exports = router;
