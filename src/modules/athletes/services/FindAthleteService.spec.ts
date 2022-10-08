import FakeAthleteGroupsRepository from "@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository";
import FakeSubscriptionsRepository from "@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository";
import AppError from "@shared/errors/AppError";
import FakeAthletesRepository from "../repositories/fakes/FakeAthletesRepository";
import FindAthleteService from "./FindAthleteService"

let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let findAthlete: FindAthleteService;

describe('FindAthleteService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    findAthlete = new FindAthleteService(fakeAthletesRepository);
  });

  it('should be able to find an athlete with a valid id', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos de testes',
      description: 'Descrição grupo de alunos para testes',
    });

    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const expectedAthlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      birthDate: new Date(1991, 6, 25),
      phoneNumber: '99999999',
      athleteGroup,
      subscription,
    });

    const { id } = expectedAthlete;

    const athlete = await findAthlete.execute({ id })

    expect(athlete).toBe(expectedAthlete);
  });

  it('should not be able to find an athlete without its id', async () => {
    await
      expect(findAthlete.execute({ id: '' }))
        .rejects.toBeInstanceOf(AppError);
  });

  it('should return 404 error when athlete is not found', async () => {
    await
      expect(findAthlete.execute({ id: 'id inválido' }))
        .rejects.toBeInstanceOf(AppError);
  });

});
