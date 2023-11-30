const request = require('supertest');
const app = require('../index');
const Art = require('../models/Art');

jest.mock('../models/Art', () => ({
  find: jest.fn(),
}));

describe('Art Controller', () => {
  // Mock data for testing
  const mockArts = [
    {
      _id: '1',
      artId: '655efff9f9c0c8ebaa184b4a',
      userId: '2',
      title: 'Impressionism',
      description: 'A creative approach while maintaining good quality.',
      publicationDate: '2023-11-21',
      genre: 'Landscaping', 
      image: 'someimage.jpeg',
    },
  ];

  // Reset the mock implementation before each test
  beforeEach(() => {
    jest.clearAllMocks();  // Clear all mock implementations, including findOne
  });

  it('should get all artworks successfully', async () => {
    // Mock the find method to return the mockArts when called
    Art.find.mockResolvedValue(mockArts);

    const response = await request(app)
      .get('/arts') 
      .set('apiKey', 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N');
      //.set('UserRole', '1'); 

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockArts);
  });
});
