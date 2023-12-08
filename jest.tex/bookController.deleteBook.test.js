const request = require('supertest');
const app = require('../index');
const Book = require('../models/Books');

jest.mock('../models/Books', () => ({
  findOneAndDelete: jest.fn() // Mock the findOneAndDelete method
}));

describe('Book Controller - deleteBook', () => {
  // Mock data for testing
  const mockBook = {
    _id: '6561a98cfbebfb9f1e838c50',
    title: 'Picasso and ceramics',
    author: 'Pablo Picasso',
    genre: 'ceramic',
    publicationDate: '1982',
    description: 'Pablo picasso art in ceramic',
    associatedArtwork: 'edit test'
  };

  // Reset the mock implementation before each test
  beforeEach(() => {
    Book.findOneAndDelete.mockReset();
  });

  it('should delete a book by ID successfully', async () => {
    // Mock the findOneAndDelete method to return the mockArt when called
    Book.findOneAndDelete.mockResolvedValue(mockBook);

    const bookId = '6561a98cfbebfb9f1e838c50'; // Replace with an existing artId
    const response = await request(app)
      .delete(`/books/${bookId}`)
      .set(
        'apiKey',
        'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
      )
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnb29nbGVJZCI6IjEwODY5NzAxNzY5MTI1NTMwNzQxMyIsInJvbGVJZCI6MywiaWF0IjoxNzAyMDExNzk0LCJleHAiOjE3MDMzMDc3OTR9.QWuZnV0Om2bznGxlzVROFNjfSaxvgf5VUIg6sWKhcUE'
      );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Book deleted successfully' });
  });
});
