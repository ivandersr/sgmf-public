import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateReferralGroupService from '@modules/referralgroups/services/CreateReferralGroupService';
import ListReferralGroupsService from '@modules/referralgroups/services/ListReferralGroupsService';
import FindReferralGroupService from '@modules/referralgroups/services/FindReferralGroupService';
import UpdateReferralGroupService from '@modules/referralgroups/services/UpdateReferralGroupService';

class ReferralGroupsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listReferralGroups = container.resolve(ListReferralGroupsService);

    const referralGroups = await listReferralGroups.execute();

    return response.status(200).json(referralGroups);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { referral_id } = request.body;

    const createReferralGroup = container.resolve(CreateReferralGroupService);

    const referralGroup = await createReferralGroup.execute({
      referral_id,
    });

    return response.status(201).json(referralGroup);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findReferralGroup = container.resolve(FindReferralGroupService);

    const referralGroup = await findReferralGroup.execute({
      id
    });

    return response.status(200).json(referralGroup);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title } = request.body;

    const updateReferralGroup = container.resolve(UpdateReferralGroupService);

    const updatedReferralGroup = await updateReferralGroup.execute({
      id,
      title,
    });

    return response.status(200).json(updatedReferralGroup);
  }
}

export default ReferralGroupsController;
