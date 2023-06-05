import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuth from '../../../shared/http/middlewares/isAuth';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuth);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Retorna o perfil do usuário
 *     tags: [User]
 *     description: Endpoint para retornar o perfil do usuário autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Perfil do usuário retornado com sucesso
 *       '401':
 *         description: Não autorizado, token de acesso inválido ou ausente
 *       '500':
 *         description: Erro interno do servidor
 */
profileRouter.get('/', profileController.show);

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Atualiza o perfil do usuário
 *     tags: [User]
 *     description: Endpoint para atualizar o perfil do usuário autenticado.
 *     security:
 *       - bearerAuth: []
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
 *               passwordConfirmation:
 *                 type: string
 *               old_password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Perfil do usuário atualizado com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Não autorizado, token de acesso inválido ou ausente
 *       '500':
 *         description: Erro interno do servidor
 */
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
