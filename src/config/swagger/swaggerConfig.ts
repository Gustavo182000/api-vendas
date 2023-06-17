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
const routesProductsFolder: string = path.resolve(
  __dirname,
  '..',
  '..',
  'modules',
  'products',
  'routes',
  '*.ts',
);
const routesCustomersFolder: string = path.resolve(
  __dirname,
  '..',
  '..',
  'modules',
  'customers',
  'routes',
  '*.ts',
);
const orderCustomersFolder: string = path.resolve(
  __dirname,
  '..',
  '..',
  'modules',
  'orders',
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
  apis: [
    routesUsersFolder,
    routesProductsFolder,
    routesCustomersFolder,
    orderCustomersFolder,
  ],
};
const specs = swaggerJSDoc(options);

export default specs;
