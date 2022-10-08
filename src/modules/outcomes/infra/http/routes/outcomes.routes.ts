import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import OutcomesByMonthController from '../controllers/OutcomesByMonthController';
import OutcomesController from '../controllers/OutcomesController';

const outcomesRouter = Router();
const outcomesController = new OutcomesController();
const outcomesByMonthController = new OutcomesByMonthController();

outcomesRouter.use(ensureAuthenticated);
outcomesRouter.get('/bymonth', outcomesByMonthController.find);
outcomesRouter.get('/', outcomesController.index);
outcomesRouter.get('/:id', outcomesController.find);
outcomesRouter.post('/', outcomesController.create);
outcomesRouter.put('/:id', outcomesController.update);
outcomesRouter.delete('/:id', outcomesController.delete);

export default outcomesRouter;
