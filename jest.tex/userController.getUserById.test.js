const request = require('supertest');
const app = require('../index');
const User = require('../models/User');

// Mock the User model
jest.mock('../models/User', () => ({
  findOne: jest.fn(),
}));

describe('User Controller - getUserById', () => {
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
    jest.clearAllMocks();  // Clear all mock implementations, including findOne
  });

  it('should get a single user by ID successfully', async () => {
    // Mock the findOne method to return the mockUser when called
    User.findOne.mockResolvedValue(mockUser);

    const userId = '1';
    const response = await request(app)
      .get(`/users/${userId}`)
      .set('apiKey', 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockUser);
  });
});
