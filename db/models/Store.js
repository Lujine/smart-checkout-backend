const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  barcode: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
});

const StoreSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  items: [ItemSchema],
});

module.exports = mongoose.model('Store', StoreSchema, 'store');
