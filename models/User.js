const usersCollection = require('../db').collection('users');
const validator = require('validator');

let User = function(data) {
  this.data = data;
  this.errors = [];
};
User.prototype.validate = function() {
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
  if (this.data.password.length > 100) {
    this.errors.push('Password cannot exceed 100 characters');
  }
  if (this.data.username.length > 0 && this.data.username.length < 4) {
    this.errors.push('Username must be atleast 4 characters');
  }
  if (this.data.username.length > 15) {
    this.errors.push('Username cannot exceed 15 characters');
  }
};
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

  // get rid of any bogus properties
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

User.prototype.register = function() {
  // Validate user data
  this.cleanUp();
  this.validate();
  // If no validation errors
  if (!this.errors.length) {
    usersCollection.insertOne(this.data);
  }
  // Save user data into database
};

module.exports = User;
