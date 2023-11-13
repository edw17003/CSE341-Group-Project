const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const url = 'http://localhost:8080';
const schemes = ['http'];

const doc = {
    info: {
        title: 'Users API',
        description: 'Collects and displays user information',
    },
    servers: [
        {
            url,
            description: 'local server',
        },
        {
            url: 'https://cse341-groupproject.onrender.com/',
            description: 'production server',
        },
    ],
    schemes,
    tags: [
        {
            name: 'Users',
            description: 'API for managing users',
        },
        {
            name: 'Roles',
            description: 'API for managing roles',
        },
        {
            name: 'Books',
            description: 'API for managing books',
        },
        {
            name: 'Art',
            description: 'API for managing art',
        },
    ],
    definitions: {
        User: {
            type: 'object',
            properties: {
                googleId: { type: 'string' },
                displayName: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                image: { type: 'string' },
                roleId: { type: 'integer' },
                biography: { type: 'string' }
            },
        },
        Role: {
            type: 'object',
            properties: {
                roleId: { type: 'integer' },
                name: { type: 'string' }
            },
        },
        Book: {
            type: 'object',
            properties: {
                bookId: { type: 'integer' },
                userId: { type: 'integer' },
                title: { type: 'string' },
                author: { type: 'string' },
                genre: { type: 'string' },
                image: { type: 'string' },
            },
        },
        Art: {
            type: 'object',
            properties: {
                artId: { type: 'integer' },
                userId: { type: 'integer' },
                title: { type: 'string' },
                description: { type: 'string' },
                publicationDate: { type: 'string' },
                genre: { type: 'string' },
                image: { type: 'string' },
            },
        },
    },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
