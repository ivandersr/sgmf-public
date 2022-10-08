import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Subscription from '../infra/typeorm/entities/Subscription';
import ICreateSubscriptionDTO from '../dtos/ICreateSubscriptionDTO';
import ISubscriptionsRepository from '../repositories/ISubscriptionsRepository';

@injectable()
class CreateSubscriptionService {
  constructor(
    @inject('SubscriptionsRepository')
    private subscriptionsRepository: ISubscriptionsRepository
  ) { }

  public async execute({
    title,
    value,
  }: ICreateSubscriptionDTO): Promise<Subscription> {
    if (!title) {
      throw new AppError(400, 'Título do plano não deve ser vazio');
    }

    if (value < 0) {
      throw new AppError(400, 'Valor do plano não deve ser vazio.');
    }

    const subscription = await this.subscriptionsRepository.create({
      title,
      value,
    });

    return subscription;
  }
}

export default CreateSubscriptionService;
