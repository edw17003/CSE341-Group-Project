const db = require('../models');
const User = db.User;

const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

exports.findAll = (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get all users'
  // #swagger.description = 'Get all users information from the database'
  if (req.header('apiKey') === apiKey) {
    User.find(
      {},
      {
        _id: 0,
        googleId: 1,
        displayName: 1,
        firstName: 1,
        lastName: 1,
        image: 1,
        roleId: 1,
        biography: 1
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'An error occurred while retrieving user.'
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

exports.findById = (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get a user'
  // #swagger.description = 'Get a users information from the database'
  const googleId = req.params._id;
  if (req.header('apiKey') === apiKey) {
    User.findOne({ googleId: googleId })
      .then((data) => {
        if (!data) res.status(404).send({ message: 'No user found with id ' + googleId });
        else res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving user with id ' + googleId,
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

exports.create = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Create a new user'
  // #swagger.description = 'Create a new user and insert it into the database'
  if (!req.body.firstName) {
    console.log(req.body)
    res.status(400).send({ message: 'Content cannot be empty' })
    return;
  }

  if (req.header('apiKey') === apiKey) {
    try {
      const user = new User({
        _id: req.body._id,
        googleId: req.body.googleId,
        displayName: req.body.displayName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        image: req.body.image,
        roleId: req.body.roleId,
        biography: req.body.biography
      }
    )
      const data = await user.save();
      res.send(data)
    } catch(e) {
      res.status(500).send({ message: e.message })
    }
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

exports.editById = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Edit a user'
  // #swagger.description = 'Update user information by Google ID'
  const googleId = req.params._id;
  if (req.header('apiKey') === apiKey) {
    try {
      const updatedUser = await User.findOneAndUpdate({ googleId }, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).send({ message: 'No user found with id ' + googleId });
      }
      res.status(200).json(updatedUser);
    } catch (e) {
      res.status(500).send({ message: 'Error updating user: ' + e.message });
    }
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};


exports.deleteById = (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Delete a user'
  // #swagger.description = 'Delete user information by Google ID'
  const googleId = req.params._id;
  if (req.header('apiKey') === apiKey) {
    User.findOneAndDelete({ googleId: googleId })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'No user found with id ' + googleId });
      } else {
        res.send({ message: 'User deleted successfully' });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error deleting user with id ' + googleId
      });
    });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  } 
};
