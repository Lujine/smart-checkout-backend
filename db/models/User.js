const mongoose = require('mongoose');

const { Schema } = mongoose;

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
    type: Number,
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
    type: {
      store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        require: true,
      },
      itemsSelected: {
        type: [{
          itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Store.items',
            required: true,
          },
          amount: {
            type: Number,
            required: true,
          },
        }],
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
    // eslint-disable-next-line func-names, object-shorthand
    required: (function () { return this.isAdmin === false; }),
  },

});


module.exports = mongoose.model('User', UserSchema);
