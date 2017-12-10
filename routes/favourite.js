var config = require('../config');
var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../models/User.js');

router.get('/add', function(req, res, next) {

    var user = req.user;
    var media_id = req.query.media_id;
    var media_type = req.query.media_type;

    // Check if user is logged in
    if (!user) {
      req.flash("message", "Login to update your favourites");
      req.flash('type', 'error');
      return res.redirect('/login')
    }

    // Check if a media_id and media type exists
    if (media_id && media_type) {

      // Check if user has already saved this media
      // and then save it here in the media var if they have
      var media;

      if (media_type === "movie") {

        media = user.movies.filter(function(movie) {
          return movie.id === media_id
        })[0]

      } else {

        media = user.tv_shows.filter(function(tv_show) {
          return tv_show.id === media_id
        })[0]

      }

      if (media) {
        // if true then user already has that movie saved,
        // so check if he has it set as a favourite
        if (media.isFavourite) {
          // redirect
          req.flash("message", "Already added to favourites");
          req.flash('type', 'success');
          return res.redirect('/');
        }

        media.isFavourite = true;

        User.findOneAndUpdate({ 'username': req.user.username }, user, function(err, doc) {
          if (err) {
            next(err);
          } else {
            req.flash("message", "Your favourites have been updated");
            req.flash('type', 'success');
            res.redirect('back')
          }
        })

      } else {
        // user does not have media saved so get more info about the media
        // from the api as we only have access to the movie id
        var api_options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/' + (media_type === "movie" ? "movie/" : "tv/") + media_id,
          qs: { api_key: config.api_key },
          body: '{}' }

        request(api_options, function (error, response, body) {
          if (error) throw new Error(error);

          var media = JSON.parse(body);
          media.isFavourite = true;
          media.isInWatchlist = false;

          // Update the genres wathced by the user
          var genreAlreadyExists = false;
          var genres = media_type === "movie" ?
            user.most_popular_movie_genres :
            user.most_popular_tv_genres;

          media.genres.forEach(function(g) {

            for (var i = 0; i < genres.length; i++) {
              if (genres[i].genre === g.name) {
                genres[i].count++;
                genreAlreadyExists = true;
                break;
              }
            }

            if (!genreAlreadyExists) {
              genres.push({genre: g.name, count: 1, id: g.id});
            }

          })


          if (media_type === "movie") {
            user.movies.push(media);
          } else {
            user.tv_shows.push(media);
          }

          // Update db
          User.findOneAndUpdate({ 'username': req.user.username }, user, function(err, doc) {
            if (err) {
              next(err);
            } else {
              req.flash('message', 'Your favourites have been updated ')
              req.flash('type', 'success');
              res.redirect('back')
            }
          })


        })

      }

    } else {
      return next(new Error('No media_id or media_type'))
    }
})

router.get('/delete', function(req, res, next) {
  var user = req.user;
  var media_id = req.query.media_id;
  var media_type = req.query.media_type;
  var media;

  if (!user) {
    req.flash("message", "Login to add movies as a favourite");
    req.flash('type', 'error');
    return res.redirect('/login')
  }

  if (media_type === "movie") {

    for (var i = 0; i < user.movies.length; i++) {
      if (user.movies[i].id === media_id) {
        if (user.movies[i].isInWatchlist === false) {
          user.movies.splice(i, 1);
        } else {
          user.movies[i].isFavourite = false;
        }
        break;
      }
    }


  } else {

    for (var i = 0; i < user.tv_shows.length; i++) {
      if (user.tv_shows[i].id === media_id) {
        if (user.tv_shows[i].isInWatchlist === false) {
          user.tv_shows.splice(i, 1);
        } else {
          user.tv_shows[i].isFavourite = false;
        }
        break;
      }
    }

  }

  User.findOneAndUpdate({ 'username': req.user.username }, user, function(err, doc) {
    if (err) {
      next(err);
    } else {
      req.flash("message", "Your favourites have been updated");
      req.flash('type', 'success');
      res.redirect('back')
    }
  })


})

module.exports = router;
