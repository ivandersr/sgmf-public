import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ReferralGroupsController from '../controllers/ReferralGroupsController';
import ReferralGroupAthletesController from '../controllers/ReferralGroupAthletesController';
import RefGroupActiveAthletesController from '../controllers/RefGroupActiveAthletesController';

const referralGroupsRouter = Router();
const referralGroupsController = new ReferralGroupsController();
const referralGroupAthletesController = new ReferralGroupAthletesController();
const refGroupActiveAthletesController = new RefGroupActiveAthletesController();

referralGroupsRouter.use(ensureAuthenticated);
referralGroupsRouter.get('/', referralGroupsController.index);
referralGroupsRouter.get('/:id', referralGroupsController.find);
referralGroupsRouter.get('/:id/all', referralGroupAthletesController.index);
referralGroupsRouter.get('/:id/active', refGroupActiveAthletesController.index);
referralGroupsRouter.post('/', referralGroupsController.create);
referralGroupsRouter.put('/:id', referralGroupsController.update);

export default referralGroupsRouter;
