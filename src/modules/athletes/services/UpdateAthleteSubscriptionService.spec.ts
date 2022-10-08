import AppError from '@shared/errors/AppError';
import FakeAthleteGroupsRepository from '@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository';
import FakeSubscriptionsRepository from '@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository';
import FakeAthletesRepository from '../repositories/fakes/FakeAthletesRepository';
import UpdateAthleteSubscriptionService from './UpdateAthleteSubscriptionService';

let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let updateAthleteSubscription: UpdateAthleteSubscriptionService;

describe('UpdateAthleteSubscriptionService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    updateAthleteSubscription = new UpdateAthleteSubscriptionService(
      fakeAthletesRepository,
      fakeSubscriptionsRepository,
    );
  });

  it('should be able to update athlete\'s subscription', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes',
    });

    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      birthDate: new Date(1995, 10, 10),
      phoneNumber: '1',
      subscription,
      athleteGroup,
    });

    const newSubscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes - atualização de alunos',
      value: 50,
    });

    const updatedAthlete = await updateAthleteSubscription.execute({
      athlete_id: athlete.id,
      subscription_id: newSubscription.id,
    });

    expect(updatedAthlete.subscription.id).toBe(newSubscription.id);
  });

  it('should throw an exception if athlete is not found', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    await expect(
      updateAthleteSubscription.execute({
        athlete_id: 'id inválido',
        subscription_id: subscription.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if subscription is not found', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes',
    });

    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      birthDate: new Date(1995, 10, 10),
      phoneNumber: '1',
      subscription,
      athleteGroup,
    });

    await expect(
      updateAthleteSubscription.execute({
        athlete_id: athlete.id,
        subscription_id: 'id inválido',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

