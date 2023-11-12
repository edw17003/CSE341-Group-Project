const routes = require('express').Router();
const users = require('../controllers/user.js');

routes.get('/', users.findAll);

module.exports = routes;
