import AppError from "@shared/errors/AppError";
import FakeOutcomesRepository from "../repositories/fakes/FakeOutcomesRepository";
import CreateOutcomeService from "./CreateOutcomeService";

let fakeOutcomesRepository: FakeOutcomesRepository;
let createOutcome: CreateOutcomeService;

describe('CreateOutcomeService', () => {
  beforeEach(() => {
    fakeOutcomesRepository = new FakeOutcomesRepository();
    createOutcome = new CreateOutcomeService(
      fakeOutcomesRepository,
    );
  });

  it('should be able to create a new outcome', async () => {
    const outcome = await createOutcome.execute({
      description: 'Despesa de testes',
      value: 100,
      dueDate: '08/01/2021',
    });

    const expectedDueDate = new Date(2021, 0, 8);

    expect(outcome).toHaveProperty('id');
    expect(outcome.dueDate).toEqual(expectedDueDate);
    expect(outcome.value).toBe(100);
    expect(outcome.description).toBe('Despesa de testes');
  });

  it('should throw an exception if description or due date is empty',
    async () => {
      await expect(
        createOutcome.execute({
          description: '',
          value: 100,
          dueDate: '08/01/2021',
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        createOutcome.execute({
          description: 'Despesa de testes',
          value: 100,
          dueDate: '',
        })
      ).rejects.toBeInstanceOf(AppError);
    });

  it('should throw an exception if value is lower than zero (invalid)',
    async () => {
      await expect(
        createOutcome.execute({
          description: 'Despesa de testes',
          value: -1,
          dueDate: '08/01/2021',
        })
      ).rejects.toBeInstanceOf(AppError);
    })
});
