import { inject, injectable } from 'tsyringe';
import IAthletesRepository from '../repositories/IAthletesRepository';

@injectable()
class CountActiveAthletesService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,
  ) { }

  public async execute(): Promise<number> {
    const athletes = await this.athletesRepository.find();

    const activeAthletes = athletes.filter(athlete => athlete.active);

    return activeAthletes.length;
  }
}

export default CountActiveAthletesService;
