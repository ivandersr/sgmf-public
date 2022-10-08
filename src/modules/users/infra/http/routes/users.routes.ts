import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

//usersRouter.use(ensureAuthenticated);
usersRouter.post('/', usersController.create);

export default usersRouter;
