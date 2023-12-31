const { body, validationResult } = require('express-validator');
const Role = require('../models/Role');

// API Key for role operations
const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

// Validation middleware for role creation
const validateCreateRole = [
  body('roleId').isNumeric().withMessage('Role ID must be a number'),
  body('roleName').notEmpty().withMessage('Role Name is required')
];

// Middleware for handling validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Create role
const createRole = async (req, res) => {
  // #swagger.tags = ['Roles']
  // #swagger.summary = 'Create a new role'
  // #swagger.description = 'Create a new role and insert it into the database'

  if (req.header('apiKey') === apiKey) {
    try {
      // Extract role data from the request body
      const roleData = {
        roleId: req.body.roleId,
        roleName: req.body.roleName
      };

      const newRole = new Role(roleData);
      await newRole.save();

      res.status(201).json({ success: 'Role created successfully', roleId: newRole.roleId });
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        // MongoDB duplicate key error (Role ID already exists)
        return res.status(400).json({ error: 'Role ID already exists.' });
      }

      console.error('Error creating a role:', error);
      // Other unexpected errors
      res.status(500).json({ error: 'An error occurred while creating the role.' });
    }
  } else {
    res.status(403).send('Invalid apiKey, access denied.');
  }
};

// Get all roles
const getAllRoles = async (req, res) => {
  // #swagger.tags = ['Roles']
  // #swagger.summary = 'Get all roles'
  // #swagger.description = 'Get all roles information from the database'

  if (req.header('apiKey') === apiKey) {
    try {
      const roles = await Role.find();
      res.status(200).json(roles);
    } catch (error) {
      console.error('Error fetching all roles:', error);
      res.status(500).json({ error: 'An error occurred while fetching all roles.' });
    }
  } else {
    res.status(403).send('Invalid apiKey, access denied.');
  }
};

// Get a single role by ID
const getSingleRole = async (req, res) => {
  // #swagger.tags = ['Roles']
  // #swagger.summary = 'Get a role by ID'
  // #swagger.description = 'Get a role information from the database by ID'

  if (req.header('apiKey') === apiKey) {
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
  } else {
    res.status(403).send('Invalid apiKey, access denied.');
  }
};

// Update an existing role by ID
const updateRole = async (req, res) => {
  // #swagger.tags = ['Roles']
  // #swagger.summary = 'Update a role by ID'
  // #swagger.description = 'Update role information by ID'

  if (req.header('apiKey') === apiKey) {
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
  } else {
    res.status(403).send('Invalid apiKey, access denied.');
  }
};

// Delete a role by ID
const deleteRole = async (req, res) => {
  // #swagger.tags = ['Roles']
  // #swagger.summary = 'Delete a role by ID'
  // #swagger.description = 'Delete role information by ID'

  if (req.header('apiKey') === apiKey) {
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
  } else {
    res.status(403).send('Invalid apiKey, access denied.');
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getSingleRole,
  updateRole,
  deleteRole,
  validateCreateRole, // Export the validation middleware
  handleValidationErrors // Export the error handling middleware
};
