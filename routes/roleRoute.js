const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const roleController = require('../controllers/roleController');

// Validation middleware for role ID
const validateRoleId = param('roleId').isNumeric().withMessage('Invalid role ID format');

// Validation middleware for role data
const validateRoleData = [
  body('roleId').isNumeric().withMessage('Role ID must be a number'),
  body('roleName').notEmpty().withMessage('Role Name is required')
];

// Error handling middleware for validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Role Routes
router.get('/roles', roleController.getAllRoles);
router.get('/roles/:roleId', validateRoleId, handleValidationErrors, roleController.getSingleRole);
router.post('/roles', validateRoleData, handleValidationErrors, roleController.createRole);
router.put(
  '/roles/:roleId',
  validateRoleId,
  validateRoleData,
  handleValidationErrors,
  roleController.updateRole
);
router.delete('/roles/:roleId', validateRoleId, handleValidationErrors, roleController.deleteRole);

module.exports = router;
