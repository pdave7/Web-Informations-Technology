const express = require('express');
const router = express.Router();

const Order = require('../models/order');
const Product = require('../models/product');
const Brand = require('../models/brand');

router.get('/products', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {res.send(err);}
    res.send(products);
  });
});

router.get('/product/:id', (req, res) => {
  const productId = req.params.id;
  Product.find({name: productId}, (err, product) => {
    if (err) {res.send(err);}
    res.send(product);
  });
});

router.get('/brands', (req, res) => {
  Brand.find({}, (err, brands) => {
    if (err) {res.send(err);}
    res.send(brands);
  });
});

router.get('/brand/:id', (req, res) => {
  const brandId = req.params.id;
  console.log(brandId);
  Brand.find({name: brandId}, (err, brand) => {
    if (err) {res.send(err);}
    res.send(brand);
  });
});

module.exports = router;
