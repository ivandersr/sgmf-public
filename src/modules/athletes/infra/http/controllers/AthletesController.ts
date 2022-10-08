import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAthleteService from '@modules/athletes/services/CreateAthleteService';
import FindAthleteService from '@modules/athletes/services/FindAthleteService';
import UpdateAthleteService from '@modules/athletes/services/UpdateAthleteService';
import FindAthletesByNameService from '@modules/athletes/services/FindAthletesByNameService';

class AthletesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAthletes = container.resolve(FindAthletesByNameService);
    const { page, pageSize } = request.query;

    const athletes = await listAthletes.execute({
      text: '',
      page: String(page),
      pageSize: String(pageSize),
    });

    return response.status(200).json(athletes);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      birthDate,
      phoneNumber,
      subscription_id,
      athlete_group_id,
    } = request.body;

    const createAthleteService = container.resolve(CreateAthleteService);
    const athlete = await createAthleteService.execute({
      name,
      birthDate,
      phoneNumber,
      subscription_id,
      athlete_group_id,
    });

    return response.status(201).json(athlete);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const findAthlete = container.resolve(FindAthleteService);
    const { id } = request.params;

    const athlete = await findAthlete.execute({
      id,
    });

    return response.status(200).json(athlete);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      name,
      birthDate,
      phoneNumber,
      subscription_id,
      athlete_group_id,
      referral_group_id,
      active,
      observation
    } = request.body;

    const updateAthlete = container.resolve(UpdateAthleteService);

    const updatedAthlete = await updateAthlete.execute({
      id,
      name,
      birthDate,
      phoneNumber,
      subscription_id,
      athlete_group_id,
      referral_group_id,
      active,
      observation
    });

    return response.status(200).json(updatedAthlete);
  }
}

export default AthletesController;
