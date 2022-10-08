import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IActiveByReferralDTO from '../dtos/IActiveByReferralDTO';
import IListAthletesByReferralGroupDTO from '../dtos/IListAthletesByReferralGroupDTO';
import IAthletesRepository from '../repositories/IAthletesRepository';

@injectable()
class ListActiveAthletesByReferralGroupService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,
  ) { }

  public async execute({
    referral_group_id,
  }: IListAthletesByReferralGroupDTO): Promise<IActiveByReferralDTO> {
    if (!referral_group_id) {
      throw new AppError(400, 'Informe o id do grupo de indicações');
    }
    const athletesList = await this.athletesRepository
      .findActiveByReferralGroup(
        { referral_group_id },
      );

    return athletesList;
  }
}

export default ListActiveAthletesByReferralGroupService;
