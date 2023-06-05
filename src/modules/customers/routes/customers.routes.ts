import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuth from '@shared/http/middlewares/isAuth';
import CustomersController from '../controller/CustomersController';

const customersRouter = Router();
const customerController = new CustomersController();

customersRouter.use(isAuth);

customersRouter.get('/', customerController.index);

customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  customerController.show,
);

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
    }),
  }),
  customerController.create,
);

customersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  customerController.update,
);

customersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  customerController.delete,
);

export default customersRouter;
