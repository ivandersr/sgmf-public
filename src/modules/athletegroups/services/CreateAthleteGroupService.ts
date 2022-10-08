import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import AthleteGroup from '../infra/typeorm/entities/AthleteGroup';
import ICreateAthleteGroupDTO from '../dtos/ICreateAthleteGroupDTO';
import IAthleteGroupsRepository from '../repositories/IAthleteGroupsRepository';

@injectable()
class CreateAthleteGroupService {
  constructor(
    @inject('AthleteGroupsRepository')
    private athleteGroupsRepository: IAthleteGroupsRepository,
  ) { }

  public async execute({
    title,
    description,
  }: ICreateAthleteGroupDTO): Promise<AthleteGroup> {
    if (!title) {
      throw new AppError(400, 'Título do grupo deve ser preenchido');
    }

    if (!description) {
      throw new AppError(400, 'Descrição do grupo deve ser preenchida.');
    }

    const athleteGroup = await this.athleteGroupsRepository.create({
      title,
      description,
    });

    return athleteGroup;
  }
}

export default CreateAthleteGroupService;
