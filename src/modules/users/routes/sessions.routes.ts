import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { celebrate, Joi, Segments } from 'celebrate';

const sessionsRouter = Router();
const sessionController = new SessionsController();

/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Cria uma sessão de usuário
 *     tags: [User]
 *     description: Endpoint para criar uma sessão de usuário.
 *     security:
 *       - bearerAuth: []
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
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Sessão criada com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Credenciais inválidas
 *       '500':
 *         description: Erro interno do servidor
 */
sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  sessionController.create,
);

export default sessionsRouter;
