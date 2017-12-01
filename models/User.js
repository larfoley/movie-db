var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  username: String,
  password: String,
  movies: [
    {
      id: String,
      title: String,
      overview: String,
      backdrop_path: String,
      poster_path: String,
      vote_average: Number,
      vote_count: Number,
      isFavourite: Boolean,
      isInWatchlist: Boolean,
      hasSeen: Boolean,
      genres: Array
    }
  ],
  tv_shows: [
    {
      id: String,
      name: String,
      overview: String,
      backdrop_path: String,
      poster_path: String,
      vote_average: Number,
      vote_count: Number,
      isFavourite: Boolean,
      isInWatchlist: Boolean,
      hasSeen: Boolean,
      genres: Array
    },
  ],
  most_popular_movie_genres: Array,
  most_popular_tv_genres: Array
})

var User = mongoose.model('User', UserSchema);

UserSchema.methods.addToFavourites = function(user) {

  User.findOneAndUpdate({ 'username': user.username }, user, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log(doc);
    }
  })

}

UserSchema.methods.removeGenre = function(type, name) {

  this.findOneAndUpdate({username: "username"}, function(err, user) {

    var genres = type === "movie" ?
    this.most_popular_movie_genres :
    this.most_popular_tv_genres;

    for (var i = 0; i < genres.length; i++) {
      // name?
      if (genres[i].name === name) {
        if (genres[i].count === 1) {
          genres.splice(i, 1);
        } else {
          genres[i].count--;
        }
      }
    }

    user.save(function(err, updatedUser) {
      if (err) throw new Error();
    })

  })

}

// var sortMostPopularGenres = function() {
//   most_popular_genres.sort(function(a, b) {
//     return a.count - b.count;
//   })
// }


module.exports = User;
