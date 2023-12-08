const request = require('supertest');
const app = require('../index');
const Book = require('../models/Books');

// Mock the Art model
jest.mock('../models/Books', () => ({
  findOneAndUpdate: jest.fn(),  // Mock the findOneAndUpdate method
}));

describe('Book Controller - updateBook', () => {
  // Mock data for testing
  const mockBook = {
    _id: "6561a98cfbebfb9f1e838c50",
    title: "Picasso and ceramics",
    author: "Pablo Picasso",
    genre: "ceramic",
    publicationDate: "1982",
    description: "Pablo picasso art in ceramic",
    associatedArtwork: "edit test"
  };

  // Reset the mock implementation before each test
  beforeEach(() => {
    jest.clearAllMocks();  // Clear all mock implementations, including findOneAndUpdate
  });

  it('should update a book by bookId successfully', async () => {
    // Mock the findOneAndUpdate method to return the updated mockArt when called
    Book.findOneAndUpdate.mockResolvedValue(mockBook);

    const bookId = '6561a98cfbebfb9f1e838c50';
    const response = await request(app)
      .put(`/books/${bookId}`)
      .set('apiKey', 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N')
      .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnb29nbGVJZCI6IjEwODY5NzAxNzY5MTI1NTMwNzQxMyIsInJvbGVJZCI6MywiaWF0IjoxNzAyMDExNzk0LCJleHAiOjE3MDMzMDc3OTR9.QWuZnV0Om2bznGxlzVROFNjfSaxvgf5VUIg6sWKhcUE')
      .send({
        _id: "6561a98cfbebfb9f1e838c50",
        title: "Picasso and ceramics",
        author: "Picasso",
        genre: "ceramic",
        publicationDate: "1982",
        description: "Pablo picasso art in ceramic",
        associatedArtwork: "edit test 2"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockBook);
  });
});
