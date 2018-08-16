var Product = require('../models/product');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://tscelsi:Impower123!@ds115350.mlab.com:15350/impower");

var products = [
  new Product({
    name: "VAGINAL CONTRACEPTIVE GEL (Extra Strength) (2.85oz) 81g",
    price: "36.60",
    description: "VAGINAL CONTRACEPTIVE GEL from Options® Gynol II® is a highly effective and non-hormonal gel that provides protection against unwanted pregnancy. Unscented, water-soluble, and non-greasy formula, VAGINAL CONTRACEPTIVE GEL is lightly lubricated and contains Nonxynol-9, which provides optimal protection when used with a diaphragm.",
    brand: "Gynol II",
    image: "img/gynol_II.jpg",
    donation_destination: "5afe2ab37bf9b80e7d74dc4d"
  }),
  new Product({
    name: "VAGINAL CONTRACEPTIVE FOAM (0.6oz) 17g",
    price: "26.05",
    description: "VAGINAL CONTRACEPTIVE FOAM is a highly effective, easy-to-use, and unobtrusive vaginal foam that can help protect against unwanted pregnancy, while also providing you and your partner a worry-free intimate experience. Mildly scented and non-greasy formula, VAGINAL CONTRACEPTIVE FOAM is effective for up to one hour and contains 12.5% Nonxynol-9, which provides optimal protection when used on a condom or alone.",
    brand: "Apothecus",
    image: "img/VCF.jpg",
    donation_destination: "5afe2ab37bf9b80e7d74dc4e"
  }),
  new Product({
    name: "Water Pill - 60 Tablets",
    price: "7.79",
    description: "Natrol Water Pill is an all-natural herbal nutrient blend to help promote a balanced level of fluids in the body, along with a healthy diet and exercise program. Natrol Water Pill can help you feel your best...naturally. High potency Vitamin B5 helps replenish the normal loss of this water-soluble vitamin when fluids are expelled from the body. Natrol Water Pill is about balance.",
    brand: "Natrol",
    image: "img/water_pill.jpg",
    donation_destination: "5afe2ab37bf9b80e7d74dc4e"
  }),
  new Product({
    name: "NATURALAMB LUBRICATED CONDOMS 10 Pack",
    price: "63.35",
    description: "NATURALAMB LUBRICATED CONDOMS from Trojan™ provides pregnancy protection and luxurious skin-to-skin intimacy that helps heighten sensitivity. Made with non-latex material and water-based lubricant, NATURALAMB LUBRICATED CONDOMS are individually tested for safety and pleasure.",
    brand: "Naturalamb",
    image: "img/naturallamb.jpg",
    donation_destination: "5afe2ab37bf9b80e7d74dc4e"
  }),
  new Product({
    name: "Raydel - Policosanol10",
    price: "45",
    description: "RAYDEL Policosanol 10 is for your healthy cholesterol management",
    brand: "Raydel",
    image: "img/raydel.jpg",
    donation_destination: "5afe2ab37bf9b80e7d74dc4d"
  })
];
var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save((err, result) => {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}





function exit() {
  mongoose.disconnect();
}
