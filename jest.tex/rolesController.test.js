const request = require('supertest');
const app = require('../index');
const Role = require('../models/Role');

const mockRole = {
  roleId: 1,
  roleName: 'Admin',
};

const apiKey = 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

// Clear roles collection before each test
beforeEach(async () => {
  await Role.deleteMany({});
});

describe('Roles Controller', () => {
  describe('createRole', () => {
    it('should create a new role successfully', async () => {
      const response = await request(app)
        .post('/roles')
        .set('apiKey', apiKey)
        .send(mockRole);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        success: 'Role created successfully',
        roleId: mockRole.roleId,
      });

      // Additional checks if needed
      const roles = await Role.find();
      expect(roles.length).toBe(1);
      expect(roles[0].roleId).toBe(mockRole.roleId);
    });

    it('should handle validation errors', async () => {
      const response = await request(app)
        .post('/roles')
        .set('apiKey', apiKey)
        .send({}); // Invalid data

      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toBeTruthy();
    });
  });

  describe('getAllRoles', () => {
    it('should get all roles successfully', async () => {
      // Add a role to the database for testing
      await Role.create(mockRole);

      const response = await request(app)
        .get('/roles')
        .set('apiKey', apiKey);

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].roleId).toBe(mockRole.roleId);
    });
  });

  describe('getSingleRole', () => {
    it('should get a single role by ID successfully', async () => {
      // Add a role to the database for testing
      const createdRole = await Role.create(mockRole);

      const response = await request(app)
        .get(`/roles/${createdRole.roleId}`)
        .set('apiKey', apiKey);

      expect(response.statusCode).toBe(200);
      expect(response.body.roleId).toBe(mockRole.roleId);
    });

    it('should handle role not found', async () => {
      const response = await request(app)
        .get('/roles/999')
        .set('apiKey', apiKey);

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Role not found.');
    });
  });

  describe('updateRole', () => {
    it('should update an existing role by ID successfully', async () => {
      // Add a role to the database for testing
      const createdRole = await Role.create(mockRole);
      const updatedRoleName = 'UpdatedAdmin';
      console.log(createdRole);

      const response = await request(app)
        .put(`/roles/${createdRole.roleId}`)
        .set('apiKey', apiKey)
        .send({ roleId: createdRole.roleId, roleName: updatedRoleName });

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe('Role updated successfully');

      // Verify the role is updated in the database
      const updatedRole = await Role.findById(createdRole._id);
      expect(updatedRole.roleName).toBe(updatedRoleName);
    });

    it('should handle role not found during update', async () => {
      const response = await request(app)
        .put('/roles/999')
        .set('apiKey', apiKey)
        .send({ roleName: 'UpdatedRole' });

      expect(response.statusCode).toBe(400);
    });
  });

  describe('deleteRole', () => {
    it('should delete a role by ID successfully', async () => {
      // Add a role to the database for testing
      const createdRole = await Role.create(mockRole);

      const response = await request(app)
        .delete(`/roles/${createdRole.roleId}`)
        .set('apiKey', apiKey);

      expect(response.statusCode).toBe(204);

      // Verify the role is deleted in the database
      const deletedRole = await Role.findById(createdRole._id);
      expect(deletedRole).toBeNull();
    });

    it('should handle role not found during deletion', async () => {
      const response = await request(app)
        .delete('/roles/999')
        .set('apiKey', apiKey);

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Role not found.');
    });
  });
});
