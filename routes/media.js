var config = require('../config');
var express = require('express');
var router = express.Router();
var https = require('https');
var request = require("request");
var rp = require('request-promise');

var options2 = {
	method: 'GET',
	url: 'https://api.themoviedb.org/3/discover/movie',
	qs: {
		page: '1',
		include_video: 'false',
		include_adult: 'false',
		sort_by: 'primary_release_date.desc',
		language: 'en-US',
		api_key: config.api_key
	},
	body: '{}'
};

router.get('/', function (req, res, next) {
	var id = req.query.id;
	var selectedMovie, relatedMovies;

	rp({
			method: 'GET',
			url: 'https://api.themoviedb.org/3/movie/' + id,
			qs: {
				api_key: config.api_key
			},
			body: '{}'
		})
		.then(function (response) {
			// Get selectedMovie
			selectedMovie = JSON.parse(response);
			console.log(JSON.parse(response));
			return rp(options2)
		})
		.then(function (response) {
			// Get latestMovies
			relatedMovies = JSON.parse(response).results;
			res.render('pages/media', {
				activeLink: "home",
				selectedMovie: media,
				relatedMovies: relatedMovies
			});
		})
		.catch(function (err) {
			next(err)
		});
});

module.exports = router;
