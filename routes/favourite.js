var config = require('../config');
var express = require('express');
var router = express.Router();
var User = require('../models/User.js');

router.get('/add', function(req, res, next) {

    var user = req.user;
    var media_id = req.query.media_id;
    var media_type = req.query.media_type;

    // Check if user is logged in
    if (!user) {
      return res.redirect('/login')
    }

    // Check if a media_id and media type exists
    if (media_id && media_type) {

      // Check if user has already favouritised that media
      if ( user.favourite[media_type + 's'].filter(function(fav) {
        if (fav.id == media_id) return fav;
      }).length === 0 ) {

        // Add media to favourites
        user.favourite[media_type + 's'].push({ id: media_id })

        User.findOneAndUpdate({ 'username': req.user.username }, user, function(err, doc) {
          if (err) {
            console.log(err);
          } else {
            console.log(doc);
          }
        })
        
        return res.redirect('/');

      } else {
        // Media is already a favourite
        res.redirect('/')
      }
    } else {
      next(new Error("Media Type and Media ID is required"))
    }


})

module.exports = router;
