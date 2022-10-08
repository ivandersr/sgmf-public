import AppError from '@shared/errors/AppError';
import FakeAthleteGroupsRepository from '@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository';
import FakeSubscriptionsRepository from '@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository';
import FakeAthletesRepository from '@modules/athletes/repositories/fakes/FakeAthletesRepository';
import FakePaymentsRepository from '../repositories/fakes/FakePaymentsRepository';
import FindPaymentsByAthleteService from './FindPaymentsByAthleteService';

let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let fakePaymentsRepository: FakePaymentsRepository;
let findPaymentsByAthlete: FindPaymentsByAthleteService;

describe('FindPaymentsByAthleteService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    fakePaymentsRepository = new FakePaymentsRepository();
    findPaymentsByAthlete = new FindPaymentsByAthleteService(
      fakeAthletesRepository,
      fakePaymentsRepository,
    );
  });

  it('should be able to list payments by athlete', async () => {
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
      phoneNumber: '1',
      birthDate: new Date(1994, 1, 1),
      subscription,
      athleteGroup,
    });

    const payment = await fakePaymentsRepository.create({
      athlete,
      paymentDate: new Date(2021, 10, 11),
      referenceDate: new Date(2021, 10, 10),
      nextDueDate: new Date(2021, 11, 11),
      value: 100,
    });

    const findPayments = await findPaymentsByAthlete.execute({
      athlete_id: athlete.id
    });

    expect(findPayments).toEqual([payment]);
  });

  it('should throw an exception if athlete is not found', async () => {
    await expect(
      findPaymentsByAthlete.execute({
        athlete_id: 'id inválido',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

