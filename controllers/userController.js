const User = require('../models/User');

exports.login = (req, res) => {
  res.send('welcome to the dashboard');
};

exports.logout = () => {};

exports.signUpGuest = (req, res) => {
  res.render('sign-up');
};

exports.register = (req, res) => {
  let user = new User(req.body);
  user.register();
  if (user.errors.length) {
    res.send(user.errors);
  } else {
    res.send('Congrats there are no errors');
  }
};

exports.construction = (req, res) => {
  res.render('construction');
};

exports.home = (req, res) => {
  res.render('home');
};
