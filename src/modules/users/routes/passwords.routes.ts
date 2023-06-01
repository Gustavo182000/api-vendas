import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordEmailController from '../controllers/ForgotPasswordEmailController';
import ResetPasswordEmailController from '../controllers/ResetPasswordEmailController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordEmailController();
const resetPasswordEmailController = new ResetPasswordEmailController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  forgotPasswordController.create,
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().valid(Joi.ref('password')).required(),
    }),
  }),
  resetPasswordEmailController.create,
);

export default passwordRouter;
