import AppError from "@shared/errors/AppError";
import FakeOutcomesRepository from "../repositories/fakes/FakeOutcomesRepository";
import FindOutcomeService from "./FindOutcomeService";

let fakeOutcomesRepository: FakeOutcomesRepository;
let findOutcome: FindOutcomeService;

describe('FindOutcomeService', () => {
  beforeEach(() => {
    fakeOutcomesRepository = new FakeOutcomesRepository();
    findOutcome = new FindOutcomeService(
      fakeOutcomesRepository,
    );
  });

  it('should be able to find an outcome by id', async () => {
    const newOutcome = await fakeOutcomesRepository.create({
      description: 'Despesa de testes',
      value: 100,
      dueDate: new Date(2021, 0, 10),
    });

    const outcome = await findOutcome.execute({
      id: newOutcome.id,
    });

    expect(outcome).toEqual(newOutcome);
  }
  );

  it('should throw an exception if id is empty', async () => {
    await expect(
      findOutcome.execute({
        id: '',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
