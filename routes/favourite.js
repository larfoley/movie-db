var config = require('../config');
var express = require('express');
var router = express.Router();
var User = require('../models/User.js');

router.get('/add', function(req, res, next) {
    var user = req.user;
    var media_id = req.query.media_id;
    var media_type = req.query.media_type;
    if (user) {
      console.log("user exists");
      if (media_id && media_type) {
        console.log("media and media type exists");

        console.log();

        if ( user.favourite.movies.filter(function(fav) {
          if (fav.id == media_id) return fav;
        }).length === 0 ) {

          user.favourite[media_type].push({ id: media_id })

          User.findOneAndUpdate({ 'username': req.user.username }, user, function(err, doc) {
            if (err) {
              console.log(err);
            } else {
              console.log(doc);
            }
          })

          return res.redirect('/');

        } else {
          console.log("already a favourite");
          res.redirect('/')
        }
      } else {
        console.log("media_id or media_type does not exist");
        next(new Error("already a favourite"))
      }
    }

})

module.exports = router;
