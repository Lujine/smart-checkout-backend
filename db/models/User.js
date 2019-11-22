// The admin model
const mongoose = require('mongoose');

const Schema = { mongoose };

const UserSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
  },
  birthdate: {
    type: Date,
    required: true,
  },
  age: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  dateJoined: {
    type: Date,
    required: true,
  },
  shoppingCart: {
    itemsSelected: [{
      type: Schema.Types.ObjectId,
      ref: 'Store',
    }],
    totalprice: {
      type: Number,
      required: true,
    },
  },
});

module.exports = mongoose.model('User', UserSchema);
