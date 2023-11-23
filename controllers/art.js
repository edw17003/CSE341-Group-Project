const { validationResult } = require('express-validator');
const Art = require('../models/Art');

const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

// Get all artworks
exports.getAllArts = async (req, res) => {
  // #swagger.tags = ['Art']
  // #swagger.summary = 'Get all artworks'
  // #swagger.description = 'Get all artworks information from the database'

  try {
    // Check if the API key is valid
    if (req.header('apiKey') !== apiKey) {
      return res.status(401).send('Invalid apiKey, please read the documentation.');
    }

    // Retrieve all artworks with selected fields
    const data = await Art.find(
      {},
      {
        _id: 1,
        artId: 1,
        userId: 1,
        title: 1,
        description: 1,
        publicationDate: 1,
        genre: 1,
        image: 1
      }
    );

    res.status(200).send(data);
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    res.status(500).send({
      message: 'Internal server error.'
    });
  }
};

// Get a specific artwork by artId
exports.getArt = async (req, res) => {
  // #swagger.tags = ['Art']
  // #swagger.summary = 'Get an artwork by artId'
  // #swagger.description = 'Get artwork information from the database by artId'

  try {
    // Check if the API key is valid
    if (req.header('apiKey') !== apiKey) {
      return res.status(401).send('Invalid apiKey, please read the documentation.');
    }

    const artId = req.params.artId;

    // Retrieve artwork by artId
    const data = await Art.findOne({ artId: artId });

    if (!data) {
      return res.status(404).send({ message: 'No artwork found with artId: ' + artId });
    }

    res.send(data);
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    res.status(500).send({
      message: 'Internal server error.'
    });
  }
};

// Create a new artwork
exports.createArt = async (req, res) => {
  // #swagger.tags = ['Art']
  // #swagger.summary = 'Create a new artwork'
  // #swagger.description = 'Create a new artwork and insert it into the database'

  try {
    // Check if the API key is valid
    if (req.header('apiKey') !== apiKey) {
      return res.status(401).send('Invalid apiKey, please read the documentation.');
    }

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Parse the userId as an integer (or handle it appropriately based on your requirements)
    const userId = parseInt(req.body.userId);

    // Check if userId is a valid number
    if (isNaN(userId)) {
      return res.status(400).send('Invalid userId. Must be a number.');
    }

    // Create a new artwork instance
    const art = new Art({
      userId: userId,
      title: req.body.title,
      description: req.body.description,
      publicationDate: req.body.publicationDate,
      genre: req.body.genre,
      image: req.body.image
    });

    // Save the artwork to the database
    const data = await art.save();

    res.status(201).send(data);
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    res.status(500).send({
      message: 'Internal server error.'
    });
  }
};

// Get artworks by userId
exports.getArtByUserId = async (req, res) => {
  // #swagger.tags = ['Art']
  // #swagger.summary = 'Get artworks by userId'
  // #swagger.description = 'Get artworks information from the database by userId'

  try {
    // Check if the API key is valid
    if (req.header('apiKey') !== apiKey) {
      return res.status(401).send('Invalid apiKey, please read the documentation.');
    }

    const userId = req.params.userId;

    // Retrieve artworks by userId
    const data = await Art.find({ userId: userId });

    res.status(200).send(data);
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    res.status(500).send({
      message: 'Internal server error.'
    });
  }
};

// Update artwork by artId
exports.updateArt = async (req, res) => {
  // #swagger.tags = ['Art']
  // #swagger.summary = 'Update an artwork by artId'
  // #swagger.description = 'Update artwork information by artId'

  try {
    // Check if the API key is valid
    if (req.header('apiKey') !== apiKey) {
      return res.status(401).send('Invalid apiKey, please read the documentation.');
    }

    const artId = req.params.artId;

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Update artwork by artId
    const updatedArt = await Art.findOneAndUpdate({ artId: artId }, {
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description,
      publicationDate: req.body.publicationDate,
      genre: req.body.genre,
      image: req.body.image
    }, { new: true });

    if (!updatedArt) {
      return res.status(404).send({ message: 'No artwork found with artId: ' + artId });
    }

    res.status(200).send(updatedArt);
  } catch (error) {
    // Handle unexpected errors
    console.error(error);

    // Check if the error is a duplicate key error
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return res.status(409).send({ message: 'Data already exists.' });
    }

    res.status(500).send({
      message: 'Internal server error.'
    });
  }
};


// Delete artwork by artId
exports.deleteArt = async (req, res) => {
  // #swagger.tags = ['Art']
  // #swagger.summary = 'Delete an artwork by artId'
  // #swagger.description = 'Delete artwork information by artId'

  try {
    // Check if the API key is valid
    if (req.header('apiKey') !== apiKey) {
      return res.status(401).send('Invalid apiKey, please read the documentation.');
    }

    const artId = req.params.artId;

    // Delete artwork by artId
    const deletedArt = await Art.findOneAndDelete({ artId: artId });

    if (!deletedArt) {
      return res.status(404).send({ message: 'No artwork found with artId: ' + artId });
    }

    res.send({ message: 'Artwork deleted successfully' });
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    res.status(500).send({
      message: 'Internal server error.'
    });
  }
};
