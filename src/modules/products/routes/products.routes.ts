import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuth from '@shared/http/middlewares/isAuth';

const productsRouter = Router();
const productsController = new ProductsController();

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: Rotas referente aos dados dos produtos
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retorna todos os produtos
 *     description: Endpoint para obter a lista de todos os produtos.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de produtos retornada com sucesso
 *       '401':
 *         description: Não autorizado, token de acesso inválido ou ausente
 *       '500':
 *         description: Erro interno do servidor
 */
productsRouter.get('/', isAuth, productsController.index);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     description: Endpoint para obter um produto específico pelo seu ID.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID do produto
 *     responses:
 *       '200':
 *         description: Produto retornado com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Não autorizado, token de acesso inválido ou ausente
 *       '500':
 *         description: Erro interno do servidor
 */
productsRouter.get(
  '/:id',
  isAuth,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  productsController.show,
);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     description: Endpoint para criar um novo produto.
 *     tags: [Products]
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
 *               price:
 *                 type: number
 *                 format: float
 *               quantity:
 *                 type: number
 *                 format: float
 *     responses:
 *       '201':
 *         description: Produto criado com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Não autorizado, token de acesso inválido ou ausente
 *       '500':
 *         description: Erro interno do servidor
 */
productsRouter.post(
  '/',
  isAuth,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().precision(3).required(),
    }),
  }),
  productsController.create,
);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     description: Endpoint para atualizar um produto existente pelo seu ID.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               quantity:
 *                 type: number
 *                 format: float
 *     responses:
 *       '200':
 *         description: Produto atualizado com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Não autorizado, token de acesso inválido ou ausente
 *       '500':
 *         description: Erro interno do servidor
 */
productsRouter.put(
  '/:id',
  isAuth,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().precision(3).required(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  productsController.update,
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Exclui um produto existente
 *     description: Endpoint para excluir um produto existente pelo seu ID.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID do produto
 *     responses:
 *       '204':
 *         description: Produto excluído com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Não autorizado, token de acesso inválido ou ausente
 *       '500':
 *         description: Erro interno do servidor
 */
productsRouter.delete(
  '/:id',
  isAuth,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  productsController.delete,
);

export default productsRouter;
