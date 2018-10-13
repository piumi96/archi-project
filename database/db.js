const express = require('express');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const user = keys.db.user;

const db = mongoose.connect(user);

module.exports = db;