import FakeAthleteGroupsRepository from "@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository";
import FakeAthletesRepository from "@modules/athletes/repositories/fakes/FakeAthletesRepository";
import FakeSubscriptionsRepository from "@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository";
import AppError from "@shared/errors/AppError";
import FakePaymentsRepository from "../repositories/fakes/FakePaymentsRepository";
import DeletePaymentService from "./DeletePaymentService";

let fakePaymentsRepository: FakePaymentsRepository;
let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let deletePayment: DeletePaymentService;

describe('DeletePaymentService', () => {
  beforeEach(() => {
    fakePaymentsRepository = new FakePaymentsRepository();
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    deletePayment = new DeletePaymentService(
      fakeAthletesRepository,
      fakePaymentsRepository,
    );
  });

  it('should be able to delete a payment and change next due date on athlete',
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

      athlete.nextDueDate = new Date(2021, 3, 5);

      const expectedNextDueDate = new Date(2021, 2, 5);

      await fakePaymentsRepository.create({
        athlete,
        paymentDate: new Date(2021, 1, 5),
        referenceDate: new Date(2021, 1, 5),
        nextDueDate: expectedNextDueDate,
        value: 100,
      });

      const payment = await fakePaymentsRepository.create({
        athlete,
        paymentDate: new Date(2021, 2, 5),
        referenceDate: new Date(2021, 2, 5),
        nextDueDate: new Date(2021, 3, 5),
        value: 100,
      });

      await deletePayment.execute({
        id: payment.id,
      });

      const findPayment = await fakePaymentsRepository.findOne({
        id: payment.id
      });

      expect(athlete.nextDueDate).toEqual(expectedNextDueDate);
      expect(findPayment).toBeFalsy();
    });

  it('should assign present date as next due date if the only payment from '
    + 'athlete is deleted', async () => {
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

      athlete.nextDueDate = new Date(2021, 3, 5);

      const expectedNextDueDate = new Date();

      const payment = await fakePaymentsRepository.create({
        athlete,
        paymentDate: new Date(2021, 2, 5),
        referenceDate: new Date(2021, 2, 5),
        nextDueDate: new Date(2021, 3, 5),
        value: 100,
      });

      await deletePayment.execute({
        id: payment.id,
      });

      const findPayment = await fakePaymentsRepository.findOne({
        id: payment.id
      });

      expect(athlete.nextDueDate).toEqual(expectedNextDueDate);
      expect(findPayment).toBeFalsy();
    });

  it('should throw an exception if id is empty, '
    + 'payment is not found or athlete is not found', async () => {
      await expect(
        deletePayment.execute({
          id: ''
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        deletePayment.execute({
          id: 'invalid id'
        })
      ).rejects.toBeInstanceOf(AppError);

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
        paymentDate: new Date(2021, 2, 5),
        referenceDate: new Date(2021, 2, 5),
        nextDueDate: new Date(2021, 3, 5),
        value: 100,
      });

      payment.athlete_id = 'id inválido'

      await expect(
        deletePayment.execute({
          id: payment.id
        })
      ).rejects.toBeInstanceOf(AppError);
    })
});

