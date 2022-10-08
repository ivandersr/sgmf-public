import AppError from "@shared/errors/AppError";
import FakeOutcomesRepository from "../repositories/fakes/FakeOutcomesRepository";
import FindOutcomesByMonthService from "./FindOutcomesByMonthService";

let fakeOutcomesRepository: FakeOutcomesRepository;
let findOutcomesByMonth: FindOutcomesByMonthService;

describe('FindOutcomesByMonthService', () => {
  beforeEach(() => {
    fakeOutcomesRepository = new FakeOutcomesRepository;
    findOutcomesByMonth = new FindOutcomesByMonthService(
      fakeOutcomesRepository,
    );
  });

  it('should be able to list all outcomes from a given month/year',
    async () => {
      const outcome1 = await fakeOutcomesRepository.create({
        description: 'Despesa 1',
        value: 10,
        dueDate: new Date(2021, 0, 1),
      });

      await fakeOutcomesRepository.create({
        description: 'Despesa 2',
        value: 20,
        dueDate: new Date(2021, 1, 1),
      });

      const outcome3 = await fakeOutcomesRepository.create({
        description: 'Despesa 3',
        value: 30,
        dueDate: new Date(2021, 0, 1),
      });

      const outcomes = await findOutcomesByMonth.execute({
        month: '1',
        year: '2021',
      });

      expect(outcomes).toEqual({ outcomes: [outcome1, outcome3], total: 40 });
    });

  it('should throw an exception if month or year is empty', async () => {
    await expect(
      findOutcomesByMonth.execute({
        month: '',
        year: '2021',
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      findOutcomesByMonth.execute({
        month: '01',
        year: '',
      })
    ).rejects.toBeInstanceOf(AppError);
  })
});
