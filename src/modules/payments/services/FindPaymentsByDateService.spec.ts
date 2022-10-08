import FakeAthletesRepository from '@modules/athletes/repositories/fakes/FakeAthletesRepository';
import FakeAthleteGroupsRepository from '@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository';
import FakeSubscriptionsRepository from '@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository';
import FakePaymentsRepository from '../repositories/fakes/FakePaymentsRepository';
import FindPaymentsByDateService from './FindPaymentsByDateService';

let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let fakePaymentsRepository: FakePaymentsRepository;
let findPaymentsByDate: FindPaymentsByDateService;


describe('FindPaymentsByDateService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    fakePaymentsRepository = new FakePaymentsRepository();
    findPaymentsByDate = new FindPaymentsByDateService(
      fakePaymentsRepository
    );
  });

  it('should be able to find payments by date', async () => {
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
      referenceDate: new Date(2021, 11, 11),
      paymentDate: new Date(2021, 11, 11),
      nextDueDate: new Date(2022, 0, 11),
      value: 100,
    });

    const findPayments = await findPaymentsByDate.execute({
      paymentDate: '11/12/2021'
    });

    expect(findPayments).toEqual([payment]);
  });
});
