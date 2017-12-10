var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var satelize = require('satelize');
var passport = require('passport');
var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;
var config = require('./config');
mongoose.connect(config.database_url);
var db = mongoose.connection;
var User = require('./models/User.js');


// Routes
var index = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var register = require('./routes/register');
var search = require('./routes/search');
var tvShows = require('./routes/tv-shows');
var cinema = require('./routes/cinema');
var media = require('./routes/media');
var dashboard = require('./routes/dashboard');
var favourite = require('./routes/favourite');
var watchlist = require('./routes/watchlist');
var movies = require('./routes/movies');
var templates = require('./routes/templates');
var cast = require('./routes/cast');

// Api
var api_movies = require('./api/movies');
var api_tv = require('./api/tv');
var api_search = require('./api/search');
var api_genres = require('./api/genres');
var api_media_details = require("./api/media-details")
var api_recommended = require('./api/user/recommended');

var app = express();

db.on('error', function() {
  console.error.call(console, 'error connecting to database')
});
db.once('open', function() {
  console.log("connected to database");
});


passport.use(new LocalStrategy(
  function(username, password, done) {

    // Find user
    User.findOne({ username: username }, function (err, user) {
      if (err) return done(err);

      // Check if user exisits
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      // Check if password is vaild
      bcrypt.compare(password, user.password, function(err, res) {
          if (err) return done(err);

          if (res) {
            return done(null, user);

          } else {
            return done(null, false, { message: 'Incorrect password.' });

          }
      });

    });
  }
));

// serialized to the session, and deserialized when subsequent requests are made.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next) {
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

  satelize.satelize({ip:'2a02:8084:80:6e00:3dcd:ffd6:93f1:d68'}, function(err, payload) {
    if (err) return next(err);
    req.country_code = payload.country_code;
    req.country = payload.country["en"];
  });

  next();
})

app.use('/api/movies', api_movies);
app.use('/api/tv', api_tv);
app.use('/api/search', api_search);
app.use('/api/genres', api_genres);
app.use('/api/media', api_media_details);
app.use('/recommended', api_recommended);
app.use('/templates', templates);

app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/search', search);
app.use('/tv-shows', tvShows);
app.use('/media', media);
app.use('/favourite', favourite);
app.use('/watchlist', watchlist);
app.use('/dashboard', dashboard);
app.use('/cinema', cinema);
app.use('/movies', movies);
app.use('/cast', cast);


app.use(function(req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("pages/error", {err: err, status: err.status});
});

module.exports = app;
