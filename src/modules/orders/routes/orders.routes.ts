import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuth from '@shared/http/middlewares/isAuth';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Obter detalhes de um pedido
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do pedido
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Não autorizado
 *       '404':
 *         description: Pedido não encontrado
 */

ordersRouter.get(
  '/:id',
  isAuth,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  ordersController.show,
);
/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Criar um novo pedido
 *     tags:
 *       - Pedidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID do cliente
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       description: ID do produto
 *                     quantity:
 *                       type: number
 *                       description: Quantidade do produto
 *                 description: Lista de produtos do pedido
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Não autorizado
 *       '404':
 *         description: Cliente ou produto não encontrado
 */

ordersRouter.post(
  '/',
  isAuth,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    }),
  }),
  ordersController.create,
);

export default ordersRouter;
