var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require("path")

router.get('/:template', function(req, res, next) {

  fs.readFile(path.join(__dirname, '../public/templates/') + req.params.template + ".ejs", 'utf8', function (err,data) {
    console.log("reading file...");
    if (err) {
      return next(err);
    }
    res.send(data);
  });
});



module.exports = router;
