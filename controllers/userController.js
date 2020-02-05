const User = require('../models/User');

exports.login = function(req, res) {
  let user = new User(req.body);
  user
    .login()
    .then(function(result) {
      req.session.user = {
        username: user.data.username
      };
      req.session.save(function() {
        res.redirect('/');
      });
    })
    .catch(function(e) {
      req.flash('errors', e);
      req.session.save(function() {
        res.redirect('/');
      });
    });
};

exports.logout = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/');
  });
};

exports.signUpGuest = (req, res) => {
  if (req.session.user) {
    res.render('dashboard', {
      username: req.session.user.username,
      weight: req.session.user.weight,
      feet: req.session.user.feet,
      inches: req.session.user.inches,
      age: req.session.user.age,
      gender: req.session.user.gender
    });
  } else {
    res.render('sign-up', {
      errors: req.flash('errors'),
      regErrors: req.flash('regErrors')
    });
  }
};

exports.register = (req, res) => {
  let user = new User(req.body);
  user
    .register()
    .then(() => {
      req.session.user = {
        username: user.data.username,
        weight: user.data.weight,
        feet: user.data.feet,
        inches: user.data.inches,
        age: user.data.age,
        gender: user.data.gender
      };
      req.session.save(function() {
        res.redirect('/');
      });
    })
    .catch(regErrors => {
      regErrors.forEach(function(error) {
        req.flash('regErrors', error);
      });
      req.session.save(function() {
        res.redirect('/sign-up');
      });
    });
};

exports.construction = (req, res) => {
  res.render('construction');
};

exports.home = (req, res) => {
  if (req.session.user) {
    res.render('dashboard', {
      username: req.session.user.username,
      weight: req.session.user.weight,
      feet: req.session.user.feet,
      inches: req.session.user.inches,
      age: req.session.user.age,
      gender: req.session.user.gender
    });
  } else {
    res.render('home', { errors: req.flash('errors') });
  }
};
