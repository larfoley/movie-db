var config = require("../config.js");
var express = require('express');
var router = express.Router();
var request = require("request");

router.get('/:media_type/:media_id/', function(req, res, next) {
    var media_type = req.params.media_type;
    var media_id = req.params.media_id;

  request(
    { method: 'GET',
      url: 'https://api.themoviedb.org/3/' + media_type + "/" + media_id,
      qs: { api_key: config.api_key },
      body: '{}'
    }, function (error, response, body) {
      if (error) next(error);
      res.json(JSON.parse(body));
  });

});

router.get('/:media_type/:media_id/:media_props', function(req, res, next) {
    var media_type = req.params.media_type;
    var media_id = req.params.media_id;
    var media_props = req.params.media_props;

  request(
    { method: 'GET',
      url: 'https://api.themoviedb.org/3/' + media_type + "/" + media_id + "/" + media_props,
      qs: { api_key: config.api_key },
      body: '{}'
    }, function (error, response, body) {
      if (error) next(error);
      res.json(JSON.parse(body));
  });

});


module.exports = router
