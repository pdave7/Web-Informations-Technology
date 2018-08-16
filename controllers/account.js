exports.account_get = (req, res) => {
  res.render('account', {
    header: 'My Account'
  });
}
