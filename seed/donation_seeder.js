const Donation = require('../models/donation');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://tscelsi:Impower123!@ds115350.mlab.com:15350/impower");

var donation_destinations = [
  new Donation({
    tag: "BRA",
    description: "Brazil has an increasing number of sexually transmitted disease occurrances. Impower is contributing toward reducing this number by donating products to Brazil.",
    country: "Brazil"
  }),
  new Donation({
    tag: "IND",
    description: "India will receive this benefit from Impower.",
    country: "India"
  })
];
var done = 0;
for (var i = 0; i < donation_destinations.length; i++) {
  donation_destinations[i].save((err, result) => {
    done++;
    if (done === donation_destinations.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
