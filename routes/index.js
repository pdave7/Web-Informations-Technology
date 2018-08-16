var express = require('express');
var router = express.Router();

const Index = require('../controllers/index');

router.get('/', Index.index_get);

module.exports = router;
