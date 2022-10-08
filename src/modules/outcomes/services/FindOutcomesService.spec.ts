import AppError from "@shared/errors/AppError";
import FakeOutcomesRepository from "../repositories/fakes/FakeOutcomesRepository"
import FindOutcomesService from "./FindOutcomesService";

let fakeOutcomesRepository: FakeOutcomesRepository;
let findOutcomes: FindOutcomesService;

describe('FindOutcomesService', () => {
  beforeEach(() => {
    fakeOutcomesRepository = new FakeOutcomesRepository();
    findOutcomes = new FindOutcomesService(
      fakeOutcomesRepository
    );
  });

  it('should be able to list outcomes that match the description', async () => {
    const outcome1 = await fakeOutcomesRepository.create({
      description: 'Despesa de testes 1',
      value: 1,
      dueDate: new Date(2021, 0, 8),
    });

    const outcome2 = await fakeOutcomesRepository.create({
      description: 'Despesa de testes 2',
      value: 1,
      dueDate: new Date(2021, 0, 8),
    });

    const outcomes = await findOutcomes.execute({
      text: 'Despes',
      page: '0',
      pageSize: '2'
    });

    const expected = {
      outcomes: [outcome2, outcome1],
      total: 2,
      pages: 1,
    };

    expect(outcomes).toEqual(expected);
  });

  it('should return all outcomes if text, page and page size are empty',
    async () => {
      const outcome1 = await fakeOutcomesRepository.create({
        description: 'Despesa de testes 1',
        value: 1,
        dueDate: new Date(2021, 0, 8),
      });

      const outcome2 = await fakeOutcomesRepository.create({
        description: 'Despesa de testes 2',
        value: 1,
        dueDate: new Date(2021, 0, 8),
      });

      const outcomes = await findOutcomes.execute({
        text: '',
        page: '',
        pageSize: ''
      });

      const expected = {
        outcomes: [outcome1, outcome2],
        total: 2,
        pages: 1,
      };

      expect(outcomes).toEqual(expected);
    });

  it('should throw an exception if page or page size can\'t be cast to number',
    async () => {
      await fakeOutcomesRepository.create({
        description: 'Despesa de testes 1',
        value: 1,
        dueDate: new Date(2021, 0, 8),
      });

      await expect(
        findOutcomes.execute({
          text: '',
          page: 'não-numérico',
          pageSize: '1'
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        findOutcomes.execute({
          text: '',
          page: '0',
          pageSize: 'não-numérico'
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        findOutcomes.execute({
          text: 'Despes',
          page: 'não-numérico',
          pageSize: '1'
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        findOutcomes.execute({
          text: 'Despes',
          page: '0',
          pageSize: 'não-numérico'
        })
      ).rejects.toBeInstanceOf(AppError);
    });

  it('should return outcomes, total and number of pages, filtered by '
    + 'description', async () => {
      const outcome1 = await fakeOutcomesRepository.create({
        description: 'Despesa de testes 1',
        value: 1,
        dueDate: new Date(2021, 0, 8),
      });

      const outcome2 = await fakeOutcomesRepository.create({
        description: 'Despesa de testes 2',
        value: 1,
        dueDate: new Date(2021, 0, 8),
      });

      await fakeOutcomesRepository.create({
        description: 'Teste conta 1',
        value: 1,
        dueDate: new Date(2021, 0, 8),
      });

      const outcomes = await findOutcomes.execute({
        text: 'Despes',
        page: '0',
        pageSize: '1'
      });

      const expected = {
        outcomes: [outcome2, outcome1],
        total: 2,
        pages: 2,
      };
      expect(outcomes).toEqual(expected);
    });

  it('should return all filtered outcomes in one page if page or page size '
    + 'is empty', async () => {
      const outcome1 = await fakeOutcomesRepository.create({
        description: 'Despesa de testes 1',
        value: 1,
        dueDate: new Date(2021, 0, 8),
      });

      const outcome2 = await fakeOutcomesRepository.create({
        description: 'Despesa de testes 2',
        value: 1,
        dueDate: new Date(2021, 0, 8),
      });

      await fakeOutcomesRepository.create({
        description: 'Teste conta 1',
        value: 1,
        dueDate: new Date(2021, 0, 8),
      });

      const outcomes1 = await findOutcomes.execute({
        text: 'Despes',
        page: '',
        pageSize: '2'
      });

      const outcomes2 = await findOutcomes.execute({
        text: 'Despes',
        page: '1',
        pageSize: ''
      });

      const expected = {
        outcomes: [outcome1, outcome2],
        total: 2,
        pages: 1,
      };
      expect(outcomes1).toEqual(expected);
      expect(outcomes2).toEqual(expected);
    });

  it('should return all outcomes with pagination if text is empty',
    async () => {
      const outcome1 = await fakeOutcomesRepository.create({
        description: 'Despesa de testes 1',
        value: 1,
        dueDate: new Date(2021, 0, 8),
      });

      const outcome2 = await fakeOutcomesRepository.create({
        description: 'Despesa de testes 2',
        value: 1,
        dueDate: new Date(2021, 0, 8),
      });

      const outcomes = await findOutcomes.execute({
        text: '',
        page: '0',
        pageSize: '2'
      });

      const expected = {
        outcomes: [outcome1, outcome2],
        total: 2,
        pages: 1,
      };

      expect(outcomes).toEqual(expected);
    });
});
