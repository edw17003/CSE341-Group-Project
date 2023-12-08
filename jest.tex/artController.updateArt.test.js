const request = require('supertest');
const app = require('../index');
const Art = require('../models/Art');

// Mock the Art model
jest.mock('../models/Art', () => ({
  findOneAndUpdate: jest.fn(),  // Mock the findOneAndUpdate method
}));

describe('Art Controller - updateArt', () => {
  // Mock data for testing
  const mockArt = {
    _id: '1',
    artId: '655f61c62085f5ed93b0085e',
    userId: '1',
    title: 'Cubism',
    description: 'Exhibits high-quality abstraction, adhering to compositional principles',
    publicationDate: '2023-11-22',
    genre: 'Potriat',
    image: 'someimage.jpeg',
  };

  // Reset the mock implementation before each test
  beforeEach(() => {
    jest.clearAllMocks();  // Clear all mock implementations, including findOneAndUpdate
  });

  it('should update an artwork by artId successfully', async () => {
    // Mock the findOneAndUpdate method to return the updated mockArt when called
    Art.findOneAndUpdate.mockResolvedValue(mockArt);

    const artId = '655f61c62085f5ed93b0085e';
    const response = await request(app)
      .put(`/arts/${artId}`)
      .set('apiKey', 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N')
      .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnb29nbGVJZCI6IjEwODY5NzAxNzY5MTI1NTMwNzQxMyIsInJvbGVJZCI6MywiaWF0IjoxNzAyMDExNzk0LCJleHAiOjE3MDMzMDc3OTR9.QWuZnV0Om2bznGxlzVROFNjfSaxvgf5VUIg6sWKhcUE')
      .send({
        userId: '1',
        title: 'Cubism',
        description: 'Exhibits high-quality abstraction, adhering to compositional principles',
        publicationDate: '2023-11-22',
        genre: 'Potriat',
        image: 'someimage.jpeg',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockArt);
  });
});
