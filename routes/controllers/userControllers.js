const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../db/models/User');
const UserValidation = require('../../db/validations/userValidations');
const getAge = require('../../utils/helpers');


exports.getAll = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(400).json({
        status: 'Fail',
        message: 'Failed to retrieve all users',
      });
    }
    return res.status(200).json({
      status: 'Success',
      message: 'Successfully retrieved all users',
      data: users,
    });
  } catch (err) {
    return (
      res.status(400).json({
        status: 'Error',
        message: 'Error getting all users',
        error: err,
      }));
  }
};

exports.get = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        status: 'Fail',
        message: `Failed to retrieve user with id ${id}`,
      });
    }
    return res.status(200).json({
      status: 'Success',
      message: `Successfully retrieved user with id ${id}`,
      data: user,
    });
  } catch (err) {
    console.error(err);
    return (
      res.status(400).json({
        status: 'Error',
        message: `Failed to retrieve user with id ${id}`,
        error: err,
      }));
  }
};

exports.create = async (req, res) => {
  const data = req.body;

  if (Object.keys(req.body).length === 0) {
    return (
      res.status(400).json({
        status: 'Error',
        message: 'No data was sent to create user',
      }));
  }
  const age = getAge('1998-11-01');
  data.age = age;
  console.log(data);

  const validated = UserValidation.createValidation(data);
  if (validated.error) {
    return (
      res.status(400).json({
        status: 'Error',
        message: validated.error,
      }));
  }

  try {
    const newUser = await User.create(data);
    return res.json({
      status: 'Success',
      message: `Successfully created new user with id ${newUser.id}`,
      data: newUser,
    });
  } catch (err) {
    console.error(`Error\n${err}`);
    return (
      res.status(400).json({
        status: 'Error',
        message: 'Error creating user',
        data: null,
        error: err,
      }));
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (Object.keys(req.body).length === 0) {
    return (
      res.status(400).json({
        status: 'Error',
        message: 'No data was sent to update user',
      }));
  }
  const validated = UserValidation.updateValidation(data);
  if (validated.error) {
    return (
      res.status(400).json({
        status: 'Error',
        message: validated.error,
      }));
  }
  try {
    const query = { _id: id };
    const updatedUser = await User.findByIdAndUpdate(query, data, { new: true });

    if (!updatedUser) {
      return (
        res.status(400).json({
          status: 'Error',
          message: `Could not update the User with id ${id}`,
        }));
    }
    return (
      res.status(200).json({
        status: 'Success',
        message: `Successfully updated User with id ${id}`,
        data: updatedUser,
      }));
  } catch (err) {
    console.error(err);
    return (
      res.status(400).json({
        status: 'Error',
        message: `Error updating user with id ${id}`,
        data: null,
        error: err,
      }));
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndRemove(id);
    if (!deletedUser) {
      return (
        res.status(400).json({
          status: 'Error',
          message: 'User not found',
          data: null,
        }));
    }
    return (
      res.status(200).json({
        staus: 'Success',
        message: `Successfully deleted user with id ${id}`,
        data: deletedUser,
      }));
  } catch (err) {
    console.error(err);
    return (
      res.status(400).json({
        status: 'Error',
        message: `Error deleting user with id ${id}`,
        data: null,
        error: err,
      }));
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    const cart = user.shoppingCart;

    if (!cart) {
      if (user.isAdmin) {
        return res.status(400).json({
          status: 'Fail',
          message: 'Admins do not have carts',
        });
      }
      return res.status(400).json({
        status: 'Fail',
        message: `Failed to retrieve the cart of the user with id ${userId}`,
      });
    }
    return res.status(200).json({
      status: 'Success',
      data: cart,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'Error',
      message: err.message,
    });
  }
};

exports.updateCart = async (req, res) => {
  const { userId } = req.params;
  const data = req.body;

  if (!data) {
    return res.status(400).json({
      status: 'Error',
      message: "body can't be empty",
    });
  }
  const validated = UserValidation.updateCartValidation(data);
  if (validated.error) {
    return res.status(400).json({
      status: 'Validation Error',
      message: validated.error,
    });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: 'Error',
        message: 'No user exists with this id',
      });
    }
    user.shoppingCart = data;
    const cart = user.shoppingCart;
    // eslint-disable-next-line no-unused-expressions
    cart.isNew;
    const saved = await user.save();
    if (saved.error) {
      return res.status(400).json({
        status: 'Error',
        message: 'Error saving to DB',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: `New cart with id ${cart.id} created for user with id ${user.id}`,
      data: cart,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'Error',
      message: err,
    });
  }
};

