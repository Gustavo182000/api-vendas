import { DataSource } from 'typeorm';
import { CreateProducts1684418106793 } from './migrations/1684418106793-CreateProducts';
import { CreateUsers1684781088788 } from './migrations/1684781088788-CreateUsers';
import Product from './entities/Product';
import User from './entities/User';
import { CreateUserTokens1685458077237 } from './migrations/1685458077237-CreateUserTokens';
import UserToken from './entities/UserToken';
import { CreateCustomers1685914117464 } from './migrations/1685914117464-CreateCustomers';
import Customers from './entities/Customer';
import { CreateOrders1686074102966 } from './migrations/1686074102966-CreateOrders';
import { AddCustomerIdToOrders1686077107739 } from './migrations/1686077107739-AddCustomerIdToOrders';
import { CreateOrdersProducts1686079748431 } from './migrations/1686079748431-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1686080196223 } from './migrations/1686080196223-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1686080734453 } from './migrations/1686080734453-AddProductIdToOrdersProducts';
import Order from './entities/Order';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'apivendas',
  entities: [Product, User, UserToken, Customers, Order],
  migrations: [
    CreateProducts1684418106793,
    CreateUsers1684781088788,
    CreateUserTokens1685458077237,
    CreateCustomers1685914117464,
    CreateOrders1686074102966,
    AddCustomerIdToOrders1686077107739,
    CreateOrdersProducts1686079748431,
    AddOrderIdToOrdersProducts1686080196223,
    AddProductIdToOrdersProducts1686080734453,
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
