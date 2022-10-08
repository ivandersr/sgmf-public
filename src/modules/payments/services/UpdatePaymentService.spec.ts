import FakeAthleteGroupsRepository from "@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository"
import FakeAthletesRepository from "@modules/athletes/repositories/fakes/FakeAthletesRepository";
import FakeSubscriptionsRepository from "@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository";
import AppError from "@shared/errors/AppError";
import FakePaymentsRepository from "../repositories/fakes/FakePaymentsRepository";
import UpdatePaymentService from "./UpdatePaymentService";

let fakePaymentsRepository: FakePaymentsRepository;
let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let updatePayment: UpdatePaymentService;

describe('UpdatePaymentService', () => {
  beforeEach(() => {
    fakePaymentsRepository = new FakePaymentsRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    updatePayment = new UpdatePaymentService(
      fakeAthletesRepository,
      fakePaymentsRepository,
    );
  });

  it('should be able to update a payment', async () => {
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

    const payment = await fakePaymentsRepository.create({
      athlete,
      paymentDate: new Date(2020, 11, 19, 0, 0, 0),
      referenceDate: new Date(2020, 11, 15, 0, 0, 0),
      nextDueDate: new Date(2021, 0, 15, 0, 0, 0),
      value: 100,
    });

    const updatedPayment = await updatePayment.execute({
      id: payment.id,
      value: 50,
      paymentDate: '20/12/2020',
      referenceDate: '18/12/2020',
      nextDueDate: '18/01/2021'
    });

    expect(updatedPayment.nextDueDate).toEqual(new Date(2021, 0, 18, 0, 0));
    expect(athlete.nextDueDate).toEqual(new Date(2021, 0, 18, 0, 0, 0));
    expect(updatedPayment.paymentDate).toEqual(new Date(2020, 11, 20, 0, 0, 0));
    expect(updatedPayment.referenceDate).toEqual(
      new Date(2020, 11, 18, 0, 0, 0)
    );
    expect(updatedPayment.value).toBe(50);
  });

  it('should throw an exception if id, value, payment date, next due date, '
    + 'reference date is empty, payment is not found or athlete is not found',
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

      const payment = await fakePaymentsRepository.create({
        athlete,
        paymentDate: new Date(2020, 11, 19, 0, 0, 0),
        referenceDate: new Date(2020, 11, 15, 0, 0, 0),
        nextDueDate: new Date(2021, 0, 15, 0, 0, 0),
        value: 100,
      });

      await expect(
        updatePayment.execute({
          id: '',
          value: 50,
          paymentDate: '20/12/2020',
          referenceDate: '18/12/2020',
          nextDueDate: '18/01/2021'
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        updatePayment.execute({
          id: 'payment.id',
          value: 50,
          paymentDate: '20/12/2020',
          referenceDate: '18/12/2020',
          nextDueDate: '18/01/2021'
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        updatePayment.execute({
          id: payment.id,
          value: 0,
          paymentDate: '20/12/2020',
          referenceDate: '18/12/2020',
          nextDueDate: '18/01/2021'
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        updatePayment.execute({
          id: payment.id,
          value: 50,
          paymentDate: '',
          referenceDate: '18/12/2020',
          nextDueDate: '18/01/2021'
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        updatePayment.execute({
          id: payment.id,
          value: 50,
          paymentDate: '20/12/2020',
          referenceDate: '',
          nextDueDate: '18/01/2021'
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        updatePayment.execute({
          id: payment.id,
          value: 50,
          paymentDate: '20/12/2020',
          referenceDate: '18/12/2020',
          nextDueDate: ''
        })
      ).rejects.toBeInstanceOf(AppError);

      payment.athlete_id = 'id zuado';

      await expect(
        updatePayment.execute({
          id: payment.id,
          value: 50,
          paymentDate: '20/12/2020',
          referenceDate: '18/12/2020',
          nextDueDate: '18/01/2021'
        })
      ).rejects.toBeInstanceOf(AppError);
    });
});
