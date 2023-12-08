const request = require('supertest');
const app = require('../index');
const Book = require('../models/Books');

// Mock the User model
jest.mock('../models/Books', () => ({
  findOne: jest.fn()
}));

describe('Book Controller - getBookById', () => {
  // Mock data for testing
  const mockBook = {
    _id: '1',
    title: 'title',
    author: 'author',
    genre: 'genre',
    publicationDate: 'publicationDate',
    description: 'description',
    associatedArtwork: 'associatedArtwork'
  };

  // Reset the mock implementation before each test
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mock implementations, including findOne
  });

  it('should get a single book by Author successfully', async () => {
    // Mock the findOne method to return the mockUser when called
    Book.findOne.mockResolvedValue(mockBook);

    const authorId = 'author';
    const response = await request(app)
      .get(`/books/bookAuthor/${authorId}`)
      .set(
        'apiKey',
        'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
      )
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnb29nbGVJZCI6IjEwODY5NzAxNzY5MTI1NTMwNzQxMyIsInJvbGVJZCI6MSwiaWF0IjoxNzAxNTQ4MDQ0LCJleHAiOjE3MDMyNzYwNDR9.BZ4B4N__APhWVjjXlifjUus7uyvqCTy1xR4hDPThK-0'
      );

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockBook);
  });
});
