import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IReferralGroupsRepository from '@modules/referralgroups/repositories/IReferralGroupsRepository';
import IUpdateAthleteRefGroupDTO from '../dtos/IUpdateAthleteRefGroupDTO';
import IAthletesRepository from '../repositories/IAthletesRepository';
import Athlete from '../infra/typeorm/entities/Athlete';

@injectable()
class UpdateAthleteReferralGroupService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,

    @inject('ReferralGroupsRepository')
    private referralGroupsRepository: IReferralGroupsRepository,
  ) { }

  public async execute({
    id,
    referral_group_id,
  }: IUpdateAthleteRefGroupDTO): Promise<Athlete> {
    const athlete = await this.athletesRepository.findOne({ id });

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    const referralGroup = await this.referralGroupsRepository.findOne({
      id: referral_group_id
    });

    if (!referralGroup) {
      throw new AppError(404, 'Grupo de indicações não encontrado');
    }

    athlete.referral_group_id = referral_group_id;

    await this.athletesRepository.save(athlete);

    return athlete;
  }
}

export default UpdateAthleteReferralGroupService;
