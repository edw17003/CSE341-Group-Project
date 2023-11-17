const express = require('express');
const router = express.Router();

const artController = require('../controllers/art.js');

router.get('/', artController.getAllArts);
router.post('/', artController.createArt);
//router.get('/:userId', artController.getArtuserId);
router.get('/:artId', artController.getArt);
router.put('/:artId', artController.updateArt);
router.delete('/:artId', artController.deleteArt);

module.exports = router;







