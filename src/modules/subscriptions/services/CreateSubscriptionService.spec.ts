import AppError from '@shared/errors/AppError';
import FakeSubscriptionsRepository from '../repositories/fakes/FakeSubscriptionsRepository';
import CreateSubscriptionService from './CreateSubscriptionService';

let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let createSubscription: CreateSubscriptionService;

describe('CreateSubscriptionService', () => {
  beforeEach(() => {
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    createSubscription = new CreateSubscriptionService(
      fakeSubscriptionsRepository
    );
  });

  it('should be able to create a subscription', async () => {
    const subscription = await createSubscription.execute({
      title: 'Plano de testes',
      value: 100,
    });

    expect(subscription).toHaveProperty('id');
    expect(subscription.title).toBe('Plano de testes');
    expect(subscription.value).toBe(100);
  });

  it('should not be able to create a subscription with empty title',
    async () => {
      await expect(
        createSubscription.execute({
          title: '',
          value: 100,
        })
      ).rejects.toBeInstanceOf(AppError);
    });

  it('should not be able to create a subscription with invalid value',
    async () => {
      await expect(
        createSubscription.execute({
          title: 'Plano de testes',
          value: -1
        })
      ).rejects.toBeInstanceOf(AppError);
    });
});
