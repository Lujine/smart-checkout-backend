const express = require('express');

const router = express.Router();
const controller = require('../controllers/userControllers.js');

router.get('/', controller.getAll);

router.get('/:id', controller.get);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

router.post('/register', controller.register);

router.post('/login', controller.login);


module.exports = router;
