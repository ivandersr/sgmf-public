import FakeAthleteGroupsRepository from "@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository";
import FakeAthletesRepository from "@modules/athletes/repositories/fakes/FakeAthletesRepository";
import FakeSubscriptionsRepository from "@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository";
import AppError from "@shared/errors/AppError";
import FakePaymentsRepository from "../repositories/fakes/FakePaymentsRepository";
import FindPaymentService from "./FindPaymentService";

let fakePaymentsRepository: FakePaymentsRepository;
let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let findPayment: FindPaymentService;

describe('FindPaymentService', () => {
  beforeEach(() => {
    fakePaymentsRepository = new FakePaymentsRepository();
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    findPayment = new FindPaymentService(fakePaymentsRepository);
  });

  it('should be able to find an existing payment', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'plano de testes',
      value: 100,
    });

    const athleteGroup = await fakeAthleteGroupsRepository.create({
      description: 'groupo de testse',
      title: 'testes',
    });

    const athlete = await fakeAthletesRepository.create({
      name: 'aluno de testes',
      athleteGroup,
      birthDate: new Date(20, 2, 1993),
      phoneNumber: '00333232',
      subscription,
    });

    const payment = await fakePaymentsRepository.create({
      athlete,
      nextDueDate: new Date(20, 3, 2021),
      paymentDate: new Date(20, 2, 2021),
      referenceDate: new Date(20, 2, 2021),
      value: 100,
    });

    const foundPayment = await findPayment.execute({ id: payment.id });

    expect(foundPayment).toEqual(payment);
  });

  it('should throw an exception if id is empty', async () => {
    await expect(
      findPayment.execute({
        id: ''
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if payment is not found', async () => {
    await expect(
      findPayment.execute({
        id: 'invalido',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
})
