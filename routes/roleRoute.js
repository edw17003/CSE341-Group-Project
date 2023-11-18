// Import necessary modules
const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const roleController = require('../controllers/roleController');
const Role = require('../models/Role');

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
router.post('/', validateRoleData, handleValidationErrors, async (req, res) => {
  try {
    const { roleId, roleName } = req.body;
    
    // Check if the role ID already exists
    const existingRole = await Role.findOne({ roleId });
    if (existingRole) {
      return res.status(400).json({ message: 'Role ID already exists' });
    }

    const newRole = new Role({ roleId, roleName });
    await newRole.save();

    // Send only roleId in the response
    res.status(201).json({ success: `Role is created successfully`, roleId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET all roles
router.get('/', roleController.getAllRoles);

// GET role by ID
router.get('/:roleId', validateRoleId, handleValidationErrors, roleController.getSingleRole);

// PUT update role by ID
router.put('/:roleId', validateRoleId, validateRoleData, handleValidationErrors, roleController.updateRole);

// DELETE role by ID
router.delete('/:roleId', validateRoleId, handleValidationErrors, roleController.deleteRole);

// Export the router for use in other files
module.exports = router;
