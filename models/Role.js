const mongoose = require('mongoose');

// Define the Role Schema
const RoleSchema = new mongoose.Schema({
  roleId: {
    type: Number,
    unique: true,
    required: true,
  },
  roleName: {
    type: String,
    required: true,
  },
});

// Create the Role model
const Role = mongoose.model('Role', RoleSchema, 'roles');

module.exports = Role;
