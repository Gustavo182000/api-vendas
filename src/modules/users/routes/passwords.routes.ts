import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordEmailController from '../controllers/ForgotPasswordEmailController';

const forgotPasswordRouter = Router();
const forgotPasswordController = new ForgotPasswordEmailController();

forgotPasswordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  forgotPasswordController.create,
);

export default forgotPasswordRouter;
