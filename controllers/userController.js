exports.login = () => {};

exports.logout = () => {};

exports.signUpGuest = (req, res) => {
  res.render('sign-up');
};

exports.register = (req, res) => {
  console.log(req.body);
  res.send('Thanks for trying to register');
};

exports.home = (req, res) => {
  res.render('home');
};
