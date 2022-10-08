import FakeAthleteGroupsRepository from '@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository';
import FakeAthletesRepository from '@modules/athletes/repositories/fakes/FakeAthletesRepository';
import FakeSubscriptionsRepository from '@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository';
import AppError from '@shared/errors/AppError';
import FakePaymentsRepository from '../repositories/fakes/FakePaymentsRepository';
import CreatePaymentService from './CreatePaymentService';

let fakePaymentsRepository: FakePaymentsRepository;
let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let createPayment: CreatePaymentService;

describe('CreatePayment', () => {
  beforeEach(() => {
    fakePaymentsRepository = new FakePaymentsRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    fakeAthletesRepository = new FakeAthletesRepository();
    createPayment = new CreatePaymentService(
      fakeAthletesRepository,
      fakePaymentsRepository
    );
  });

  it('should be able to create a new payment', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos de testes',
      description: 'Descrição grupo de alunos para testes',
    });

    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      birthDate: new Date(1991, 6, 25),
      phoneNumber: '99999999',
      athleteGroup,
      subscription,
    });

    const payment = await createPayment.execute({
      athlete_id: athlete.id,
      paymentDate: '18/12/2020',
      referenceDate: '15/12/2020',
      nextDueDate: '15/01/2021',
      value: 100,
    });

    const expectedNextDueDate = new Date(2021, 0, 15, 0, 0, 0);

    expect(payment).toHaveProperty('id');
    expect(payment.athlete).toEqual(athlete);
    expect(payment.nextDueDate).toEqual(expectedNextDueDate);
    expect(athlete.nextDueDate).toEqual(expectedNextDueDate);
  });

  it('should throw an exception if value is falsy', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos de testes',
      description: 'Descrição grupo de alunos para testes',
    });

    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      birthDate: new Date(1991, 6, 25),
      phoneNumber: '99999999',
      athleteGroup,
      subscription,
    });

    await expect(
      createPayment.execute({
        athlete_id: athlete.id,
        paymentDate: '18/12/2020',
        referenceDate: '15/12/2020',
        nextDueDate: '15/01/2021',
        value: 0,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if paymentDate is empty', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos de testes',
      description: 'Descrição grupo de alunos para testes',
    });

    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      birthDate: new Date(1991, 6, 25),
      phoneNumber: '99999999',
      athleteGroup,
      subscription,
    });

    await expect(
      createPayment.execute({
        athlete_id: athlete.id,
        paymentDate: '',
        referenceDate: '15/12/2020',
        nextDueDate: '15/01/2021',
        value: 100,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if amount reference date is empty',
    async () => {
      const athleteGroup = await fakeAthleteGroupsRepository.create({
        title: 'Grupo de alunos de testes',
        description: 'Descrição grupo de alunos para testes',
      });

      const subscription = await fakeSubscriptionsRepository.create({
        title: 'Plano de testes',
        value: 100,
      });

      const athlete = await fakeAthletesRepository.create({
        name: 'Aluno de testes',
        birthDate: new Date(1991, 6, 25),
        phoneNumber: '99999999',
        athleteGroup,
        subscription,
      });

      await expect(
        createPayment.execute({
          athlete_id: athlete.id,
          paymentDate: '18/12/2020',
          referenceDate: '',
          nextDueDate: '15/01/2021',
          value: 100,
        })
      ).rejects.toBeInstanceOf(AppError);
    });

  it('should throw an exception if amount reference date is empty',
    async () => {
      const athleteGroup = await fakeAthleteGroupsRepository.create({
        title: 'Grupo de alunos de testes',
        description: 'Descrição grupo de alunos para testes',
      });

      const subscription = await fakeSubscriptionsRepository.create({
        title: 'Plano de testes',
        value: 100,
      });

      const athlete = await fakeAthletesRepository.create({
        name: 'Aluno de testes',
        birthDate: new Date(1991, 6, 25),
        phoneNumber: '99999999',
        athleteGroup,
        subscription,
      });

      await expect(
        createPayment.execute({
          athlete_id: athlete.id,
          paymentDate: '18/12/2020',
          referenceDate: '15/12/2020',
          nextDueDate: '',
          value: 100,
        })
      ).rejects.toBeInstanceOf(AppError);
    });

  it('should throw an exception if athlete id is empty', async () => {
    await expect(
      createPayment.execute({
        athlete_id: '',
        paymentDate: '18/12/2020',
        referenceDate: '15/12/2020',
        nextDueDate: '15/01/2021',
        value: 100,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if athlete is not found', async () => {
    await expect(
      createPayment.execute({
        athlete_id: 'id inválido',
        paymentDate: '18/12/2020',
        referenceDate: '15/12/2020',
        nextDueDate: '15/01/2021',
        value: 100,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
