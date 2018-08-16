exports.index_get = (req, res) => {
  console.log(res.locals.login);
  var success = req.flash('success')[0]
  res.render('index', {
    success: success
  });
}
