// Entity model and validator
const Store = require('../../db/models/Store');
const validator = require('../../db/validations/storevalidations');

exports.default = async (req, res) => {
  const stores = await Store.find();
  return res.status(200).json({
    status: 'Success',
    data: stores,
  });
};

exports.create = async (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(400).json({
      status: 'Error',
      message: "body can't be empty",
    });
  }

  const validated = validator.createValidation(data);
  if (validated.error) {
    return res.status(400).json({
      status: 'Validation Error',
      message: validated.error,
    });
  }

  try {
    const newStore = new Store(data);
    await newStore.save();

    return res.status(200).json({
      status: 'success',
      message: `New store created with id ${newStore.id}`,
      data: newStore,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error,
    });
  }
};

exports.read = async (req, res) => {
  const storeId = req.params.id;
  const currentStore = await Store.findById(storeId);
  if (!currentStore) {
    return res.status(400).json({
      status: 'Error',
      message: 'no store exists with this id',
    });
  }
  return res.status(200).json({
    status: 'success',
    data: currentStore,
  });
};

exports.update = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({
      status: 'Error',
      message: "body can't be empty",
    });
  }
  try {
    const storeId = req.params.id;
    const validated = validator.updateValidation(data);
    if (validated.error) {
      return res.status(400).json({
        status: 'Error',
        message: validated.error.details[0].message,
      });
    }
    const query = { _id: storeId };
    const updatedStore = await Store.findByIdAndUpdate(query, data, { new: true });
    if (!updatedStore) {
      res.status(400).json({
        status: 'Error',
        message: 'Could not find the store you are looking for!',
      });
    }
    return res.status(200).json({
      status: 'Success',
      message: `Updated store with id ${storeId}`,
      data: updatedStore,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const storeId = req.params.id;
    const removedStore = await Store.findByIdAndRemove(storeId);
    if (!removedStore) {
      return res.status(400).json({
        status: 'Error',
        message: 'store not found',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: `deleted store with id ${storeId}`,
      deleted: removedStore,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message,
    });
  }
};

exports.allItems = async (req, res) => {
  try {
    const { storeId } = req.params;
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(400).json({
        status: 'Error',
        message: 'store not found',
      });
    }
    const { items } = store;
    return res.status(200).json({
      status: 'Success',
      data: items,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message,
    });
  }
};

exports.getItem = async (req, res) => {
  const { storeId, itemId } = req.params;
  try {
    const store = await Store.findById(storeId);
    const item = store.items.id(itemId);
    if (!item) {
      return res.status(400).json({
        status: 'Error',
        message: 'Item not found',
      });
    }

    return res.status(200).json({
      status: 'Success',
      data: item,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message,
    });
  }
};

exports.createItem = (async (req, res) => {
  const { storeId } = req.params;
  const data = req.body;

  if (!data) {
    return res.status(400).json({
      status: 'Error',
      message: "body can't be empty",
    });
  }
  const validated = validator.createItemValidation(data);

  if (validated.error) {
    return res.status(400).json({
      status: 'Validation Error',
      message: validated.error,
    });
  }

  try {
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(400).json({
        status: 'Error',
        message: 'No store exists with this id',
      });
    }
    store.items.push(data);
    const newItem = store.items[0];
    // eslint-disable-next-line no-unused-expressions
    newItem.isNew;
    const saved = await store.save();
    if (saved.error) {
      return res.status(400).json({
        status: 'Error',
        message: 'Error saving to DB',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: `Added item with id ${newItem.id} to store with id ${store.id}`,
      data: store,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error,
    });
  }
});

exports.updateItem = (async (req, res) => {
  const { storeId, itemId } = req.params;
  const data = req.body;

  if (!data) {
    return res.status(400).json({
      status: 'Error',
      message: "Body can't be empty",
    });
  }
  const validated = validator.updateItemValidation(data);
  if (validated.error) {
    return res.status(400).json({
      status: 'Validation Error',
      message: validated.error,
    });
  }

  try {
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(400).json({
        status: 'Error',
        message: 'No store exists with this id',
      });
    }
    const updatedItem = store.items.id(itemId);
    updatedItem.set(data);

    const saved = await store.save();
    if (saved.error) {
      return res.status(400).json({
        status: 'Error',
        message: 'Error saving to DB',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: `Updated item with id ${updatedItem.id} in store with id ${store.id}`,
      data: store,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error,
    });
  }
});

exports.deleteItem = (async (req, res) => {
  const { storeId, itemId } = req.params;

  try {
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(400).json({
        status: 'Error',
        message: 'No store exists with this id',
      });
    }
    // TODO add deletion code
    store.items.id(itemId).remove();

    const saved = await store.save();
    if (saved.error) {
      return res.status(400).json({
        status: 'Error',
        message: 'Error saving to DB',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: `Deleted item with id ${itemId} from store with id ${store.id}`,
      data: store,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error,
    });
  }
});
