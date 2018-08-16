const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var Product = new Schema({
  name: {type:String, required:true},
  price: {type:Number, required:true},
  description: {type:String, required:true},
  brand: {type:String, required:true},
  image: {type:String, required:true},
  donation_destination: {type: Schema.Types.ObjectId, ref: 'Donation'}
});



Product = module.exports = mongoose.model('Product', Product);
