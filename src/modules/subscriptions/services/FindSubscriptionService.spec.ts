import AppError from "@shared/errors/AppError";
import FakeSubscriptionsRepository from "../repositories/fakes/FakeSubscriptionsRepository";
import FindSubscriptionService from "./FindSubscriptionService";

let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let findSubscription: FindSubscriptionService;

describe('FindSubscriptionsService', () => {
  beforeEach(() => {
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    findSubscription = new FindSubscriptionService(
      fakeSubscriptionsRepository
    );
  });

  it('should be able to find subscription by id', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const foundSub = await findSubscription.execute({
      id: subscription.id
    });

    expect(foundSub).toEqual(subscription);
  });

  it('should throw an exception if id is empty', async () => {
    await expect(
      findSubscription.execute({ id: '' })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoudl throw an exception if subscription is not found', async () => {
    await expect(
      findSubscription.execute({ id: 'esse aqui não existe' })
    ).rejects.toBeInstanceOf(AppError);
  });
});
