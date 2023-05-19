import { Router } from 'express';

const routes = Router();

routes.get('/', async (req, res) => {
  const name = 'teste';
  const products = name;
  return res.status(200).json({ products: products });
});

export default routes;
