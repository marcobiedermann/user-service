const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

});

mongoose.model('User', userSchema);

module.exports = mongoose;
