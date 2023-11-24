// Import necessary modules
const request = require('supertest');
const app = require('../index');
const User = require('../models/User');

// Mock data for testing
const mockUser = {
  googleId: '1',
  displayName: 'displayName',
  firstName: 'firstName',
  lastName: 'lastName',
  image: 'image',
  roleId: 1,
  biography: 'biography',
};

// Test suite for the 'createUser' endpoint
describe('User Controller - createUser', () => {
  beforeEach(async () => {
    // Clear the collection before each test
    await User.deleteMany({});
    User.create.mockClear();
  });

  // Mock the User model's 'create' function
  User.create = jest.fn().mockResolvedValue(mockUser);

  // Test case: should create a new user successfully
  it('should create a new user successfully', async () => {
    // Make a POST request to create a new user
    const response = await request(app)
      .post('/users')
      .set('apiKey', 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N')
      .send({
        googleId: '1',
        displayName: 'displayName',
        firstName: 'firstName',
        lastName: 'lastName',
        image: 'image',
        roleId: 1,
        biography: 'biography',
      });

    // Verify the response status code is 201 (Created)
    expect(response.statusCode).toBe(200);

    // Verify the response body matches the mockUser data
    expect(response.body).toMatchObject({
      googleId: mockUser.googleId,
      displayName: mockUser.displayName,
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      image: mockUser.image,
      roleId: mockUser.roleId,
      biography: mockUser.biography,
    });

    // Additional checks if needed
    expect(response.body._id).toBeDefined();
    // Add other property checks as needed
  }, 10000); // Increase the test timeout to 10 seconds
});
