const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
require('./models/role');

const url = 'http://localhost:8080';
const schemes = ['http'];

const doc = {
  info: {
    title: 'Group Project API',
    description: 'API for managing users, roles, books, and art in a group project',
    version: '1.0.0'
  },
  servers: [
    {
      url,
      description: 'Local Development Server'
    },
    {
      url: 'https://cse341-groupproject.onrender.com/',
      description: 'Production Server'
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
  paths: {
    '/roles': {
      get: {
        tags: ['Roles'],
        summary: 'Get all roles',
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                example: {
                  roles: [
                    {
                      roleId: 1,
                      name: 'Admin'
                    },
                    {
                      roleId: 2,
                      name: 'User'
                    }
                  ]
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Roles'],
        summary: 'Create a new role',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                roleId: 3,
                name: 'Moderator'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Role created successfully',
            content: {
              'application/json': {
                example: {
                  roleId: 3,
                  name: 'Moderator'
                }
              }
            }
          },
          400: {
            description: 'Bad request, check the request body'
          }
        }
      }
    },
    '/roles/{roleId}': {
      get: {
        tags: ['Roles'],
        summary: 'Get role by ID',
        parameters: [
          {
            name: 'roleId',
            in: 'path',
            required: true,
            description: 'ID of the role',
            schema: {
              type: 'integer'
            }
          }
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                example: {
                  roleId: 3,
                  name: 'Moderator'
                }
              }
            }
          },
          404: {
            description: 'Role not found'
          }
        }
      },
      put: {
        tags: ['Roles'],
        summary: 'Update role by ID',
        parameters: [
          {
            name: 'roleId',
            in: 'path',
            required: true,
            description: 'ID of the role',
            schema: {
              type: 'integer'
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                roleId: 3,
                name: 'Super Moderator'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Role updated successfully',
            content: {
              'application/json': {
                example: {
                  success: 'Role updated successfully',
                  roleId: 3
                }
              }
            }
          },
          400: {
            description: 'Bad request, check the request body'
          },
          404: {
            description: 'Role not found'
          }
        }
      },
      delete: {
        tags: ['Roles'],
        summary: 'Delete role by ID',
        parameters: [
          {
            name: 'roleId',
            in: 'path',
            required: true,
            description: 'ID of the role',
            schema: {
              type: 'integer'
            }
          }
        ],
        responses: {
          200: {
            description: 'Role deleted successfully'
          },
          404: {
            description: 'Role not found'
          }
        }
      }
    }
  },
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
        title: 'string',
        author: 'string',
        genre: 'string',
        publicationDate: 'string',
        description: 'string',
        associatedArtwork: 'string'
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

// const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
// require('../models/Role');

// const url = 'http://localhost:8080';
// const schemes = ['http'];

// const doc = {
//     info: {
//         title: 'Users API',
//         description: 'Collects and displays user information',
//     },
//     servers: [
//         {
//             url,
//             description: 'local server',
//         },
//         {
//             url: 'https://cse341-groupproject.onrender.com/',
//             description: 'production server',
//         },
//     ],
//     schemes,
//     tags: [
//         {
//             name: 'Users',
//             description: 'API for managing users',
//         },
//         {
//             name: 'Roles',
//             description: 'API for managing roles',
//         },
//         {
//             name: 'Books',
//             description: 'API for managing books',
//         },
//         {
//             name: 'Art',
//             description: 'API for managing art',
//         },
//     ],
//     definitions: {
//         users: {
//             type: 'object',
//             properties: {
//                 googleId: 'string',
//                 displayName: 'string',
//                 firstName: 'string',
//                 lastName: 'string',
//                 image: 'string',
//                 roleId: 'integer',
//                 biography: 'string'
//             },
//         },
//         roles: {
//             type: 'object',
//             properties: {
//                 roleId: 'integer',
//                 name: 'string'
//             },
//         },
//         books: {
//             type: 'object',
//             properties: {
//                 bookId: 'integer',
//                 userId: 'integer',
//                 title: 'string',
//                 author: 'string',
//                 genre: 'string',
//                 image: 'string',
//             },
//         },
//         art: {
//             type: 'object',
//             properties: {
//                 artId: 'integer',
//                 userId: 'integer' ,
//                 title: 'string' ,
//                 description: 'string' ,
//                 publicationDate: 'string',
//                 genre: 'string',
//                 image: 'string',
//             },
//         },
//     },
// };

// const outputFile = './swagger-output.json';
// const endpointsFiles = ['./routes/index.js'];

// swaggerAutogen(outputFile, endpointsFiles, doc);
// console.log('Swagger runs successfully');
