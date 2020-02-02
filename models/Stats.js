const usersCollection = require('../db')
  .db()
  .collection('users');

let Stats = function(data) {
  this.data = data;
  this.errors = [];
};

Stats.prototype.display = function() {};
module.exports = Stats;
