import { DataSource } from 'typeorm';
import { CreateProducts1684418106793 } from './migrations/1684418106793-CreateProducts';
import { CreateUsers1684781088788 } from './migrations/1684781088788-CreateUsers';
import Product from './entities/Product';
import User from './entities/User';
import { CreateUserTokens1685458077237 } from './migrations/1685458077237-CreateUserTokens';
import UserToken from './entities/UserToken';
import { CreateCustomers1685914117464 } from './migrations/1685914117464-CreateCustomers';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'apivendas',
  entities: [Product, User, UserToken],
  migrations: [
    CreateProducts1684418106793,
    CreateUsers1684781088788,
    CreateUserTokens1685458077237,
    CreateCustomers1685914117464,
  ],
});
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
export default AppDataSource;
