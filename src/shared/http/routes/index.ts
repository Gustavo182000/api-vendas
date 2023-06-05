import productsRouter from '@modules/products/routes/products.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import passwordRouter from '@modules/users/routes/passwords.routes';
import profileRouter from '@modules/users/routes/profile.routes';

import { Router } from 'express';
import customersRouter from '@modules/customers/routes/customers.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customer', customersRouter);

export default routes;
