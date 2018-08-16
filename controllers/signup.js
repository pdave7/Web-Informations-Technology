const passport = require('passport');


exports.signup_get = (req, res) => {
  var messages = [];
  res.render('signup', {
    csrfToken: req.csrfToken(),
    messages: req.flash('error')
  });
}

exports.signup_clicked = passport.authenticate('local.signup', {
  failureRedirect: 'signup',
  failureFlash: true
})


exports.signup_success = (req, res, next) => {
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect('/browse' + oldUrl);
  } else {
    res.redirect('/user/profile');
  }
}
