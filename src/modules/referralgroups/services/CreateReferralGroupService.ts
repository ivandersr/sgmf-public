import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';
import ReferralGroup from '../infra/typeorm/entities/ReferralGroup';
import ICreateReferralGroupServiceDTO from '../dtos/ICreateReferralGroupServiceDTO';
import IReferralGroupsRepository from '../repositories/IReferralGroupsRepository';

@injectable()
class CreateReferralGroupService {
  constructor(
    @inject('ReferralGroupsRepository')
    private referralGroupsRepository: IReferralGroupsRepository,

    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,
  ) { }

  public async execute(
    { referral_id }: ICreateReferralGroupServiceDTO
  ): Promise<ReferralGroup> {
    if (!referral_id) {
      throw new AppError(
        400,
        'O grupo deve ter um(a) aluno(a) de referência (quem indicou).',
      );
    }

    const athlete = await this.athletesRepository.findOne({ id: referral_id });

    if (!athlete) {
      throw new AppError(404, 'Aluno(a) não encontrado(a).');
    }

    const { name } = athlete;

    const referralGroup = await this.referralGroupsRepository.create({
      title: name,
    });

    Object.assign(athlete, { referralGroup });

    await this.athletesRepository.save(athlete);

    return referralGroup;
  }
}

export default CreateReferralGroupService;
