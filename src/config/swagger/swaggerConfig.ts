import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const routesUsersFolder: string = path.resolve(
  __dirname,
  '..',
  '..',
  'modules',
  'users',
  'routes',
  '*.ts',
);
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API - VENDAS',
      version: '1.0.0',
      description: 'API vendas',
    },
    servers: [
      {
        url: 'http://localhost:3333',
      },
    ],
  },
  apis: [routesUsersFolder],
};
const specs = swaggerJSDoc(options);

export default specs;
