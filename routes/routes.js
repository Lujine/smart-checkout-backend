const models = require('express').Router();
const store = require('./api/store');
const user = require('./api/user');

models.use('/store', store);
models.use('/user', user);

models.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = models;
