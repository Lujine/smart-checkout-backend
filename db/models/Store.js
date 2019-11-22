const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StoreSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('Store', StoreSchema, 'store')
