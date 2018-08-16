const Cart = require('../models/cart');
const Product = require('../models/product');
const Donation = require('../models/donation');

exports.shopping_cart_get = (req, res) => {
  // req.session.cart.items == {}
  // Object.keys(req.session.cart.items).length === 0
  if (!req.session.cart) {
    console.log('no cart')
    return res.render('shopping_cart', {
      products: null
    });
  }
  console.log('there is a cart');
  var cart = new Cart(req.session.cart);
  console.log("about to print cart keys")
  let keys = Object.keys(cart.items)
  console.log(keys);
  
  res.render('shopping_cart', {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  });
}

exports.add_to_cart = (req, res) => {
  let productName = req.params.name;
  console.log("product name: " + productName);
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findOne({name: productName}, (err, product) => {
    console.log('finding product...');
    if (err) {
      return res.redirect('/');
    }
    console.log(product);
    cart.add(product, productName);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/browse/' + productName);
  });
}

exports.reduce = (req, res) => {
  const productName = req.params.name;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productName);
  if (Object.keys(cart.items).length == 0) {
    req.session.cart = null;
  } else {
    req.session.cart = cart;
  }
  res.redirect('/cart/shopping-cart');
}

exports.increase = (req, res) => {
  const productName = req.params.name;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.increaseByOne(productName);
  req.session.cart = cart;
  res.redirect('/cart/shopping-cart');
}

exports.removeItem = (req, res) => {
  console.log('removing item...');
  const productName = req.params.name;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productName);
  if (Object.keys(cart.items).length == 0) {
    req.session.cart = null;
  } else {
    req.session.cart = cart;
  }
  console.log(req.session.cart);
  res.redirect('/cart/shopping-cart');
}
