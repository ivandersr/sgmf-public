import AppError from '@shared/errors/AppError';
import Subscription from '../infra/typeorm/entities/Subscription';
import FakeSubscriptionsRepository from '../repositories/fakes/FakeSubscriptionsRepository';
import ListSubscriptionsService from './ListSubscriptionsService';

let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let listSubscriptions: ListSubscriptionsService;
let subscriptions: Subscription[];

describe('ListSubscriptionsService', () => {
  beforeEach(() => {
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    listSubscriptions = new ListSubscriptionsService(
      fakeSubscriptionsRepository,
    );
    subscriptions = [];
  });

  it('should be able to list subscriptions', async () => {
    const subscription1 = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const subscription2 = await fakeSubscriptionsRepository.create({
      title: 'Plano 2 de testes',
      value: 50,
    });

    subscriptions.push(subscription1, subscription2);

    const findSubscriptions = await listSubscriptions.execute({
      page: '0',
      pageSize: '1',
    });

    expect(findSubscriptions).toEqual({ subscriptions, total: 2, pages: 2 });
  });

  it('should list all subscriptions if page or pagesize is empty', async () => {
    const subscription1 = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const subscription2 = await fakeSubscriptionsRepository.create({
      title: 'Plano 2 de testes',
      value: 50,
    });

    subscriptions.push(subscription1, subscription2);

    const findSubscriptions = await listSubscriptions.execute({
      page: '',
      pageSize: '1',
    });

    expect(findSubscriptions).toEqual({ subscriptions, total: 2, pages: 1 });
  });

  it('should throw an exception if page or pagesize is not a number',
    async () => {
      await expect(
        listSubscriptions.execute({
          page: '0',
          pageSize: 'not a number',
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        listSubscriptions.execute({
          page: 'not a number',
          pageSize: '1',
        })
      ).rejects.toBeInstanceOf(AppError);
    });
});
