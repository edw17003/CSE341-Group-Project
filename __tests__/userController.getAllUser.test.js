const request = require('supertest');
const app = require('../index');
const User = require('../models/User'); // Assuming you have a User model

jest.mock('../models/User', () => ({
  find: jest.fn(),
}));

describe('User Controller', () => {
  // Mock data for testing
  const mockUsers = [
    {
      _id: '1',
      googleId: '1',
      displayName: 'displayName',
      firstName: 'firstName',
      lastName: 'lastName',
      image: 'image',
      roleId: 1,
      biography: 'biography',
    },
  ];

  // Reset the mock implementation before each test
  beforeEach(() => {
    User.find.mockReset();
  });

  it('should get all users successfully', async () => {
    // Mock the find method to return the mockUsers when called
    User.find.mockResolvedValue(mockUsers);

    const response = await request(app)
      .get('/users') // Updated the path to match your actual route
      .set('apiKey', 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });
  
});
