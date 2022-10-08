import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateAthleteActiveFieldService from '@modules/athletes/services/UpdateAthleteActiveFieldService';

class AthleteStatusController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { active } = request.body;

    const updateAthleteActiveField = container.resolve(
      UpdateAthleteActiveFieldService
    );

    const athlete = await updateAthleteActiveField.execute({
      athlete_id: id,
      active,
    });

    return response.status(200).json(athlete);
  }
}

export default AthleteStatusController;
