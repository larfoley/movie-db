var express = require('express');
var router = express.Router();
var https = require('https');

router.get('/', function(req, res, next) {
  res.render('pages/index', {activeLink: "home"});
});

module.exports = router;
