import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IAthleteGroupsRepository from '@modules/athletegroups/repositories/IAthleteGroupsRepository';
import IAthletesRepository from '../repositories/IAthletesRepository';
import IUpdateAthleteGroupDTO from '../dtos/IUpdateAthleteGroupDTO';
import Athlete from '../infra/typeorm/entities/Athlete';

@injectable()
class UpdateAthleteAthleteGroupService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,

    @inject('AthleteGroupsRepository')
    private athleteGroupsRepository: IAthleteGroupsRepository,
  ) { }

  public async execute({
    athlete_id,
    athlete_group_id,
  }: IUpdateAthleteGroupDTO): Promise<Athlete> {
    const athlete = await this.athletesRepository.findOne({ id: athlete_id });

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    const athleteGroup = await this.athleteGroupsRepository.findOne(
      { id: athlete_group_id },
    );

    if (!athleteGroup) {
      throw new AppError(404, 'Grupo não encontrada');
    }

    athlete.athleteGroup = athleteGroup;

    await this.athletesRepository.save(athlete);

    return athlete;
  }
}

export default UpdateAthleteAthleteGroupService;
