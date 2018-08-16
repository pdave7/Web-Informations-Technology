const express = require('express');
const router = express.Router();
const Cart = require('../controllers/cart');

router.get('/shopping-cart', Cart.shopping_cart_get);

router.get('/reduce/:name', Cart.reduce);

router.get('/increase/:name', Cart.increase);

router.get('/remove/:name', Cart.removeItem);

router.get('/add-to-cart/:name', Cart.add_to_cart);

module.exports = router;
