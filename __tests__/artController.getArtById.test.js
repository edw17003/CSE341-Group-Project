const request = require('supertest');
const app = require('../index');
const Art = require('../models/Art');

// Mock the Art model
jest.mock('../models/Art', () => ({
  findOne: jest.fn(),
}));

describe('Art Controller - getArtById', () => {
  // Mock data for testing
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

  // Reset the mock implementation before each test
  beforeEach(() => {
    jest.clearAllMocks();  // Clear all mock implementations, including findOne
  });

  it('should get a single art by ID successfully', async () => {
    // Mock the findOne method to return the mockArt when called
    Art.findOne.mockResolvedValue(mockArt);

    const artId = '655efff9f9c0c8ebaa184b4a';
    const response = await request(app)
      .get(`/arts/${artId}`)
      .set('apiKey', 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockArt);
  });
});
