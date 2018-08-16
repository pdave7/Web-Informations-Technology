const express = require('express');
const csrf = require('csurf');
const router = express.Router();

const Login = require('../controllers/login');
const Signup = require('../controllers/signup');
const Order = require('../models/order');
const Cart = require('../models/cart');
const User = require('../models/user');

const csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, (req, res, next) => {
  req.session.oldUrl = req.url;
  console.log(req.session.oldUrl);
  console.log(req.user);
  res.render('profile', {
    user: req.user
  });
});

router.get('/profile/purchases', isLoggedIn, (req, res, next) => {
  Order.find({user:req.user}, (err, orders) => {
    if (err) {return res.write('Error');}
    var cart;
    console.log(orders)
    orders.forEach((order) => {
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });

    res.render('past_purchases', {
      orders: orders
    });

  });
});

router.get('/back', isLoggedIn, (req, res) => {
  console.log("back: " + req.session.oldUrl);
  res.redirect("/user" + req.session.oldUrl);
});


router.get('/map', isLoggedIn, (req, res, next) => {
  console.log(req.user.id)
  User.findOne({_id: req.user.id}, (err, user) => {
    if(err){console.log(err);}
    console.log(user)
    res.render('map', {
      user: user,
    });
  });
});


router.get('/logout', isLoggedIn, (req, res, next) => {
  console.log('logging out...');
  req.session.destroy(function(err) {
    console.log('destroying session...');
    if(err){console.log(err);}
    res.redirect('/');
  });
});

router.use('/', notLoggedIn, (req, res, next) => {
  next();
});

router.get('/login', Login.login_get);

router.post('/login', Login.login_clicked, Login.login_success);

router.get('/signup', Signup.signup_get);

router.post('/signup', Signup.signup_clicked, Signup.signup_success);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('redirecting to home, not logged in');
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  console.log('Are you logged in?')
  if (!req.isAuthenticated()) {
    console.log('no you\'re not');
    return next();
  }
  console.log('yes you are');
  res.redirect('/');
}
