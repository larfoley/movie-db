var config = require("../config.js");
var express = require('express');
var router = express.Router();
var request = require("request");

router.get('/:media_type', function(req, res, next) {
  var media_type = req.params.media_type;

  request(
    { method: 'GET',
      url: 'https://api.themoviedb.org/3/genre/' + media_type + '/list',
      qs: { api_key: config.api_key },
      body: '{}'
    }, function (error, response, body) {
      if (error) next(error);
      res.json(JSON.parse(body));
  });

});



module.exports = router;
