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

/**
 * @swagger
 * tags:
 *  name: User
 *  description: Rotas referente aos dados do usuário
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [User]
 *     description: Retorna todos os usuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *        '200':
 *          description: OK
 *        '500':
 *          description: Erro interno do servidor
 */

usersRouter.get('/', isAuth, usersController.index);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [User]
 *     description: Endpoint para criar um novo usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '500':
 *         description: Erro interno do servidor
 */
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

/**
 * @swagger
 * /users/avatar:
 *   patch:
 *     summary: Atualiza o avatar do usuário
 *     tags: [User]
 *     description: Endpoint para atualizar o avatar do usuário.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Avatar do usuário atualizado com sucesso
 *       '401':
 *         description: Não autorizado, token de acesso inválido ou ausente
 *       '500':
 *         description: Erro interno do servidor
 */
usersRouter.patch(
  '/avatar',
  isAuth,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
