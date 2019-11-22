const models = require('express').Router();
const user = require('./api/user');

models.use('/user', user);

module.exports = models;
