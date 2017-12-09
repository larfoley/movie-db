var config = require("../config.js");
var express = require('express');
var router = express.Router();
var request = require("request");

router.get('/', function(req, res, next) {

  request(
    { method: 'GET',
      url: 'https://api.themoviedb.org/3/discover/movie',
      qs: { api_key: config.api_key },
      body: '{}'
    }, function (error, response, body) {
      if (error) next(error);
      res.json(JSON.parse(body));
  });

});



module.exports = router;
