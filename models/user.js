const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  firstName: {type:String, required: true},
  lastName: {type:String, required: true},
  email: {type:String, required: true},
  password: {type: String, required: true},
  donation_destinations: {type: Array, required: false}
});


UserSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

User = module.exports = mongoose.model('User', UserSchema);
