const joi = require('joi')

module.exports = {
  createValidation: req => {
    const createSchema = {
      name: joi.string().required(),
      address: joi.string().required(),
      phoneNumber: joi.number().min(1000000000).max(9999999999).required(),
      items: joi.array().items(
          joi.object().keys({
            name:joi.string().required(),
            price:joi.number().required(),
            barcode:joi.number().required(),
            discount:joi.number()
          }).required()
      ).required()
    }
    return joi.validate(req, createSchema)
  },

  updateValidation: req => {
    const updateSchema = {
        name: joi.string(),
        address: joi.string(),
        phoneNumber: joi.number().min(1000000000).max(9999999999),
        items: joi.array().items(
            joi.object().keys({
              name:joi.string(),
              price:joi.number(),
              barcode:joi.number(),
              discount:joi.number()
            })
        )
      }
    return joi.validate(req, updateSchema)
  }
}
