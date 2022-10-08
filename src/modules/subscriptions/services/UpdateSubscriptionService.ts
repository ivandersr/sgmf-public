import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUpdateSubscriptionDTO from '../dtos/IUpdateSubscriptionDTO';
import Subscription from '../infra/typeorm/entities/Subscription';
import ISubscriptionsRepository from '../repositories/ISubscriptionsRepository';

@injectable()
class UpdateSubscriptionService {
  constructor(
    @inject('SubscriptionsRepository')
    private subscriptionsRepository: ISubscriptionsRepository
  ) { }

  public async execute({
    id,
    title,
    value,
  }: IUpdateSubscriptionDTO): Promise<Subscription> {
    const subscription = await this.subscriptionsRepository.findOne({ id });

    if (!subscription) {
      throw new AppError(404, 'Plano não encontrado');
    }

    Object.assign(subscription, { title, value });

    await this.subscriptionsRepository.save(subscription);

    return subscription;
  }
}

export default UpdateSubscriptionService;
