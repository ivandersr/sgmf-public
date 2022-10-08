import AppError from "@shared/errors/AppError";
import FakeAthleteGroupsRepository from "../repositories/fakes/FakeAthleteGroupsRepository";
import UpdateAthleteGroupService from "./UpdateAthleteGroupService";

let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let updateAthleteGroup: UpdateAthleteGroupService;

describe('UpdateAthleteGroupService', () => {
  beforeEach(() => {
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    updateAthleteGroup = new UpdateAthleteGroupService(
      fakeAthleteGroupsRepository,
    );
  });

  it('should be able to update an athlete group\'s details', async () => {
    const newAthleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Categoria de testes',
      description: 'Categoria de testes',
    });

    const updatedAthleteGroup = await updateAthleteGroup.execute({
      id: newAthleteGroup.id,
      title: 'Categoria de testes atualizada',
      description: 'Categoria de testes atualizada',
    });

    expect(updatedAthleteGroup).toEqual({
      id: newAthleteGroup.id,
      title: 'Categoria de testes atualizada',
      description: 'Categoria de testes atualizada',
    });
  });

  it('should throw an exception if id is empty', async () => {
    await expect(
      updateAthleteGroup.execute({
        id: '',
        title: 'teste',
        description: 'teste',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if title or description is empty', async () => {
    await expect(
      updateAthleteGroup.execute({
        id: 'teste',
        title: '',
        description: 'teste',
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      updateAthleteGroup.execute({
        id: 'teste',
        title: 'teste',
        description: '',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if athlete group does not exist', async () => {
    await expect(
      updateAthleteGroup.execute({
        id: 'naotem',
        title: 'teste',
        description: 'teste',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
