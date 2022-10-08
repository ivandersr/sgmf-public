import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAthletesByReferralGroupService from '@modules/athletes/services/ListAthletesByReferralGroupService';

class ReferralGroupAthletesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listByReferralGroup = container.resolve(
      ListAthletesByReferralGroupService
    );

    const activeByReferral = await listByReferralGroup.execute({
      referral_group_id: id,
    });

    return response.status(200).json(activeByReferral);
  }
}

export default ReferralGroupAthletesController;
