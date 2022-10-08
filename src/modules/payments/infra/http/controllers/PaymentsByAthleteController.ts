import FindPaymentsByAthleteService from '@modules/payments/services/FindPaymentsByAthleteService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class PaymentsByAthleteController {
  public async find(request: Request, response: Response): Promise<Response> {
    const { athlete_id } = request.query;

    const findByAthlete = container.resolve(FindPaymentsByAthleteService);

    const payments = await findByAthlete.execute({
      athlete_id: String(athlete_id),
    });

    return response.status(200).json(payments);
  }
}

export default PaymentsByAthleteController;
