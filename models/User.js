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
    }
  ]
})


UserSchema.methods.validPassword = function ( pwd ) {
    return ( this.password === pwd );
};

UserSchema.methods.addToFavourites = function (media) {
  var query = User.findOne({ 'email': 'bob@bob.com' });
  return query;
  // this.findById(id, function (err, user) {
  //   if (err) return handleError(err);
  //
  //   user.size = 'large';
  //   user.save(function (err, updatedTank) {
  //     if (err) return handleError(err);
  //     res.send(updatedTank);
  //   });
  // });

}


var User = mongoose.model('User', UserSchema);

module.exports = User;
