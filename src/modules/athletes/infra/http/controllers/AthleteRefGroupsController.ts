import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateAthleteReferralGroupService from '@modules/athletes/services/UpdateAthleteReferralGroupService';

class AthleteRefGroupsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { referral_group_id } = request.body;

    const updateReferral = container.resolve(UpdateAthleteReferralGroupService);

    const updatedAthlete = await updateReferral.execute({
      id,
      referral_group_id,
    });

    return response.status(200).json(updatedAthlete);
  }
}

export default AthleteRefGroupsController;
