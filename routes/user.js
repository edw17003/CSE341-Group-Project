const routes = require('express').Router();
const users = require('../controllers/user.js');

routes.get('/', users.findAll);
routes.get('/:_id', users.findById);
routes.post('/', users.create);
routes.put('/:_id', users.editById);
routes.delete('/:_id', users.deleteById);

module.exports = routes;
