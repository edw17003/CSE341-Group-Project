const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
require('./models/Role');

const url = 'http://localhost:8080';
const schemes = ['http'];

const doc = {
  info: {
    title: 'Group Project API',
    description: 'API for managing users, roles, books, and art in a group project'
  },
  servers: [
    {
      url,
      description: 'local server'
    },
    {
      url: 'https://cse341-groupproject.onrender.com/',
      description: 'production server'
    }
  ],
  schemes,
  tags: [
    {
      name: 'Users',
      description: 'API for managing users'
    },
    {
      name: 'Roles',
      description: 'API for managing roles'
    },
    {
      name: 'Books',
      description: 'API for managing books'
    },
    {
      name: 'Art',
      description: 'API for managing art'
    }
  ],
  definitions: {
    users: {
      type: 'object',
      properties: {
        googleId: 'string',
        displayName: 'string',
        firstName: 'string',
        lastName: 'string',
        image: 'string',
        roleId: 'integer',
        biography: 'string'
      }
    },
    roles: {
      type: 'object',
      properties: {
        roleId: 'integer',
        name: 'string'
      }
    },
    books: {
      type: 'object',
      properties: {
        bookId: 'integer',
        userId: 'integer',
        title: 'string',
        author: 'string',
        genre: 'string',
        image: 'string'
      }
    },
    art: {
      type: 'object',
      properties: {
        artId: 'integer',
        userId: 'integer',
        title: 'string',
        description: 'string',
        publicationDate: 'string',
        genre: 'string',
        image: 'string'
      }
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
console.log('Swagger runs successfully');
