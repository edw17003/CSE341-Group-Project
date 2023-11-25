const db = require('../models');
const Book = db.Book;

const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';


exports.findAll = (req, res) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Get all books'
  // #swagger.description = 'Get all books information from the database'
  if (req.header('apiKey') === apiKey) {
    Book.find(
      {},
      {
        _id: 1,
        title: 1,
        author: 1,
        genre: 1,
        publicationDate: 1,
        description: 1,
        associatedArtwork: 1
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'An error occurred while retrieving book.'
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

exports.findById = (req, res) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Get a book by Id'
  // #swagger.description = 'Get a book information from the database'
  let bookId = req.params._id;
  if (req.header('apiKey') === apiKey) { 
    Book.findById({ _id: bookId })
      .then((data) => {
        if (!data) res.status(404).send({ message: 'No book found with id ' + bookId });
        else res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving book with bookId ' + bookId,
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};


exports.getByAuthor = (req, res) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Get a book by author'
  // #swagger.description = 'Get a book information from the database by the author'
  let bookAuthor = req.params.author;
  if (req.header('apiKey') === apiKey) {
    Book.findOne({ author: bookAuthor })
      .then((data) => {
        if (!data) res.status(404).send({ message: 'No book found with author ' + bookAuthor });
        else res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving book with author ' + bookAuthor,
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

exports.create = async (req, res) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Create a new book'
  // #swagger.description = 'Create a new book and insert it into the database'
 

  if (req.header('apiKey') === apiKey) {
    try {
      const book = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publicationDate: req.body.publicationDate,
        description: req.body.description,
        associatedArtwork: req.body.associatedArtwork
      }
    )
      const data = await book.save();
      res.send(data)
    } catch(e) {
      res.status(500).send({ message: e.message })
    }
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

exports.editById = async (req, res) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Edit a book'
  // #swagger.description = 'Update book information by id'
  const bookId = req.params._id;
  if (req.header('apiKey') === apiKey) {
    try {

      //validate inputs
      if (!req.body.title || !req.body.author || !req.body.genre || !req.body.publicationDate|| !req.body.description|| !req.body.associatedArtwork) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
       }

      const updatedBook = await Book.findOneAndUpdate({ _id: bookId }, req.body, { new: true });
      if (!updatedBook) {
        return res.status(404).send({ message: 'No book found with id ' + bookIdId });
      }
      res.status(200).json(updatedBook);
    } catch (e) {
      res.status(500).send({ message: 'Error updating book: ' + e.message });
    }
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};


exports.deleteById = (req, res) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Delete a book'
  // #swagger.description = 'Delete book information by id'
  const bookId = req.params._id;
  if (req.header('apiKey') === apiKey) {
    Book.findOneAndDelete({ _id: bookId })
    .then((book) => {
      if (!book) {
        res.status(404).send({ message: 'No book found with id ' + bookId });
      } else {
        res.send({ message: 'Book deleted successfully' });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error deleting book with id ' + bookId
      });
    });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  } 
};
