import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import uploadConfig from '@config/upload';
import specs from '@config/swagger/swaggerConfig';
import { pagination } from 'typeorm-pagination';
import rateLimiter from './middlewares/rateLimiter';

const port = process.env.PORT || 3333;
const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(pagination);
app.use('/files', express.static(uploadConfig.directory));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(routes);
app.use(errors());

//Middleware para tratamento de erros
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  //Se o erro for uma instancia da classe para tratamento de erros
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }
  //Se não for será um erro desconhecido
  return res.status(500).json({ status: 'error', message: error.message });
});

app.listen(port, () => {
  console.log(`Executando na porta ${port}`);
});
