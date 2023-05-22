import { DataSource } from 'typeorm';
import { CreateProducts1684418106793 } from './migrations/1684418106793-CreateProducts';
import { CreateUsers1684781088788 } from './migrations/1684781088788-CreateUsers';
import Product from './entities/Product';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'apivendas',
  entities: [Product],
  migrations: [CreateProducts1684418106793, CreateUsers1684781088788],
});
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
export default AppDataSource;
