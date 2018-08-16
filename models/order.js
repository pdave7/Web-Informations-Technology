const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var Order = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  cart: {type: Object, required: true},
  cardholder_name: {type: String, required: true},
  paymentId: {type: String, required: true},
  date: {type: String, required: true}
});



Order = module.exports = mongoose.model('Order', Order);
