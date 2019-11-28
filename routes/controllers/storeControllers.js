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
