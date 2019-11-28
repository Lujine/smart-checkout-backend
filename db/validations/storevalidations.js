const joi = require('joi');
joi.objectId = require('joi-objectid')(joi)

const createItemSchema = {
  name: joi.string().required(),
  price: joi.number().required(),
  barcode: joi.number().min(100000000000).max(999999999999).required(),
  discount: joi.number(),
};

const updateItemSchema = {
  name: joi.string(),
  price: joi.number(),
  barcode: joi.number().min(100000000000).max(999999999999),
  discount: joi.number(),
};

module.exports = {
  createItemSchema,
  createValidation: (req) => {
    const createSchema = {
      name: joi.string().required(),
      address: joi.string().required(),
      phoneNumber: joi.number().min(1000000000).max(9999999999).required(),
      items: joi.array().items(
        joi.object().keys(
          createItemSchema,
        ),
      ).required(),
    };
    return joi.validate(req, createSchema);
  },
  updateItemSchema,
  updateValidation: (req) => {
    const updateSchema = {
      name: joi.string(),
      address: joi.string(),
      phoneNumber: joi.number().min(1000000000).max(9999999999),
      items: joi.array().items(
        joi.object().keys(
          updateItemSchema,
        ),
      ),
    };
    return joi.validate(req, updateSchema);
  },
};
