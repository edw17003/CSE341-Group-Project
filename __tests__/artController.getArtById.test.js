// __tests__/artController.getArtById.test.js

const request = require('supertest');
const app = require('../index');
const Art = require('../models/Art');

jest.mock('../models/Art', () => ({
  findById: jest.fn(),
}));

describe('Art Controller - getArtById', () => {
  // Reset the mock implementation before each test
  beforeEach(() => {
    Art.findById.mockReset();
  });

  it('should get a single art by ID successfully', async () => {
    // Mock the findById method to return the expected art when called
    const mockArt = {
      _id: '1',
      artId: '655efff9f9c0c8ebaa184b4a',
      userId: '2',
      title: 'Impressionism',
      description: 'A creative approach while maintaining good quality.',
      publicationDate: '2023-11-21',
      genre: 'Landscaping',
      image: 'someimage.jpeg',
    };
    Art.findById.mockResolvedValue(mockArt);

    const response = await request(app)
      .get('/arts/655efff9f9c0c8ebaa184b4a')  // Update the path to match your actual route
      .set('apiKey', 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockArt);
  });

  it('should handle a non-existent art ID', async () => {
    // Mock the findById method to return null, simulating a non-existent art
    Art.findById.mockResolvedValue(null);

    const response = await request(app)
      .get('/arts/nonexistentId')  // Update the path to a non-existent ID
      .set('apiKey', 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N');

    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('Art not found');
  });

});
