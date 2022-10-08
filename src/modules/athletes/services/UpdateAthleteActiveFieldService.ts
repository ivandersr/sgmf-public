import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IAthletesRepository from '../repositories/IAthletesRepository';
import IUpdateAthleteActiveFieldDTO from '../dtos/IUpdateAthleteActiveFieldDTO';
import Athlete from '../infra/typeorm/entities/Athlete';

@injectable()
class UpdateAthleteActiveFieldService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,
  ) { }

  public async execute({
    athlete_id,
    active,
  }: IUpdateAthleteActiveFieldDTO): Promise<Athlete> {
    const athlete = await this.athletesRepository.findOne({ id: athlete_id });

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    athlete.active = active;

    await this.athletesRepository.save(athlete);

    return athlete;
  }
}

export default UpdateAthleteActiveFieldService;
