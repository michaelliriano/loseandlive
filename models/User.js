const bcrypt = require('bcryptjs');
const usersCollection = require('../db')
  .db()
  .collection('users');
const validator = require('validator');

let User = function(data) {
  this.data = data;
  this.errors = [];
};

// Sign up validation

User.prototype.validate = function() {
  return new Promise(async (resolve, reject) => {
    if (this.data.username == '') {
      this.errors.push('You must provide a username.');
    }
    if (
      this.data.username != '' &&
      !validator.isAlphanumeric(this.data.username)
    ) {
      this.errors.push('Username can only contain letters and numbers');
    }
    if (!validator.isEmail(this.data.email)) {
      this.errors.push('You must provide a valid email address.');
    }
    if (this.data.password == '') {
      this.errors.push('You must provide a password.');
    }
    if (this.data.gender == '') {
      this.errors.push('Please pick from the following');
    }
    if (this.data.age == '') {
      this.errors.push('You must provide a age.');
    }
    if (this.data.weight == '') {
      this.errors.push('You must provide your weight.');
    }
    if (this.data.weight < 30 || this.data.weight > 700) {
      this.errors.push('You must provide valid weight.');
    }
    if (this.data.feet == '') {
      this.errors.push('You must provide a valid height in feet.');
    }
    if (this.data.feet < 1 || this.data.feet > 10) {
      this.errors.push('You must provide valid number in feet.');
    }
    if (this.data.inches == '') {
      this.errors.push('You must provide a valid height in inches.');
    }
    if (this.data.inches < 0 || this.data.inches > 11) {
      this.errors.push('You must provide valid number in inches.');
    }
    if (this.data.password.length > 0 && this.data.password.length < 8) {
      this.errors.push('Password must be atleast 8 characters');
    }
    if (this.data.password.length > 50) {
      this.errors.push('Password cannot exceed 50 characters');
    }
    if (this.data.username.length > 0 && this.data.username.length < 4) {
      this.errors.push('Username must be atleast 4 characters');
    }
    if (this.data.username.length > 20) {
      this.errors.push('Username cannot exceed 20 characters');
    }
    if (
      this.data.username.length > 2 &&
      this.data.username.length < 31 &&
      validator.isAlphanumeric(this.data.username)
    ) {
      let usernameExists = await usersCollection.findOne({
        username: this.data.username
      });
      if (usernameExists) {
        this.errors.push('This username is already taken');
      }
    }
    if (validator.isEmail(this.data.email)) {
      let emailExists = await usersCollection.findOne({
        email: this.data.email
      });
      if (emailExists) {
        this.errors.push('This email is already taken');
      }
      resolve();
    }
  });
};

User.prototype.login = function() {
  return new Promise((resolve, reject) => {
    this.cleanUp();
    usersCollection
      .findOne({
        username: this.data.username
      })
      .then(attemptedUser => {
        if (
          attemptedUser &&
          bcrypt.compareSync(this.data.password, attemptedUser.password)
        ) {
          resolve('Congrats');
        } else {
          reject('invalid username/password');
        }
      })
      .catch(function() {
        reject('Please try again later');
      });
  });
};

// Cleanup inputs

User.prototype.cleanUp = function() {
  if (typeof this.data.username != 'string') {
    this.data.username = '';
  }
  if (typeof this.data.email != 'string') {
    this.data.email = '';
  }
  if (typeof this.data.password != 'string') {
    this.data.password = '';
  }
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password,
    gender: this.data.gender,
    age: this.data.age,
    weight: this.data.weight,
    feet: this.data.feet,
    inches: this.data.inches
  };
};

// Register Function

User.prototype.register = function() {
  return new Promise(async (resolve, reject) => {
    // Validate user data
    this.cleanUp();
    await this.validate();
    // If no validation errors
    if (!this.errors.length) {
      // hash password
      let salt = bcrypt.genSaltSync(10);
      this.data.password = bcrypt.hashSync(this.data.password, salt);
      usersCollection.insertOne(this.data);
      resolve();
    } else {
      reject(this.errors);
    }
  });
};

module.exports = User;
