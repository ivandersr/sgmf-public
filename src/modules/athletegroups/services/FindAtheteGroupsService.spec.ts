import FakeAthleteGroupsRepository from "../repositories/fakes/FakeAthleteGroupsRepository";
import FindAthleteGroupsService from "./FindAtheteGroupsService";

let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let findAthleteGroups: FindAthleteGroupsService;

describe('FindAthleteGroupsService', () => {
  beforeEach(() => {
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    findAthleteGroups = new FindAthleteGroupsService(
      fakeAthleteGroupsRepository
    );
  });

  it('should list available athlete groups', async () => {
    const athleteGroup1 = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos 1',
      description: 'Grupo de alunos 1 para testes',
    });

    const athleteGroup2 = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos 2',
      description: 'Grupo de alunos 2 para testes',
    });

    const athleteGroups = await findAthleteGroups.execute();

    expect(athleteGroups).toEqual([athleteGroup1, athleteGroup2]);
  });
});
