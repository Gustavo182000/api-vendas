import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuth from '@shared/http/middlewares/isAuth';
import CustomersController from '../controller/CustomersController';

const customersRouter = Router();
const customerController = new CustomersController();

customersRouter.use(isAuth);
/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Rotas de gerenciamento de clientes
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Retorna todos os clientes
 *     description: Endpoint para obter a lista de todos os clientes.
 *     security:
 *       - bearerAuth: []
 *     tags: [Customers]
 *     responses:
 *       '200':
 *         description: Lista de clientes retornada com sucesso
 *       '401':
 *         description: Não autorizado, token de acesso inválido ou ausente
 *       '500':
 *         description: Erro interno do servidor
 */
customersRouter.get('/', customerController.index);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Retorna um cliente pelo ID
 *     description: Endpoint para obter um cliente pelo seu ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID do cliente
 *     responses:
 *       '200':
 *         description: Cliente retornado com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Não autorizado, token de acesso inválido ou ausente
 *       '404':
 *         description: Cliente não encontrado
 *       '500':
 *         description: Erro interno do servidor
 */
customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  customerController.show,
);

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Cria um novo cliente
 *     description: Endpoint para criar um novo cliente.
 *     security:
 *       - bearerAuth: []
 *     tags: [Customers]
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
 *           example:
 *             name: John Doe
 *             email: johndoe@example.com
 *     responses:
 *       '201':
 *         description: Cliente criado com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Não autorizado, token de acesso inválido ou ausente
 *       '500':
 *         description: Erro interno do servidor
 */
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

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Atualiza um cliente existente
 *     description: Endpoint para atualizar um cliente existente pelo seu ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID do cliente
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
 *           example:
 *             name: John Doe
 *             email: johndoe@example.com
 *     responses:
 *       '200':
 *         description: Cliente atualizado com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Não autorizado, token de acesso inválido ou ausente
 *       '404':
 *         description: Cliente não encontrado
 *       '500':
 *         description: Erro interno do servidor
 */

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

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Remove um cliente existente
 *     description: Endpoint para remover um cliente existente pelo seu ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID do cliente
 *     responses:
 *       '204':
 *         description: Cliente removido com sucesso
 *       '401':
 *         description: Não autorizado, token de acesso inválido ou ausente
 *       '404':
 *         description: Cliente não encontrado
 *       '500':
 *         description: Erro interno do servidor
 */
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
