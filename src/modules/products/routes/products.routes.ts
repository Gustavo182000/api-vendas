import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuth from '@modules/users/middlewares/isAuth';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', isAuth, productsController.index);

productsRouter.get(
  '/:id',
  isAuth,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  productsController.show,
);

productsRouter.post(
  '/',
  isAuth,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().precision(3).required(),
    }),
  }),
  productsController.create,
);

productsRouter.put(
  '/:id',
  isAuth,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().precision(3).required(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  productsController.update,
);
productsRouter.delete(
  '/:id',
  isAuth,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  productsController.delete,
);

export default productsRouter;
