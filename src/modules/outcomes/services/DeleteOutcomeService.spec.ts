import AppError from "@shared/errors/AppError";
import FakeOutcomesRepository from "../repositories/fakes/FakeOutcomesRepository";
import DeleteOutcomeService from "./DeleteOutcomeService";

let fakeOutcomesRepository: FakeOutcomesRepository;
let deleteOutcome: DeleteOutcomeService;

describe('DeleteOutcomeService', () => {
  beforeEach(() => {
    fakeOutcomesRepository = new FakeOutcomesRepository();
    deleteOutcome = new DeleteOutcomeService(
      fakeOutcomesRepository
    );
  });

  it('should be able to delete an outcome by id', async () => {
    const outcome = await fakeOutcomesRepository.create({
      description: 'Despesa de testes',
      value: 100,
      dueDate: new Date(2021, 0, 15),
    });

    await deleteOutcome.execute({ id: outcome.id });

    const findOutcome = await fakeOutcomesRepository.findOne({
      id: outcome.id
    });

    expect(findOutcome).toBeFalsy();
  });

  it('should throw an exception if id field is empty', async () => {
    await expect(
      deleteOutcome.execute({
        id: '',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if outcome is not found', async () => {
    await expect(
      deleteOutcome.execute({
        id: 'não vai achar'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