exports.deleteCart = async (req, res) => {
  const { userId } = req.params;
  const data = {
    totalPrice: 0,
  };

  const validated = UserValidation.createcartValidation(data);
  if (validated.error) {
    return res.status(400).json({
      status: 'Validation Error',
      message: validated.error,
    });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: 'Error',
        message: 'No user exists with this id',
      });
    }
    user.shoppingCart = data;
    const cart = user.shoppingCart;
    // eslint-disable-next-line no-unused-expressions
    cart.isNew;
    const saved = await user.save();
    if (saved.error) {
      return res.status(400).json({
        status: 'Error',
        message: 'Error saving to DB',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: `New cart with id ${cart.id} created for user with id ${user.id}`,
      data: cart,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'Error',
      message: err,
    });
  }
};

exports.getAllItemsInCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: 'Fail',
        message: `Failed to retrieve the user with id ${userId}`,
      });
    }
    const cart = user.shoppingCart;
    if (!cart) {
      return res.status(400).json({
        status: 'Fail',
        message: `Failed to retrieve the cart of the user with id ${userId}`,
      });
    }
    const items = cart.itemsSelected;
    if (!items) {
      return res.status(400).json({
        status: 'Fail',
        message: `Failed to retrieve the items of the cart of the user with id ${userId}`,
      });
    }
    return res.status(200).json({
      status: 'Success',
      data: items,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'Error',
      message: err.message,
    });
  }
};

exports.getItemInCart = async (req, res) => {
  const { userId, itemId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: 'Fail',
        message: `Failed to retrieve the user with id ${userId}`,
      });
    }
    const cart = user.shoppingCart;
    if (!cart) {
      return res.status(400).json({
        status: 'Fail',
        message: `Failed to retrieve the cart of the user with id ${userId}`,
      });
    }
    const items = cart.itemsSelected;
    const item = items.find((selectedItem) => selectedItem.itemId === itemId);
    return res.status(200).json({
      status: 'Success',
      data: item,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'Error',
      message: err.message,
    });
  }
};

exports.addItemToCart = async (req, res) => {
  const { userId } = req.params;
  const data = req.body;

  if (!data) {
    return res.status(400).json({
      status: 'Error',
      message: "body can't be empty",
    });
  }
  const validated = UserValidation.createCartItemValidation();
  if (validated.error) {
    return res.status(400).json({
      status: 'Validation Error',
      message: validated.error,
    });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: 'Fail',
        message: `Failed to retrieve the user with id ${userId}`,
      });
    }
    const cart = user.shoppingCart;
    if (!cart) {
      return res.status(400).json({
        status: 'Fail',
        message: `Failed to retrieve the cart of the user with id ${userId}`,
      });
    }
    const items = cart.itemsSelected;
    items.push(data);
    user.shoppingCart.totalPrice+=data.price;
    console.log("test test")
    console.log(user.shoppingCart)

    user.markModified('shoppingCart.itemsSelected');
    user.markModified('shoppingCart.totalPrice');
    
    const saved = await user.save();
    if (saved.error) {
      return res.status(400).json({
        status: 'Error',
        message: 'Error saving to DB',
      });
    }

    return res.status(200).json({
      status: 'Success',
      data: items,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'Error',
      message: err.message,
    });
  }
};

