// Import necessary modules
const request = require('supertest');
const app = require('../index');
const Book = require('../models/Books');

// Mock data for testing
const mockBook = {
  title: "Guernica",
  author: "Pablo Picasso",
  genre: "History Painting",
  publicationDate: "1937",
  description: "The most moving and powerful anti-war painting in history",
  associatedArtwork: "Dove of Peace"
};

// Test suite for the 'createArt' endpoint
describe('Book Controller - createBook', () => {
  beforeEach(async () => {
    // Clear the collection before each test
    await Book.deleteMany({});
    Book.create.mockClear();
  });

  // Mock the Book model's 'create' function
  Book.create = jest.fn().mockResolvedValue(mockBook);

  // Test case: should create a new artwork successfully
  it('should create a new book successfully', async () => {
    // Make a POST request to create a new artwork
    const response = await request(app)
      .post('/books')
      .set('apiKey', 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N')
      .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnb29nbGVJZCI6IjEwODY5NzAxNzY5MTI1NTMwNzQxMyIsInJvbGVJZCI6MywiaWF0IjoxNzAyMDExNzk0LCJleHAiOjE3MDMzMDc3OTR9.QWuZnV0Om2bznGxlzVROFNjfSaxvgf5VUIg6sWKhcUE')
      .send({
        title: "Guernica",
        author: "Pablo Picasso",
        genre: "History Painting",
        publicationDate: "1937",
        description: "The most moving and powerful anti-war painting in history",
        associatedArtwork: "Dove of Peace"
      });

    // Verify the response status code is 200 (Created)
    expect(response.statusCode).toBe(200);

    // Verify the response body matches the mockArt data
    expect(response.body).toMatchObject({
      title: mockBook.title,
      author: mockBook.author,
      genre: mockBook.genre,
      publicationDate: mockBook.publicationDate,
      description: mockBook.description,
      associatedArtwork: mockBook.associatedArtwork,
    });

    // Additional checks if needed
    expect(response.body._id).toBeDefined(); 
    // Add other property checks as needed
  }, 10000); // Increase the test timeout to 10 seconds
});