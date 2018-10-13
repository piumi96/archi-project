const mongoose = require('mongoose');
const keys = require('../config/keys')

var truckSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String
});

var publicSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String
});

var Trucker = mongoose.model('Trucker', truckSchema);
var Public = mongoose.model('Public', publicSchema);

module.exports = {
    Trucker: Trucker,
    Public: Public
}
