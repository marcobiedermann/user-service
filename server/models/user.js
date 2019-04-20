const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  github: {
    id: String,
    token: String,
  },
  google: {
    id: String,
    token: String,
  },
  twitter: {
    id: String,
    token: String,
  },
});

module.exports = mongoose.model('User', userSchema);
