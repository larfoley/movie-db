var config = require("../config.js");
var express = require('express');
var router = express.Router();
var request = require("request");

router.get('/', function(req, res, next) {
  var with_genres = req.query.genre;
  var sort_by = req.query.sort_by;

  request(
    { method: 'GET',
      url: 'https://api.themoviedb.org/3/discover/movie',
      qs: { api_key: config.api_key, with_genres: with_genres, sort_by: sort_by },
      body: '{}'
    }, function (error, response, body) {
      if (error) next(error);
      res.json(JSON.parse(body));
  });

});



module.exports = router;
