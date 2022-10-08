import AppError from "@shared/errors/AppError";
import FakeOutcomesRepository from "../repositories/fakes/FakeOutcomesRepository";
import UpdateOutcomeService from "./UpdateOutcomeService";

let fakeOutcomesRepository: FakeOutcomesRepository;
let updateOutcome: UpdateOutcomeService;

describe('UpdateOutcomeService', () => {
  beforeEach(() => {
    fakeOutcomesRepository = new FakeOutcomesRepository();
    updateOutcome = new UpdateOutcomeService(
      fakeOutcomesRepository
    );
  });

  it('should be able to update outcome details', async () => {
    const outcome = await fakeOutcomesRepository.create({
      description: 'Despesa de testes',
      value: 100,
      dueDate: new Date(2021, 0, 8),
    });

    const updatedOutcome = await updateOutcome.execute({
      id: outcome.id,
      description: 'Despesa de testes - update',
      value: 101,
      dueDate: '25/01/2021',
    });

    const expectedDate = new Date(2021, 0, 25);

    expect(updatedOutcome.id).toBe(outcome.id);
    expect(updatedOutcome.description).toBe('Despesa de testes - update');
    expect(updatedOutcome.value).toBe(101);
    expect(updatedOutcome.dueDate).toEqual(expectedDate);
  });

  it('should throw an exception if id is empty', async () => {
    await expect(
      updateOutcome.execute({
        id: '',
        description: 'Despesa de testes - update',
        value: 101,
        dueDate: '25/01/2021',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if description or dueDate is empty',
    async () => {
      const outcome = await fakeOutcomesRepository.create({
        description: 'Despesa de testes',
        value: 100,
        dueDate: new Date(2021, 0, 8),
      });

      await expect(
        updateOutcome.execute({
          id: outcome.id,
          description: '',
          value: 101,
          dueDate: '25/01/2021',
        })
      ).rejects.toBeInstanceOf(AppError);
    });

  it('should throw an exception if value is invalid', async () => {
    const outcome = await fakeOutcomesRepository.create({
      description: 'Despesa de testes',
      value: 100,
      dueDate: new Date(2021, 0, 8),
    });

    await expect(
      updateOutcome.execute({
        id: outcome.id,
        description: 'Despesa de testes - update',
        value: -1,
        dueDate: '25/01/2021',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if outcome is not found', async () => {
    await fakeOutcomesRepository.create({
      description: 'Despesa de testes',
      value: 100,
      dueDate: new Date(2021, 0, 8)
    });

    await expect(
      updateOutcome.execute({
        id: 'id inválido',
        description: 'Despesa de testes - update',
        value: 101,
        dueDate: '25/01/2021'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
