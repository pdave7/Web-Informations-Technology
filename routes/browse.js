var express = require('express');
var router = express.Router();



const Browse = require('../controllers/browse');

router.get('/', Browse.browse_get);

router.get('/desc', Browse.browse_get_desc);

router.get('/aesc', Browse.browse_get_aesc);

router.get('/checkout', isLoggedIn, Browse.checkout);

router.post('/checkout', isLoggedIn, Browse.charge);

router.get('/checkout/confirmed', isLoggedIn, Browse.confirmed)

router.get('/:product', Browse.get_one_item);


module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  console.log("req.session.oldUrl set to: " + req.url)
  res.redirect('/user/login');
}
