const passport = require('passport');

exports.login_get = (req, res) => {
  var messages = [];
  res.render('login', {
    csrfToken: req.csrfToken(),
    messages: req.flash('error'),
  });
}

exports.login_clicked = passport.authenticate('local.signin', {
  failureRedirect: 'login',
  failureFlash: true
})

exports.login_success = (req, res) => {
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect('/browse' + oldUrl);
  } else {
    res.redirect('/user/profile');
  }
}
