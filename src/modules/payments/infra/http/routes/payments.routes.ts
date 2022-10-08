import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'
import PaymentsByDateAndAthleteController from '../controllers/PaymentsByDateAndAthleteController';
import PaymentsByDateController from '../controllers/PaymentsByDateController';
import PaymentsController from '../controllers/PaymentsController';
import PaymentsByAthleteController from '../controllers/PaymentsByAthleteController';

const paymentsRouter = Router();
const paymentsController = new PaymentsController();
const byDateController = new PaymentsByDateController();
const byDateAndAthleteController = new PaymentsByDateAndAthleteController();
const byAthleteController = new PaymentsByAthleteController();

paymentsRouter.use(ensureAuthenticated);
paymentsRouter.post('/', paymentsController.create);
paymentsRouter.put('/:id', paymentsController.update);
paymentsRouter.delete('/:id', paymentsController.delete);
paymentsRouter.get('/byathlete', byAthleteController.find);
paymentsRouter.get('/bydate', byDateController.find);
paymentsRouter.get('/bydateandathlete', byDateAndAthleteController.find);
paymentsRouter.get('/:id', paymentsController.find);

export default paymentsRouter;
