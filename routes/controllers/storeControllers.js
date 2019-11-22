// Entity model and validator
const Model = require('../../db/models/Store')
const validator = require('../../db/validations/storevalidations')

exports.default = async (req, res) => {
    const stores = await Model.find()
    return res.json({
        status: 'Success',
        data: stores
    })

}
exports.create = async (req, res) => {
    const data = req.body
    if (!data) {
      return res.status(400).json({
          status:'error',
          msg: "body can't be empty"
      })
    }
  
    try {
      const validated = validator.createValidation(data)
      if (validated.error) {
        return res.status(400).json({
            status:'error',
            msg: validated.error.details[0].message
        })
      }
      const newStore = await Model.create(data)
      return res.json({
        status: 'success',
        message: `New store created with id ${newStore.id}`,
        data: newStore
      })
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message
      })
    }
}
exports.read = async (req, res) => {
    const storeId = req.params.id
    const currentStore = await Model.findById(storeId)
    if (!currentStore) {
        return res.status(400).json({
            status:'error',
            msg:'no store exists with this id'
        })
    }
    return res.json({
        status: 'success',
        data: currentStore
    })
}
exports.update = async (req, res) => {
    const data = req.body
    if (!data) {
        return res.status(400).json({
            status:'error',
            msg: "body can't be empty"
        })
    }
    try {
        const storeId = req.params.id
        const validated = validator.updateValidation(data)
        if (validated.error) {
            return res.status(400).json({
                status:'error',
                msg: validated.error.details[0].message
            })
        }
        const query = { '_id': storeId }
        const updatedStore =  await Model.findByIdAndUpdate(query, data, { new: true })
        if (!updatedStore) {
            res.status(400).json({
              status: 'Error',
              message: `Could not find the store you are looking for!`
            })
        }
        return res.json({
        status: 'Success',
        message: `Updated store with id ${storeId}`,
        data: updatedStore
        })
    } catch (error) {
        return res.status(400).json({
        status: 'Error',
        message: error.message
        })
      }
}

exports.delete = async (req, res) => {
    try {
        const storeId = req.params.id
        const removedStore = await Model.findByIdAndRemove(storeId)
        if (!removedStore) {
            return res.status(400).json({
            status: 'error',
            msg: `store not found`,
            })
        }
      return res.json({
        status: 'success',
        message: `deleted store with id ${storeId}`,
        deleted: removedStore,
      })
    } catch (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.message
      })
    }
}
