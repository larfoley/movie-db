var express = require('express');
var router = express.Router();
var https = require('https');
var api_key;

router.get('/search', function(req, res, next) {
  var url = 'https://api.themoviedb.org/3/search/movie?api_key=87ef8a60645934be3e9195cfbd3f5235&query=';

  https.get(url, (resp) => {
    var data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      res.json(results)
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });

  res.render('pages/index');
});

module.exports = router;
