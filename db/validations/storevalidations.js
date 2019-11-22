const joi = require('joi')

module.exports = {
  createValidation: req => {
    const createSchema = {
      name: joi.string().required(),
      address: joi.string().required(),
      phoneNumber: joi.number().required(),
      items: joi.array().items(
          joi.object().keys({
            name:joi.string().required(),
            price:joi.number().required(),
            barcode:joi.number().required(),
            discount:joi.number()
          }).required()
      ).required()
    }
    return Joi.validate(req, createSchema)
  },

  updateValidation: req => {
    const updateSchema = {
        name: joi.string(),
        address: joi.string(),
        phoneNumber: joi.number(),
        items: joi.array().items(
            joi.object().keys({
              name:joi.string(),
              price:joi.number(),
              barcode:joi.number(),
              discount:joi.number()
            })
        )
      }
    return Joi.validate(req, updateSchema)
  }
}
