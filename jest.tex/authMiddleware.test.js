// const request = require('supertest');
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const checkRoleAuth = require('../middleware/jwtAuth');
// const Role = require('../models/Role');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// // Mock route using the checkRoleAuth middleware
// app.post('/users/', checkRoleAuth([3]), (req, res) => {
//   res.json({ success: true });
// });

// const createJwtToken = (roleId) => {
//   return jwt.sign(
//     {
//       googleId: 'asdf1234',
//       roleId: roleId
//     },
//     process.env.JWT_SECRET
//   );
// };

// const createMockRole = async (role) => {
//   const {roleId, roleName} = role
//   return await Role.create({ roleId: roleId, roleName: roleName });
// };

// describe('checkRoleAuth Middleware', () => {
//   it('should allow access for a user with the correct role', async () => {
//     const mockRole = await createMockRole({ roleId: 3, roleName: 'RoleName' });
//     const token = createJwtToken(mockRole.roleId);
//     console.log(token);

//     const response = await request(app)
//       .post('/users/')
//       .set('authorization', `Bearer ${token}`);

//     expect(response.statusCode).toBe(200);
//     expect(response.body.success).toBe(true);
//   }, 15000);

//   it('should deny access for a user with an incorrect role', async () => {
//     const token = createJwtToken(2);

//     const response = await request(app)
//       .post('/users/')
//       .set('authorization', `Bearer ${token}`);

//     expect(response.statusCode).toBe(403);
//     expect(response.body.error).toBe('Forbidden: Insufficient permissions');
//   }, 15000);

//   it('should deny access for a request without a token', async () => {
//     const response = await request(app)
//       .post('/users/')
//       .send({});

//     expect(response.statusCode).toBe(403);
//     expect(response.body.error).toBe('Unauthorized: No token provided');
//   }, 15000);

//   it('should deny access for a request with an invalid token', async () => {
//     const response = await request(app)
//       .post('/users/')
//       .set('authorization', 'Bearer invalid-token');

//     expect(response.statusCode).toBe(401);
//     expect(response.body.error).toBe('Unauthorized: Invalid token');
//   }, 15000);
// });
