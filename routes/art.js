const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const artController = require('../controllers/art');
const checkRoleAuth = require('../middleware/jwtAuth');

// Define routes

// Get all arts
router.get('/', checkRoleAuth([1]), artController.getAllArts);

// Create a new art
router.post(
  '/',
  [
    // Validation for required fields in the request body
    body('userId').notEmpty().withMessage('userId is required'),
    body('title').notEmpty().withMessage('title is required'),
    body('description').notEmpty().withMessage('description is required'),
    body('publicationDate').notEmpty().withMessage('publicationDate is required'),
    body('genre').notEmpty().withMessage('genre is required'),
    body('image').notEmpty().withMessage('image is required')
  ],
  checkRoleAuth([3]),
  artController.createArt
);

// Get art by userId
router.get(
  '/user/:userId',
  [
    // Validation for required userId parameter
    param('userId').notEmpty().withMessage('userId parameter is required')
  ],
  checkRoleAuth([1]),
  artController.getArtByUserId
);

// Get art by artId
router.get(
  '/:artId',
  [
    // Validation for required artId parameter
    param('artId').notEmpty().withMessage('artId parameter is required')
  ],
  checkRoleAuth([1]),
  artController.getArt
);

// Update art by artId
router.put(
  '/:artId',
  [
    // Validation for required artId parameter and fields in the request body
    param('artId').notEmpty().withMessage('artId parameter is required'),
    body('userId').notEmpty().withMessage('userId is required'),
    body('title').notEmpty().withMessage('title is required'),
    body('description').notEmpty().withMessage('description is required'),
    body('publicationDate').notEmpty().withMessage('publicationDate is required'),
    body('genre').notEmpty().withMessage('genre is required'),
    body('image').notEmpty().withMessage('image is required')
  ],
  checkRoleAuth([3]),
  artController.updateArt
);

// Delete art by artId
router.delete(
  '/:artId',
  [
    // Validation for required artId parameter
    param('artId').notEmpty().withMessage('artId parameter is required')
  ],
  checkRoleAuth([3]),
  artController.deleteArt
);

module.exports = router;
