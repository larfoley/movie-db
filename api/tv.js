var config = require("../config.js");
var express = require('express');
var router = express.Router();
var request = require("request");

router.get('/', function(req, res, next) {
  var with_genres = req.query.genre;
  var sort_by = req.query.sort_by;
  var options = { method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/tv',
    qs: { api_key: config.api_key},
    body: '{}'
  }

  if (with_genres) {
    options.qs.with_genres = with_genres;
  }

  if (sort_by) {
    options.qs.sort_by = sort_by;
  }


  request(options, function (error, response, body) {
      if (error) next(error);
      res.json(JSON.parse(body));
  });

});



module.exports = router;
