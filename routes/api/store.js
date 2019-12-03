const express = require('express');

const router = express.Router();
const controller = require('../controllers/storeControllers.js');

// Store CRUDS
router.get('/', controller.default);

router.post('/', controller.create);

router.get('/:id', controller.read);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

// Items CRUDS
router.get('/:storeId/items', controller.allItems);

router.get('/:storeId/items/:itemId', controller.getItem);

router.post('/:storeId/items', controller.createItem);

router.put('/:storeId/items/:itemId', controller.updateItem);

router.delete('/:storeId/items/:itemId', controller.deleteItem);

module.exports = router;
