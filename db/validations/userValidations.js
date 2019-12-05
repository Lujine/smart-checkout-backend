// import createItemSchema from './storevalidations';

const Joi = require('joi');

const PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}/;

const createItemSchema = Joi.object().keys({
  itemId: Joi.objectId().required(),
  amount: Joi.number().integer().min(1).required(),
});

const createCartSchema = Joi.object().keys({
  store: Joi.objectId(),
  itemsSelected: Joi.array().items(
    createItemSchema,
  ).required(),
  totalPrice: Joi.number().required(),
});

const updateItemSchema = Joi.object().keys({
  itemId: Joi.objectId().required(),
  amount: Joi.number().integer().min(1),
});

const updateCartSchema = Joi.object().keys({
  store: Joi.objectId(),
  itemsSelected: Joi.array().items(
    updateItemSchema,
  ),
  totalPrice: Joi.number(),
});

module.exports = {
  createCartItemValidation: (req) => {
    const createSchema = createItemSchema;
    return Joi.validate(req, createSchema);
  },
  createCartValidation: (req) => {
    const createSchema = createCartSchema;
    return Joi.validate(req, createSchema);
  },
  createValidation: (req) => {
    const createSchema = {
      name: Joi.object().keys({
        first: Joi.string().min(3).max(15).required(),
        last: Joi.string().min(3).max(15).required(),
      }).required(),
      birthdate: Joi.date().iso().max(Date.now()).required(),
      age: Joi.number().integer().min(18).required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWORD_REGEX).required(),
      isAdmin: Joi.bool().required(),
      // need to make the day equal
      dateJoined: Joi.date().iso().required(),
      shoppingCart: createCartSchema,
    };
    return Joi.validate(req, createSchema);
  },
  updateCartItemValidation: (req) => {
    const updateSchema = updateItemSchema;
    return Joi.validate(req, updateSchema);
  },
  updateCartValidation: (req) => {
    const updateSchema = updateCartSchema;
    return Joi.validate(req, updateSchema);
  },
  updateValidation: (req) => {
    const updateSchema = {
      name: Joi.object().keys({
        first: Joi.string().min(3).max(15),
        last: Joi.string().min(3).max(15),
      }),
      birthdate: Joi.date().iso().max(Date.now()),
      age: Joi.number().integer().min(18),
      email: Joi.string().email(),
      password: Joi.string().regex(PASSWORD_REGEX),
      isAdmin: Joi.bool(),
      // need to make the day equal
      dateJoined: Joi.date().iso(),
      shoppingCart: updateCartSchema,
    };
    return Joi.validate(req, updateSchema);
  },
  authValidation: (req) => {
    const authSchema = {
      email: Joi.string().email(),
      password: Joi.string().regex(PASSWORD_REGEX),
    };
    return Joi.validate(req, authSchema);
  },
};
