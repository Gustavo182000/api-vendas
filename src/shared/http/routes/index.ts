import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'Primeira rota' });
});

export default routes;
