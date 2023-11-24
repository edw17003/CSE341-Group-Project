const request = require('supertest');
const app = require('../index');
const User = require('../models/User');

jest.mock('../models/User', () => ({
  findOneAndDelete: jest.fn(),  // Mock the findOneAndDelete method
}));

describe('User Controller - deleteUser', () => {
  // Mock data for testing
  const mockUser = {
    _id: '1',
    googleId: '1',
    displayName: 'displayName',
    firstName: 'firstName',
    lastName: 'lastName',
    image: 'image',
    roleId: 1,
    biography: 'biography',
  };

  // Reset the mock implementation before each test
  beforeEach(() => {
    User.findOneAndDelete.mockReset();
  });

  it('should delete a user by ID successfully', async () => {
    // Mock the findOneAndDelete method to return the mockUser when called
    User.findOneAndDelete.mockResolvedValue(mockUser);

    const userId = '1';  // Replace with an existing userId
    const response = await request(app)
      .delete(`/users/${userId}`)  // Updated the path to match your actual route
      .set('apiKey', 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'User deleted successfully' });
  });
});
