const Order = require('../models/order');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/test_db");

var orders = [
  new Order({
    user: "5ae8578e0c38ff49186a142f",
    cart: ["Contraceptor3000", "Contraceptor3001", "Contraceptor3002", "Contraceptor3003", "Contraceptor3004"],
    cardholder_name: "TESTING2",
    paymentId: '89083786439',
    date: "03/03/2018",
    total_price: 100.90
  }),
  new Order({
    user: "5ae8578e0c38ff49186a142f",
    cart: ["Contraceptor3000", "Contraceptor3001"],
    cardholder_name: "TESTING2",
    paymentId: '343523953',
    date: "03/04/2018",
    total_price: 23.45
  }),
  new Order({
    user: "5ae8578e0c38ff49186a142f",
    cart: ["Contraceptor3000", "Contraceptor3001", "Contraceptor3002", "Contraceptor3003"],
    cardholder_name: "TESTING2",
    paymentId: '837843790',
    date: "05/05/2018",
    total_price: 87.37
  })
];
var done = 0;
for (var i = 0; i < orders.length; i++) {
  orders[i].save((err, result) => {
    done++;
    if (done === orders.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
