import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuth from '../../../shared/http/middlewares/isAuth';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuth);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().optional(),
      passwordConfirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
      old_password: Joi.string().required(),
    }),
  }),
  profileController.update,
);

export default profileRouter;
