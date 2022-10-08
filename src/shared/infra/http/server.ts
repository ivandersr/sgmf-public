import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
const port = process.env.PORT || 3333;

app.use(cors({
  origin: 'https://sgmf2.netlify.app'
}));
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.log(err.message);
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.get('/', (request, response) =>
  response.json({
    message: 'Funfou',
  }),
);

app.listen(port);
