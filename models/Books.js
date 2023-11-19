const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  publicationDate: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  associatedArtwork: {
    type: String
  }
});

module.exports = mongoose.model('Book', BookSchema, 'books');



// Books: This collection will store information about books, 
// including details such as title, author, genre, publication date,
// description, and associated artwork.