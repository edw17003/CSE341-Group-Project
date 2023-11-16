const mongoose = require('mongoose');

const ArtSchema = new mongoose.Schema({
  artId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  publicationDate: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Art', ArtSchema, 'arts');
