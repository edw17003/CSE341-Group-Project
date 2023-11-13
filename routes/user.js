const routes = require('express').Router();
const users = require('../controllers/user.js');

routes.get('/', users.findAll);
routes.get('/:_id', users.findById);

module.exports = routes;
