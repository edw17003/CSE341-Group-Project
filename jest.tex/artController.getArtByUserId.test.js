const request = require('supertest');
const app = require('../index');
const Art = require('../models/Art');

jest.mock('../models/Art', () => ({
  find: jest.fn(),  // Mock the find method
}));

describe('Art Controller - getArtByUserId', () => {
  // Mock data for testing
  const mockArtList = [
    {
      _id: '1',
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
    Art.find.mockReset();
  });

  it('should get artworks by userId successfully', async () => {
    // Mock the find method to return the mockArtList when called
    Art.find.mockResolvedValue(mockArtList);

    const userId = '2';  
    const response = await request(app)
      .get(`/arts/user/${userId}`)  
      .set('apiKey', 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N')
      .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnb29nbGVJZCI6IjEwODY5NzAxNzY5MTI1NTMwNzQxMyIsInJvbGVJZCI6MSwiaWF0IjoxNzAxNTQ4MDQ0LCJleHAiOjE3MDMyNzYwNDR9.BZ4B4N__APhWVjjXlifjUus7uyvqCTy1xR4hDPThK-0');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockArtList);
  });
});
