const express = require("express");
const path = require('path');
const fs = require('fs');
const expressValidator = require('express-validator');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);



const PORT = process.env.PORT || 3000;

const index = require('./routes/index');
const user = require('./routes/user');
const browse = require('./routes/browse');
const about = require('./routes/about');
const new_product = require('./routes/new_product');
const cart = require('./routes/cart');
//const testing = require('./routes/testing');
const api = require('./routes/api');



mongoose.Promise = global.Promise;
mongoose.connect("mongodb://tscelsi:Impower123!@ds115350.mlab.com:15350/impower");
require('./config/passport');

const logger = function(req, res, next){
  console.log('Logging..');
  next();
}

const app = express();

// // View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  cookie: {
    maxAge: 180 * 60 * 1000
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  console.log("session: " + req.session.id);
  next();
});
app.use(function(req, res, next) {
  console.log("isAuth: " + req.isAuthenticated());
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/user', user);
app.use('/cart', cart);
app.use('/browse', browse);
app.use('/about', about);
app.use('/new_product', new_product);
app.use('/api', api);
//app.use('/testing', testing);
app.use('/', index);



app.listen(PORT, () => {
    console.log(`Express listening on port ${PORT}`);
});
