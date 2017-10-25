var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String
})

var User = mongoose.model('User', UserSchema);

module.exports = User;
