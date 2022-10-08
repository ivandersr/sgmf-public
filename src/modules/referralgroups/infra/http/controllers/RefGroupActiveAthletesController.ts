import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListActiveAthletesByReferralGroupService from '@modules/athletes/services/ListActiveAthletesByReferralGroupService';

class RefGroupActiveAthletesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listActiveByReferral = container.resolve(
      ListActiveAthletesByReferralGroupService
    );

    const athletesByReferral = await listActiveByReferral.execute({
      referral_group_id: id,
    });

    return response.status(200).json(athletesByReferral);
  }
}

export default RefGroupActiveAthletesController;
