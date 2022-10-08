import AppError from '@shared/errors/AppError';
import FakeSubscriptionsRepository from '../repositories/fakes/FakeSubscriptionsRepository';
import UpdateSubscriptionService from './UpdateSubscriptionService';

let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let updateSubscription: UpdateSubscriptionService;

describe('UpdateSubscriptionService', () => {
  beforeEach(() => {
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    updateSubscription = new UpdateSubscriptionService(
      fakeSubscriptionsRepository,
    );
  });

  it('should be able to update subscription\'s details', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const updatedSubscription = await updateSubscription.execute({
      id: subscription.id,
      title: 'Plano atualizado',
      value: 50,
    });

    expect(updatedSubscription.id).toBe(subscription.id);
    expect(updatedSubscription.title).toBe('Plano atualizado');
    expect(updatedSubscription.value).toBe(50);
  });

  it('should throw an exception if subscription is not found', async () => {
    await expect(
      updateSubscription.execute({
        id: 'id inválido',
        title: 'Plano atualizado',
        value: 50,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
