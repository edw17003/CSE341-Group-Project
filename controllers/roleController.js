const { body, validationResult } = require('express-validator');
const Role = require('../models/role');

// Validation middleware for role creation
const validateCreateRole = [
  body('roleId').isNumeric().withMessage('Role ID must be a number'),
  body('roleName').notEmpty().withMessage('Role Name is required'),
];

// Middleware for handling validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Create a new role
const createRole = async (req, res) => {
  try {
    // Extract role data from the request body
    const roleData = {
      roleId: req.body.roleId,
      roleName: req.body.roleName,
    };

    const newRole = new Role(roleData);
    await newRole.save();

    res.status(201).json({ success: 'Role created successfully', roleId: newRole.roleId });
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).json({ error: 'Role ID already exists.' });
    }
    console.error('Error creating a role:', error);
    res.status(500).json({ error: 'An error occurred while creating the role.' });
  }
};

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error fetching all roles:', error);
    res.status(500).json({ error: 'An error occurred while fetching all roles.' });
  }
};

// Get a single role by ID
const getSingleRole = async (req, res) => {
  try {
    const roleId = req.params.roleId;
    const role = await Role.findOne({ roleId });

    if (!role) {
      return res.status(404).json({ error: 'Role not found.' });
    }

    res.status(200).json(role);
  } catch (error) {
    console.error('Error fetching a single role by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching the role.' });
  }
};

// Update an existing role by ID
const updateRole = async (req, res) => {
  try {
    const roleId = req.params.roleId;
    const { roleName } = req.body;

    const role = await Role.findOne({ roleId });

    if (!role) {
      return res.status(404).json({ error: 'Role not found.' });
    }

    // Update role data
    role.roleName = roleName;
    await role.save();

    res.status(200).json({ success: 'Role updated successfully', roleId });
  } catch (error) {
    console.error('Error updating a role by ID:', error);
    res.status(500).json({ error: 'An error occurred while updating the role.' });
  }
};


// Delete a role by ID
const deleteRole = async (req, res) => {
  try {
    const roleId = req.params.roleId;

    const result = await Role.deleteOne({ roleId });

    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      return res.status(404).json({ error: 'Role not found.' });
    }
  } catch (error) {
    console.error('Error deleting a role by ID:', error);
    res.status(500).json({ error: 'An error occurred while deleting the role.' });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getSingleRole,
  updateRole,
  deleteRole,
  validateCreateRole, // Export the validation middleware
  handleValidationErrors, // Export the error handling middleware
};
