import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IFindAthleteDTO from '../dtos/IFindAthleteDTO';
import Athlete from '../infra/typeorm/entities/Athlete';
import IAthletesRepository from '../repositories/IAthletesRepository';

@injectable()
class FindAthleteService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,
  ) { }

  public async execute({ id }: IFindAthleteDTO): Promise<Athlete> {
    if (!id) {
      throw new AppError(400, 'O id do aluno não deve ser vazio');
    }
    const athlete = await this.athletesRepository.findOne({ id });

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    return athlete;
  }
}

export default FindAthleteService;
