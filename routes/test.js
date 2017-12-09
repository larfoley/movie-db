var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
 // Render the example view

 // The first paramater here is the path to the ejs template, the second paramter is an
 // optional object which contains data that the ejs template can access



 res.render("hello world", {a: 1})

})

module.exports = router;
