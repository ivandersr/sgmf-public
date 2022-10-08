import FindOutcomesByMonthService from '@modules/outcomes/services/FindOutcomesByMonthService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class OutcomesByMonthController {
  public async find(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query;

    const findOutcomesByMonth = container.resolve(FindOutcomesByMonthService);

    const outcomes = await findOutcomesByMonth.execute({
      month: String(month),
      year: String(year),
    });

    return response.status(200).json(outcomes);
  }
}

export default OutcomesByMonthController;
