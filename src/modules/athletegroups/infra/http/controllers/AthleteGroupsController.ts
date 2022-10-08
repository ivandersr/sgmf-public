import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAthleteGroupService from '@modules/athletegroups/services/CreateAthleteGroupService';
import FindAthleteGroupsService from '@modules/athletegroups/services/FindAtheteGroupsService';
import FindAthleteGroupService from '@modules/athletegroups/services/FindAthleteGroupService';
import UpdateAthleteGroupService from '@modules/athletegroups/services/UpdateAthleteGroupService';

class AthleteGroupsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const findAthleteGroups = container.resolve(FindAthleteGroupsService);

    const athleteGroups = await findAthleteGroups.execute();

    return response.status(200).json(athleteGroups);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const createAthleteGroup = container.resolve(CreateAthleteGroupService);

    const athleteGroup = await createAthleteGroup.execute({
      title,
      description,
    });

    return response.status(201).json(athleteGroup);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findAthleteGroup = container.resolve(FindAthleteGroupService);

    const athleteGroup = await findAthleteGroup.execute({ id });

    return response.status(200).json(athleteGroup);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { title, description } = request.body;

    const updateAthleteGroup = container.resolve(UpdateAthleteGroupService);

    const athleteGroup = await updateAthleteGroup.execute({
      id,
      title,
      description,
    });

    return response.status(200).json(athleteGroup);
  }
}

export default AthleteGroupsController;
