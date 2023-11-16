const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const Role = require('../models/role');
const roleController = require('../controllers/roleController');

// Validation middleware for role ID
const validateRoleId = param('roleId').isNumeric().withMessage('Invalid role ID format');

// Validation middleware for role data
const validateRoleData = [
  body('roleId').isNumeric().withMessage('Role ID must be a number'),
  body('roleName').notEmpty().withMessage('Role Name is required'),
];

// Error handling middleware for validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET all roles
router.get('/roles', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET role by ID
router.get('/roles/:roleId', validateRoleId, handleValidationErrors, async (req, res) => {
  try {
    const roleId = req.params.roleId;
    const role = await Role.findOne({ roleId });
    
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST new role
router.post('/roles', validateRoleData, handleValidationErrors, async (req, res) => {
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


// PUT update role by ID
router.put('/roles/:roleId', validateRoleId, validateRoleData, handleValidationErrors, async (req, res) => {
  try {
    const roleId = req.params.roleId;
    const { roleName } = req.body;

    const role = await Role.findOne({ roleId });
    
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Update role data
    role.roleName = roleName;
    await role.save();

    res.json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// PUT update role by ID
router.put('/roles/:roleId', validateRoleId, validateRoleData, handleValidationErrors, async (req, res) => {
  try {
    const roleId = req.params.roleId;
    const { roleName } = req.body;

    const role = await Role.findOne({ roleId });

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Update role data
    role.roleName = roleName;
    await role.save();

    // Send only success message and roleId in the response
    res.json({ success: `Role updated successfully`, roleId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// DELETE role by ID
router.delete('/roles/:roleId', validateRoleId, handleValidationErrors, async (req, res) => {
  try {
    const roleId = req.params.roleId;

    const role = await Role.findOne({ roleId });

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    await role.remove();

    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
