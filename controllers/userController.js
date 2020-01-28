exports.login = () => {};

exports.logout = () => {};

exports.register = (req, res) => {
  console.log(req.body);
  res.send('Thanks for trying to register');
};

exports.home = (req, res) => {
  res.render('home');
};
