const request = require('supertest');
const app = require('../index');
const Book = require('../models/Books');

// Mock the User model
jest.mock('../models/Books', () => ({
  findById: jest.fn(),
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
    jest.clearAllMocks();  // Clear all mock implementations, including findOne
  });

  it('should get a single book by ID successfully', async () => {
    // Mock the findOne method to return the mockUser when called
    Book.findById.mockResolvedValue(mockBook);

    const bookId = '1';
    const response = await request(app)
      .get(`/books/${bookId}`)
      .set('apiKey', 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockBook);
  });
});
