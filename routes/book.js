const routes = require('express').Router();
const book = require('../controllers/book');

routes.get('/', book.findAll);
routes.get('/:_id', book.findById);
routes.get('/bookAuthor/:author',book.getByAuthor );
routes.post('/', book.create);
routes.put('/:_id', book.editById);
routes.delete('/:_id', book.deleteById);

module.exports = routes;

