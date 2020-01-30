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
  res.render('sign-up');
};

exports.register = (req, res) => {
  let user = new User(req.body);
  user.register();
  if (user.errors.length) {
    res.send(user.errors);
  } else {
    res.send('Congrats there are no errors!');
  }
};

exports.construction = (req, res) => {
  res.render('construction');
};

exports.home = (req, res) => {
  if (req.session.user) {
    res.render('dashboard', {
      username: req.session.user.username
    });
  } else {
    res.render('home', { errors: req.flash('errors') });
  }
};
