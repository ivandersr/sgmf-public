import AppError from "@shared/errors/AppError";
import FakeAthleteGroupsRepository from "@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository";
import FakeSubscriptionsRepository from "@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository";
import FakeAthletesRepository from "../repositories/fakes/FakeAthletesRepository";
import FindAthletesByNameService from "./FindAthletesByNameService";
import Athlete from "../infra/typeorm/entities/Athlete";

let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let findAthletesByName: FindAthletesByNameService;
let athletes: Athlete[];

describe('FindAthletesByNameService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    findAthletesByName = new FindAthletesByNameService(
      fakeAthletesRepository,
    );
    athletes = [];
  });

  it('should list athletes with name like the search term', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes',
    });

    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1994, 1, 1),
      subscription,
      athleteGroup,
    });

    athletes.push(athlete);

    const findAthletes = await findAthletesByName.execute({
      text: 'de t',
      page: '0',
      pageSize: '1',
    });

    expect(findAthletes).toEqual({
      athletes,
      total: 1,
      pages: 1,
    });
  });

  it('should throw an exception if page or pageSize isn\'t numeric',
    async () => {
      await expect(
        findAthletesByName.execute({
          text: 'test',
          page: '0',
          pageSize: 'non-numeric',
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        findAthletesByName.execute({
          text: 'test',
          page: 'non-numeric',
          pageSize: '0',
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        findAthletesByName.execute({
          text: '',
          page: '0',
          pageSize: 'non-numeric',
        })
      ).rejects.toBeInstanceOf(AppError);
    });

  it('should return all athletes if search term is empty', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes',
    });

    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1994, 1, 1),
      subscription,
      athleteGroup,
    });

    athletes.push(athlete);

    const findAthletes = await findAthletesByName.execute({
      text: '',
      page: '0',
      pageSize: '1',
    });

    expect(findAthletes).toEqual({
      athletes,
      total: 1,
      pages: 1,
    });
  });

  it('should list all athletes in same page if search term and page or '
    + 'pageSize are empty', async () => {
      const subscription = await fakeSubscriptionsRepository.create({
        title: 'Plano de testes',
        value: 100,
      });

      const athleteGroup = await fakeAthleteGroupsRepository.create({
        title: 'Grupo de testes',
        description: 'Descrição grupo de testes',
      });

      const athlete = await fakeAthletesRepository.create({
        name: 'Aluno de testes',
        phoneNumber: '1',
        birthDate: new Date(1994, 1, 1),
        subscription,
        athleteGroup,
      });

      athletes.push(athlete);

      const findAthletes = await findAthletesByName.execute({
        text: '',
        page: '',
        pageSize: '1',
      });

      expect(findAthletes).toEqual({
        athletes,
        total: 1,
        pages: 1,
      });
    });

  it('should list all athletes in same page when searched by name with '
    + 'empty page or pageSize', async () => {
      const subscription = await fakeSubscriptionsRepository.create({
        title: 'Plano de testes',
        value: 100,
      });

      const athleteGroup = await fakeAthleteGroupsRepository.create({
        title: 'Grupo de testes',
        description: 'Descrição grupo de testes',
      });

      const athlete = await fakeAthletesRepository.create({
        name: 'Aluno de testes',
        phoneNumber: '1',
        birthDate: new Date(1994, 1, 1),
        subscription,
        athleteGroup,
      });

      athletes.push(athlete);

      const findAthletes = await findAthletesByName.execute({
        text: 'de t',
        page: '',
        pageSize: '1',
      });

      expect(findAthletes).toEqual({
        athletes,
        total: 1,
        pages: 1,
      });
    });
});
