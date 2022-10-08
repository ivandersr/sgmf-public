import AppError from '@shared/errors/AppError';
import FakeAthletesRepository from '@modules/athletes/repositories/fakes/FakeAthletesRepository';
import FakeAthleteGroupsRepository from '@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository';
import FakeSubscriptionsRepository from '@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository';
import FakePaymentsRepository from '../repositories/fakes/FakePaymentsRepository';
import FindPaymentsByDateAndAthleteService from './FindPaymentsByDateAndAthleteService';

let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let fakePaymentsRepository: FakePaymentsRepository;
let findPaymentsByDateAndAthlete: FindPaymentsByDateAndAthleteService;

describe('FindPaymentsByDateAndAthleteService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    fakePaymentsRepository = new FakePaymentsRepository();
    findPaymentsByDateAndAthlete = new FindPaymentsByDateAndAthleteService(
      fakeAthletesRepository,
      fakePaymentsRepository,
    );
  });

  it('should be able to list payments by date and athlete', async () => {
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
      value: 100,
      referenceDate: new Date(2020, 11, 27),
      paymentDate: new Date(2020, 11, 27),
      nextDueDate: new Date(2021, 0, 27),
    });

    const findPayments = await findPaymentsByDateAndAthlete.execute({
      athlete_id: athlete.id,
      paymentDate: '27/12/2020',
    });

    expect(findPayments).toEqual([payment]);
  });

  it('should throw an exception if athlete is not found', async () => {
    await expect(
      findPaymentsByDateAndAthlete.execute({
        athlete_id: 'id inválido',
        paymentDate: '27/12/2020',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
