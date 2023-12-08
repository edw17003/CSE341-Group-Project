const routes = require('express').Router();
const book = require('../controllers/book');
const  checkRoleAuth = require('../middleware/jwtAuth');

routes.get('/', checkRoleAuth([1]) , book.findAll);
routes.get('/:_id', checkRoleAuth([1]) ,book.findById);
routes.get('/bookAuthor/:author',checkRoleAuth([1]), book.getByAuthor );
routes.post('/', checkRoleAuth([3]),book.create);
routes.put('/:_id', checkRoleAuth([3]), book.editById);
routes.delete('/:_id', checkRoleAuth([3]), book.deleteById);

module.exports = routes;

//role changed