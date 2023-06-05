import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordEmailController from '../controllers/ForgotPasswordEmailController';
import ResetPasswordEmailController from '../controllers/ResetPasswordEmailController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordEmailController();
const resetPasswordEmailController = new ResetPasswordEmailController();

/**
 * @swagger
 * /password/forgot:
 *   post:
 *     summary: Solicita redefinição de senha
 *     description: Endpoint para solicitar a redefinição de senha. Será enviado um email com um token para redefinição.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       '200':
 *         description: Email de recuperação de senha enviado com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '500':
 *         description: Erro interno do servidor
 */
passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  forgotPasswordController.create,
);

/**
 * @swagger
 * /password/reset:
 *   post:
 *     summary: Redefine a senha do usuário
 *     description: Endpoint para redefinir a senha do usuário utilizando um token recebido por email.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 format: uuid
 *               password:
 *                 type: string
 *               password_confirmation:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Senha redefinida com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '500':
 *         description: Erro interno do servidor
 */
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
