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
  // #swagger.description = 'Get a user's information from the database'
  const googleId = req.params._id;
  if (req.header('apiKey') === apiKey) {
    User.find({ googleId: googleId })
      .then((data) => {
        if (!data) res.status(404).send({ message: 'No user found with id ' + googleId });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving user with id ' + googleId
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

exports.create = (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Create a new user'
  // #swagger.description = 'Create a new user and insert it into the database'
  if (req.header('apiKey') === apiKey) {

  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

exports.editById = (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Edit a user'
  // #swagger.description = 'Update user information by Google ID'
  const googleId = req.params._id;
  if (req.header('apiKey') === apiKey) {

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

  } else {
    res.send('Invalid apiKey, please read the documentation.');
  } 
};
