var express = require('express');
var router = express.Router();

const Product = require('../models/product');

const New_product = require('../controllers/new_product');

router.get('/', New_product.new_product_get);

router.post('/', New_product.new_product_clicked);

module.exports = router;
