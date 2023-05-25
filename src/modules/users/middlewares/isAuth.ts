import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

function isAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError('Não existe um token enviado');
  }
  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21lIjoiRmVsaXBlMyIsImVtYWlsIjoidGVzdGUz
  const token = authHeader.split(' ');

  try {
    const decodeToken = verify(token[1], auth.jwt.secret);
    return next();
  } catch {
    throw new AppError('Token inválido');
  }
}

export default isAuth;
