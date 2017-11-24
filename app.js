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
var LocalStrategy = require('passport-local').Strategy;
var config = require('./config');
mongoose.connect(config.database_url);
var db = mongoose.connection;

var User = require('./models/User.js');

var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var search = require('./routes/search');
var tvShows = require('./routes/tv-shows');
var media = require('./routes/media');
var dashboard = require('./routes/dashboard');
var favourite = require('./routes/favourite');

var app = express();

db.on('error', function() {
  console.error.call(console, 'connection error:')
});
db.once('open', function() {
  console.log("connected");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());


// MIDDLEWARE

app.use(function(req, res, next) {
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

  satelize.satelize({ip:'2a02:8084:80:6e00:3dcd:ffd6:93f1:d68'}, function(err, payload) {
    req.country_code = payload.country_code;
  });

  next();
})

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/search', search);
app.use('/tv-shows', tvShows);
app.use('/media', media);
app.use('/favourite', favourite);
app.use('/dashboard', dashboard);

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
