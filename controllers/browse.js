const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');
const Donation = require('../models/donation');




/*exports.browse_get = (req,res) =>{
  Product.find({},(err,products)+>{
    if(err){console.log(err);}

  })
}*/
exports.browse_get = (req, res) => {

    if (req.session.products === undefined || req.session.products === null) {
    Product.find({}, (err, products) => {
        if(err){console.log(err);}
        products.forEach((item) => {
        console.log(item);
});

    res.render('browse', {
        products: products
    });
});
} else {
  res.render('browse', {
    products: req.session.products
  });
}
}


exports.browse_get_desc = (req, res) => {
    Product.find({}, (err, products) => {
        if(err){console.log(err);}
        console.log("BEFORE: ");
        products.forEach((item) => {
        console.log(item);
});
        products.sort(function (a, b) {
            return b.price - a.price;
        });
        console.log("AFTER: ");
        products.forEach((item) => {
        console.log(item);
});
    req.session.products = products;
    res.redirect('/browse');
});
}

exports.browse_get_aesc = (req, res) => {
    Product.find({}, (err, products) => {
        if(err){console.log(err);}
        console.log("BEFORE: ");
    products.forEach((item) => {
        console.log(item);
});
    products.sort(function (a, b) {
        return a.price - b.price;
    });
    console.log("AFTER: ");
    products.forEach((item) => {
        console.log(item);
});
    req.session.products = products;
    res.redirect('/browse');
});
}



exports.get_one_item = (req, res) => {
  var product = req.params.product;
  Product.findOne({name: product}, (err, product) => {
    if(err){
      var arg = 'browse/' + product;
      res.render('error', {
        arg: arg
      });
    }
    console.log(product)
    var donat_dest;
    Donation.findOne({_id: product.donation_destination}, (err, don_dest) => {
      if (err) {
        console.log(err);
      } else {
        donat_dest = don_dest;
        console.log(donat_dest)
      }

    res.render('product_page', {
      product: product,
      donat_dest: donat_dest
    });
    });
  });
}



exports.checkout = (req, res) => {
  if (!req.session.cart) {
    console.log('no cart')
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var error = req.flash('error')[0];
  res.render('checkout', {
    total: cart.totalPrice,
    error: req.flash('error'),
    noError: !error
  })
}

exports.charge = (req, res) => {
  if (!req.session.cart) {
    console.log('no cart')
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var stripe = require("stripe")(
    "sk_test_OtPA4XkFQWBHzjwQc6CA6R5y"
  );

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "aud",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Test Charge"
  }, function(err, charge) {
    // asynchronously called
    if (err) {
      console.log('error charging: ' + err);
      return res.redirect('/browse/checkout');
    }
    var date = new Date().toGMTString();
    //Thu May 17 2018 14:47:57
    const order = new Order({
      user: req.user,
      cart: cart,
      cardholder_name: req.body.card_holder_name,
      paymentId: charge.id,
      date: date
    });
    order.save(function(err, result) {
      if (err) {
        console.log('problem saving to db');
        console.log(err)
        res.redirect('/browse/checkout');
      } else {
      req.flash('success', 'Successfully bought product!');
      let keys = Object.keys(cart.items)
      for (x in Object.keys(cart.items)) {
        donat_id = cart.items[keys[x]].item.donation_destination;
        Donation.findOne({_id: donat_id}, (err, donation) => {
          if(err){console.log(err);}
          else {
            console.log("donation tag: " + donation.tag);
            User.findOne({_id: req.user}, (err, user) => {
              console.log("donation_destinations: " + user.donation_destinations);
              if (user.donation_destinations.includes(donation.tag)){
                console.log("yes it does include it");
              } else {
                console.log("no it doesn't include it")
                User.update(
                  {_id:req.user.id},
                  {$push : {donation_destinations: donation.tag}},
                  function(err, success){
                    if (err){
                      console.log(err);
                    } else {
                      console.log(success)
                    }
                  });
              }
              console.log("user: " + user);
            });
          }
        });

    }

      req.session.cart = null;
      console.log(charge.id)
      req.session.payid = charge.id;
      // EVENTUALLY REDIRECT TO POST PAYMENT PAGE
      // WHERE THERE IS LINK TO SEE WHERE YOUR DONATION IS GOING
      res.redirect('/browse/checkout/confirmed');
    }
    });
  });
}

exports.confirmed = (req, res) => {
  console.log(req.session.payid)
  var order = Order.findOne({paymentId: req.session.payid}, (err, order) => {
    if (err) {
      console.log(err)
      var arg = {}
    } else {
      console.log(order)
      var arg = order
    }
    console.log(arg.cart)
    res.render('checkout_confirmed', {
      order: arg
    });
  });
}
