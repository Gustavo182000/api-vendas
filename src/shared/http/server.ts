import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';

const port = process.env.PORT || 3333;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

//Middleware para tratamento de erros
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  //Se o erro for uma instancia da classe para tratamento de erros
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }
  //Se não for será um erro desconhecido
  return res
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Executando na porta ${port}`);
});
