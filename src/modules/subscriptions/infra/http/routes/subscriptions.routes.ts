import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import SubscriptionsController from '../controllers/SubscriptionsController';

const subscriptionsRouter = Router();
const subscriptionsController = new SubscriptionsController();

subscriptionsRouter.use(ensureAuthenticated);
subscriptionsRouter.get('/:id', subscriptionsController.find);
subscriptionsRouter.get('/', subscriptionsController.index);
subscriptionsRouter.post('/', subscriptionsController.create);
subscriptionsRouter.put('/:id', subscriptionsController.update);

export default subscriptionsRouter;
