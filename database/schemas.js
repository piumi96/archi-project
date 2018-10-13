const mongoose = require('mongoose');
const keys = require('../config/keys')

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
