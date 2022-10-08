import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AthleteGroupsController from '../controllers/AthleteGroupsController';

const athleteGroupsRouter = Router();
const athleteGroupsController = new AthleteGroupsController();

athleteGroupsRouter.use(ensureAuthenticated);
athleteGroupsRouter.get('/:id', athleteGroupsController.find);
athleteGroupsRouter.get('/', athleteGroupsController.index);
athleteGroupsRouter.post('/', athleteGroupsController.create);
athleteGroupsRouter.put('/:id', athleteGroupsController.update);

export default athleteGroupsRouter;
