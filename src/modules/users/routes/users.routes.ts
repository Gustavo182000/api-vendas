import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuth from '../../../shared/http/middlewares/isAuth';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/UserAvatarController';
import multer from 'multer';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);
usersRouter.get('/', isAuth, usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  isAuth,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
