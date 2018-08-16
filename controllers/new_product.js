exports.new_product_get = (req, res) => {
  res.render('new_product');
}

exports.new_product_clicked = (req, res) => {
  var data = new Product(req.body);
  console.log(data);
  data.save()
  .then(item => {
    res.send('item saved to db');
  })
  .catch(err => {
    res.status(400).send('unable to save data to db');
  });
}
