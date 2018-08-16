const passport = require('passport');
const flash = require('connect-flash');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  let errors = validate_signup(req);
  if (errors) {
      let messages = [];
      errors.forEach(function(error) {
        messages.push(error.msg);
      });
      console.log(messages);
      return done(null, false, req.flash('error', messages));
  }
  User.findOne({'email': email}, function(err, user) {
    if(err) {
      console.log("something wrong in accessing db");
      return done(err);
    }
    // if there is already an email in db with the same email:
    if (user) {
      var messages = ["Email is already in use."];
      return done(null, false, req.flash('error', messages));
    }
    var newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.save(function(err, result) {
      if (err) {
        return done(err);
      }
      return done(null, newUser);
    });
  });
}));

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  var errors = validate_login(req);
  if (errors) {
      var messages = [];
      errors.forEach(function(error) {
        messages.push(error.msg);
      });
      return done(null, false, req.flash('error', messages));
  }
  User.findOne({'email': email}, function(err, user) {
    if(err) {
      console.log("something wrong in accessing db");
      return done(err);
    }
    // if there is not already an email in db with the same email:
    if (!user) {
      return done(null, false, {messages: ['Invalid Details']});
    }
    if (!user.validPassword(password)) {
      var messages = []
      messages.push('Invalid Details');
      return done(null, false, req.flash('error', messages));
    }
    return done(null, user);
  });
}));

function validate_signup(req) {
  req.checkBody('email', 'The email you entered is invalid.').isEmail();
  req.checkBody('email', 'Email address must be between 4-100 characters.').len(4,100);
  req.checkBody('password', 'Password must be between 8-100 characters.').len(8,100);
  req.checkBody('password', 'Password must include one lowercase character, one uppercase character, a number, and a special character')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  req.checkBody('firstName', 'First name must be between 1-100 characters').len(1-100);
  req.checkBody('lastName', 'Last name must be between 1-100 characters').len(1-100);
  var errors = req.validationErrors();
  return errors;
}

function validate_login(req) {
  req.checkBody('email', 'The email you entered is invalid.').isEmail();
  var errors = req.validationErrors();
  return errors;
}
