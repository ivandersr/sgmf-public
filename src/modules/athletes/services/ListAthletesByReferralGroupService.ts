import { inject, injectable } from 'tsyringe';
import IListAthletesByReferralGroupDTO from '../dtos/IListAthletesByReferralGroupDTO';
import IAthletesRepository from '../repositories/IAthletesRepository';
import Athlete from '../infra/typeorm/entities/Athlete';

@injectable()
class ListAthletesByReferralGroupService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,
  ) { }

  public async execute({
    referral_group_id,
  }: IListAthletesByReferralGroupDTO): Promise<Athlete[]> {
    const athletes = await this.athletesRepository.findByReferralGroup(
      { referral_group_id }
    );

    return athletes;
  }
}

export default ListAthletesByReferralGroupService;