exports.editItemInCart = async (req, res) => {
  const { userId, itemId } = req.params;
  const data = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: 'Fail',
        message: `Failed to retrieve the user with id ${userId}`,
      });
    }
    const cart = user.shoppingCart;
    if (!cart) {
      return res.status(400).json({
        status: 'Fail',
        message: `Failed to retrieve the cart of the user with id ${userId}`,
      });
    }
    const items = cart.itemsSelected;
    const itemIndex = items.findIndex((selectedItem) => selectedItem.itemId === itemId);
    items[itemIndex] = data;
    const item = items[itemIndex];

    user.markModified('shoppingCart.itemsSelected');
    const saved = user.save();

    if (saved.error) {
      return res.status(400).json({
        status: 'Error',
        message: 'Error saving to DB',
      });
    }
    return res.status(200).json({
      status: 'Success',
      data: items,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'Error',
      message: err.message,
    });
  }
};

exports.deleteItemFromCart = async (req, res) => {
  const { userId, itemId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: 'Fail',
        message: `Failed to retrieve the user with id ${userId}`,
      });
    }
    const cart = user.shoppingCart;
    if (!cart) {
      return res.status(400).json({
        status: 'Fail',
        message: `Failed to retrieve the cart of the user with id ${userId}`,
      });
    }
    const items = cart.itemsSelected;
    const itemIndex = items.findIndex((selectedItem) => selectedItem.itemId === itemId);
    items.splice(itemIndex, 1);

    user.markModified('shoppingCart.itemsSelected')
    const saved = await user.save();
    if(saved.error) {
      return res.status(400).json({
        status: 'Error',
        message: 'Error saving to DB',
      });
    }
    return res.status(200).json({
      status: 'Success',
      data: items,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'Error',
      message: err.message,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { body } = req;
    if (!body) {
      return res.status(400).json({
        status: 'error',
        msg: "body can't be empty",
      });
    }
    body.isAdmin = false;
    body.dateJoined = new Date().toISOString();
    const valid = UserValidation.createValidation(body);
    if (valid.error) {
      return res.status(400).json({
        status: 'error',
        message: valid.error.details[0].message,
      });
    }
    User.findOne({ email: body.email })
      .then((user) => {
        if (user) {
          return res.status(400).json({
            status: 'error',
            msg: 'a user with that email already exists',
          });
      }
    })

    const newUser = new User(body);

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
          .then((user) => {
            jwt.sign(
              { id: user._id },
              process.env.jwtSecret,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                return res.json({
                  status: 'success',
                  token,
                  data: user,
                });
              },
            );
          });
      });
    });
  } catch (err) {
    console.error(err);
    return (
      res.status(400).json({
        status: 'Error',
        message: 'Error registering user',
        error: err,
      }));
  }
};

exports.login = async (req, res) => {
  try {
    const { body } = req;
    if (!body) {
      return res.status(400).json({
        status: 'error',
        msg: "body can't be empty",
      });
    }
    const valid = UserValidation.authValidation(body);
    if (valid.error) {
      return res.status(400).json({
        status: 'error',
        message: valid.error.details[0].message,
      });
    }

    User.findOne({ email: body.email })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            status: 'error',
            msg: 'user with that email does not exists',
          });
        }

        // validate password
        bcrypt.compare(body.password, user.password)
          .then((match) => {
            if (!match) {
              return res.status(400).json({
                status: 'error',
                msg: 'wrong password',
              });
            }
            jwt.sign(
              { id: user._id },
              process.env.jwtSecret,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;

                res.json({
                  status: 'success',
                  token,
                  data: user,
                });
              },
            );
          });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.error(err);
    return (
      res.status(400).json({
        status: 'Error',
        message: 'Error logging in user',
        error: err,
      }));
  }
};
