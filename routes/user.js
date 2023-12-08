const routes = require('express').Router();
const users = require('../controllers/user.js');
const checkRoleAuth = require('../middleware/jwtAuth');

routes.get('/', users.findAll);
routes.get('/:_id', checkRoleAuth([1]), users.findById);
routes.post('/', users.create);
routes.put('/:_id', checkRoleAuth([3]), users.editById);
routes.delete('/:_id', checkRoleAuth([3]), users.deleteById);

module.exports = routes;

// level 3 for put and delete
