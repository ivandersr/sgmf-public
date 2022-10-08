import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Formatter from '@shared/utils/Formatter';
import ISubscriptionsRepository from '@modules/subscriptions/repositories/ISubscriptionsRepository';
import IAthleteGroupsRepository from '@modules/athletegroups/repositories/IAthleteGroupsRepository';
import IReferralGroupsRepository from '@modules/referralgroups/repositories/IReferralGroupsRepository';
import IAthletesRepository from '../repositories/IAthletesRepository';
import IUpdateAthleteDataDTO from '../dtos/IUpdateAthleteDataDTO';
import Athlete from '../infra/typeorm/entities/Athlete';

@injectable()
class UpdateAthleteService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,

    @inject('SubscriptionsRepository')
    private subscriptionsRepository: ISubscriptionsRepository,

    @inject('AthleteGroupsRepository')
    private athleteGroupsRepository: IAthleteGroupsRepository,

    @inject('ReferralGroupsRepository')
    private referralGroupsRepository: IReferralGroupsRepository,
  ) { }

  public async execute({
    id,
    name,
    birthDate,
    phoneNumber,
    subscription_id,
    athlete_group_id,
    referral_group_id,
    active,
    observation
  }: IUpdateAthleteDataDTO): Promise<Athlete> {
    const athlete = await this.athletesRepository.findOne({ id });

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    if (!name || !birthDate || !phoneNumber) {
      throw new AppError(400, 'Informe nome, data de nascimento e telefone');
    }

    const subscription = await this.subscriptionsRepository.findOne({
      id: subscription_id
    });

    if (!subscription) {
      throw new AppError(404, 'Plano não encontrado');
    }

    const athleteGroup = await this.athleteGroupsRepository.findOne({
      id: athlete_group_id,
    });

    if (!athleteGroup) {
      throw new AppError(404, 'Categoria não encontrada');
    }

    if (referral_group_id) {
      const referralGroup = await this.referralGroupsRepository.findOne({
        id: referral_group_id,
      });

      if (!referralGroup) {
        throw new AppError(404, 'Grupo de indicações não encontrado');
      }

      Object.assign(athlete, { referralGroup });
    }

    Object.assign(athlete, {
      name,
      birthDate: Formatter.formatDate(birthDate),
      phoneNumber,
      subscription,
      athleteGroup,
      active,
      observation,
    });

    await this.athletesRepository.save(athlete);

    return athlete;
  }
}

export default UpdateAthleteService;
