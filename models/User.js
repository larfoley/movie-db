var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  username: String,
  password: String,
  favourite: {
    movies: [
      {
        id: String,
      }
    ],
    tv_shows: [
      {
        id: String,
      }
    ],
    genres: Object
  },
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
