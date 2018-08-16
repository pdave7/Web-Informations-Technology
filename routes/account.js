var express = require('express');
var router = express.Router();

const Account = require("../controllers/account");

router.get('/', Account.account_get);




module.exports = router;
