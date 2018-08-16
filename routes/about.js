const express = require('express');
const router = express.Router();

const About = require("../controllers/about");

router.get('/', About.about_get);

module.exports = router;
