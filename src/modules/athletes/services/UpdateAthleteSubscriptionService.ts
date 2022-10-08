import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ISubscriptionsRepository from '@modules/subscriptions/repositories/ISubscriptionsRepository';
import IAthletesRepository from '../repositories/IAthletesRepository';
import IUpdateAthleteSubscriptionDTO from '../dtos/IUpdateAthleteSubscriptionDTO';
import Athlete from '../infra/typeorm/entities/Athlete';

@injectable()
class UpdateAthleteSubscriptionService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,

    @inject('SubscriptionsRepository')
    private subscriptionsRepository: ISubscriptionsRepository,
  ) { }

  public async execute({
    athlete_id,
    subscription_id,
  }: IUpdateAthleteSubscriptionDTO): Promise<Athlete> {
    const athlete = await this.athletesRepository.findOne({ id: athlete_id });

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    const subscription = await this.subscriptionsRepository.findOne({
      id: subscription_id
    });

    if (!subscription) {
      throw new AppError(404, 'Plano não encontrado');
    }

    athlete.subscription = subscription;

    await this.athletesRepository.save(athlete);

    return athlete;
  }
}

export default UpdateAthleteSubscriptionService;
