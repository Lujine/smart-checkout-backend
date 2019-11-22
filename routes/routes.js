const models = require('express').Router();
const store = require('./api/store');

models.use('/store', store);


module.exports = models;
