const express = require('express');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const truck = keys.db.truck;
const admin = keys.db.admin;

const db = mongoose.connect(truck);

module.exports = db;