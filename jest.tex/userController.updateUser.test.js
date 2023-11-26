const request = require('supertest');
const app = require('../index');
const User = require('../models/User'); 

// Mock the User model
jest.mock('../models/User', () => ({
  findOneAndUpdate: jest.fn(),  // Mock the findOneAndUpdate method
}));

describe('User Controller - updateUser', () => {
  // Mock data for testing
  const mockUser = {
    _id: '1',
    googleId: '1',
    displayName: 'displayName1',
    firstName: 'firstName',
    lastName: 'lastName',
    image: 'image',
    roleId: 1,
    biography: 'biography',
  };

  // Reset the mock implementation before each test
  beforeEach(() => {
    jest.clearAllMocks();  // Clear all mock implementations, including findOneAndUpdate
  });

  it('should update a user by userId successfully', async () => {
    // Mock the findOneAndUpdate method to return the updated mockUser when called
    User.findOneAndUpdate.mockResolvedValue(mockUser);

    const userId = '1';
    const response = await request(app)
      .put(`/users/${userId}`)
      .set('apiKey', 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N')
      .send({
        displayName: 'displayName1',
        firstName: 'firstName',
        lastName: 'lastName',
        image: 'image',
        roleId: 1,
        biography: 'biography',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockUser);
  });
});
