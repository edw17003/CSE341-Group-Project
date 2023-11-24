// Import necessary modules
const request = require('supertest');
const app = require('../index');
const Art = require('../models/Art');

// Mock data for testing
const mockArt = {
  userId: '2',
  title: 'Impressionism',
  description: 'A creative approach while maintaining good quality.',
  publicationDate: '2023-11-21',
  genre: 'Landscaping',
  image: 'someimage.jpeg',
};

// Test suite for the 'createArt' endpoint
describe('Art Controller - createArt', () => {
  beforeEach(async () => {
    // Clear the collection before each test
    await Art.deleteMany({});
    Art.create.mockClear();
  });

  // Mock the Art model's 'create' function
  Art.create = jest.fn().mockResolvedValue(mockArt);

  // Test case: should create a new artwork successfully
  it('should create a new artwork successfully', async () => {
    // Make a POST request to create a new artwork
    const response = await request(app)
      .post('/arts')
      .set('apiKey', 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N')
      .send({
        userId: '2',
        title: 'Impressionism',
        description: 'A creative approach while maintaining good quality.',
        publicationDate: '2023-11-21',
        genre: 'Landscaping',
        image: 'someimage.jpeg',
      });

    // Verify the response status code is 201 (Created)
    expect(response.statusCode).toBe(201);

    // Verify the response body matches the mockArt data
    expect(response.body).toMatchObject({
      userId: mockArt.userId,
      title: mockArt.title,
      description: mockArt.description,
      publicationDate: mockArt.publicationDate,
      genre: mockArt.genre,
      image: mockArt.image,
    });

    // Additional checks if needed
    expect(response.body._id).toBeDefined(); 
    // Add other property checks as needed
  }, 10000); // Increase the test timeout to 10 seconds
});
