const express = require('express');

const router = express.Router();
const controller = require('../controllers/userControllers.js');

router.get('/', controller.getAll);

router.get('/:id', controller.get);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

router.post('/register', controller.register);

router.get('/:userId/cart', controller.getCart);
router.post('/login', controller.login);
router.put('/:userId/cart/', controller.updateCart);
router.delete('/:userId/cart/', controller.deleteCart);

router.get('/:userId/cart/item', controller.getAllItemsInCart);
router.get('/:userId/cart/item/:itemId', controller.getItemInCart);
router.post('/:userId/cart/item', controller.addItemToCart);
router.put('/:userId/cart/item/:itemId', controller.editItemInCart);
router.delete('/:userId/cart/item/:itemId', controller.deleteItemFromCart);

module.exports = router;
