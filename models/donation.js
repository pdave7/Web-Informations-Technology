const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var Donation = new Schema({
  tag: {type:String, required:true},
  description: {type:String, required:true},
  country: {type:String, required:true}
});

Donation = module.exports = mongoose.model('Donation', Donation);
