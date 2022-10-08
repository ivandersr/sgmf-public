import AppError from "@shared/errors/AppError";
import FakeAthleteGroupsRepository from "../repositories/fakes/FakeAthleteGroupsRepository";
import FindAthleteGroupService from "./FindAthleteGroupService";

let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let findAthleteGroup: FindAthleteGroupService;

describe('FindAthleteGroupService', () => {
  beforeEach(() => {
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    findAthleteGroup = new FindAthleteGroupService(
      fakeAthleteGroupsRepository,
    );
  });

  it('should be able to find an athlete group by its id', async () => {
    const newAthleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Categoria de testes',
      description: 'Categoria de testes',
    });

    const athleteGroup = await findAthleteGroup.execute({
      id: newAthleteGroup.id
    });

    expect(athleteGroup).toEqual(newAthleteGroup);
  });

  it('should throw an exception if id field is emtpy', async () => {
    await expect(
      findAthleteGroup.execute({ id: '' })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if athlete group is not found', async () => {
    await expect(
      findAthleteGroup.execute({ id: 'nao existe' })
    ).rejects.toBeInstanceOf(AppError);
  });
});
