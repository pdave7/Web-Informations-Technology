const Brand = require('../models/brand');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://tscelsi:Impower123!@ds115350.mlab.com:15350/impower");

var brands = [
  new Brand({
    _id: "Platinum Pharmaceuticals",
    name: "Platinum Pharmaceutical",
    info: "Founded in 1963, Platinum Pharmaceutical prides itself on creating the best Pharmaceuticals the world has ever seen."
  }),
  new Brand({
    _id: "Roche Products",
    name: "Roche Products",
    info: "Founded in 2017, Roche brings the working class into the pharmaceutical game."
  }),
  new Brand({
    _id: "Australian Pharmaceutical Industries",
    name: "Australian Pharmaceutical Industries",
    info: "Founded in 1901, just before federation, the original. the best."
  })
];
var done = 0;
for (var i = 0; i < brands.length; i++) {
  brands[i].save((err, result) => {
    done++;
    if (done === brands.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
