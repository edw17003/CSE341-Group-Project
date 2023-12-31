const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.User = require('./User.js');
db.Art = require('./Art.js');
db.Book = require('./Books.js');
db.Art = require('./Art.js');

module.exports = db;
