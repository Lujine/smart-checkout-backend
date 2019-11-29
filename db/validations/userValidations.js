//import createItemSchema from './storevalidations';

const Joi = require('joi');

const PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}/;

module.exports = {
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
      shoppingCart: Joi.object().keys({
        store: Joi.objectId(),
        itemsSelected: Joi.array().items(
          Joi.objectId(),
        ),
        totalPrice: Joi.number().required(),
      }),
    };
    return Joi.validate(req, createSchema);
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
      shoppingCart: Joi.object().keys({
        store: Joi.objectId(),
        itemsSelected: Joi.array().items(
          Joi.objectId(),
        ),
        totalPrice: Joi.number(),
      }),
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
