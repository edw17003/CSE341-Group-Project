const routes = require('express').Router();
const roleController = require('../controllers/roleController');
const { body, param, validationResult } = require('express-validator');

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

// POST new role
routes.post('/', validateRoleData, handleValidationErrors, async (req, res) => {
  roleController.createRole(req, res);
});

// GET all roles
routes.get('/', roleController.getAllRoles);

// GET role by ID
routes.get('/:roleId', validateRoleId, handleValidationErrors, roleController.getSingleRole);

// PUT update role by ID
routes.put('/:roleId', validateRoleId, validateRoleData, handleValidationErrors, roleController.updateRole);

// DELETE role by ID
routes.delete('/:roleId', validateRoleId, handleValidationErrors, roleController.deleteRole);

module.exports = routes;
