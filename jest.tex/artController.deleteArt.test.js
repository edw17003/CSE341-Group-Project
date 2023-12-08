const request = require('supertest');
const app = require('../index');
const Art = require('../models/Art');

jest.mock('../models/Art', () => ({
  findOneAndDelete: jest.fn() // Mock the findOneAndDelete method
}));

describe('Art Controller - deleteArt', () => {
  // Mock data for testing
  const mockArt = {
    _id: '1',
    artId: '655f61fbcf0026c037230355',
    userId: '2',
    title: 'Impressionism',
    description: 'A creative approach while maintaining good quality.',
    publicationDate: '2023-11-21',
    genre: 'Landscaping',
    image: 'someimage.jpeg'
  };

  // Reset the mock implementation before each test
  beforeEach(() => {
    Art.findOneAndDelete.mockReset();
  });

  it('should delete an artwork by ID successfully', async () => {
    // Mock the findOneAndDelete method to return the mockArt when called
    Art.findOneAndDelete.mockResolvedValue(mockArt);

    const artId = '655f61fbcf0026c037230355'; // Replace with an existing artId
    const response = await request(app)
      .delete(`/arts/${artId}`)
      .set(
        'apiKey',
        'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
      )
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnb29nbGVJZCI6IjEwODY5NzAxNzY5MTI1NTMwNzQxMyIsInJvbGVJZCI6MywiaWF0IjoxNzAyMDExNzk0LCJleHAiOjE3MDMzMDc3OTR9.QWuZnV0Om2bznGxlzVROFNjfSaxvgf5VUIg6sWKhcUE'
      );

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Artwork deleted successfully' });
  });
});
