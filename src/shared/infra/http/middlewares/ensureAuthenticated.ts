import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError(401, 'O JWT não está presente.');
  }

  const [, token] = authHeader.split(' ');

  try {
    verify(token, authConfig.jwt.secret);

    return next();
  } catch (err) {
    throw new AppError(401, 'JWT inválido.');
  }
}

export default ensureAuthenticated;
