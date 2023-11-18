const routes = require('express').Router();
const arts = require('../controllers/art.js');

routes.get('/', arts.getAllArts);
routes.post('/', arts.createArt);
//router.get('/:userId', artController.getArtuserId);
//router.get('/:artId', artController.getArt);
//router.put('/:artId', artController.updateArt);
//router.delete('/:artId', artController.deleteArt);

module.exports = routes;







