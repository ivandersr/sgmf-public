import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AthletesController from '../controllers/AthletesController';
import AthleteRefGroupsController from '../controllers/AthleteRefGroupsController';
import AthleteStatusController from '../controllers/AthleteStatusController';
import AthleteSubscriptionsController from '../controllers/AthleteSubscriptionsController';
import AthleteAthleteGroupsController from '../controllers/AthleteAthleteGroupsController';
import AthletesFilterController from '../controllers/AthetesFilterController';
import AthletesCountController from '../controllers/AthletesCountController';

const athletesRouter = Router();
const athletesController = new AthletesController();
const athleteRefGroupsController = new AthleteRefGroupsController();
const athleteStatusController = new AthleteStatusController();
const athleteSubscriptionsController = new AthleteSubscriptionsController();
const athleteAthleteGroupsController = new AthleteAthleteGroupsController();
const athletesFilterController = new AthletesFilterController();
const athletesCountController = new AthletesCountController();

athletesRouter.use(ensureAuthenticated);
athletesRouter.get('/', athletesController.index);
athletesRouter.get('/count', athletesCountController.index);
athletesRouter.get('/filter', athletesFilterController.find)
athletesRouter.get('/:id', athletesController.find);
athletesRouter.post('/', athletesController.create);
athletesRouter.put('/:id', athletesController.update);
athletesRouter.put('/referral/:id', athleteRefGroupsController.update);
athletesRouter.put('/active/:id', athleteStatusController.update);
athletesRouter.put('/subscription/:id', athleteSubscriptionsController.update);
athletesRouter.put('/group/:id', athleteAthleteGroupsController.update);

export default athletesRouter;
