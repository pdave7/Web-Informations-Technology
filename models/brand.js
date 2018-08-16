const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var Brands = new Schema({
  _id: {type:String, required:true},
  name: {type:String, required:true},
  info: {type:String}
});



Brands = module.exports = mongoose.model('Brands', Brands);
