import AppError from '@shared/errors/AppError';
import FakeAthleteGroupsRepository from '@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository';
import FakeSubscriptionsRepository from '@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository';
import FakeAthletesRepository from '../repositories/fakes/FakeAthletesRepository';
import UpdateAthleteAthleteGroupService from './UpdateAthleteAthleteGroupService';

let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let updateAthleteAthleteGroup: UpdateAthleteAthleteGroupService;

describe('UpdateAthleteAthleteGroupService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    updateAthleteAthleteGroup = new UpdateAthleteAthleteGroupService(
      fakeAthletesRepository,
      fakeAthleteGroupsRepository,
    );
  });

  it('should be able to update athlete\'s athlete group', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes',
    });

    const newAthleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes - atualização de grupo do aluno',
      description: 'Descrição grupo de testes',
    });

    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1992, 2, 2),
      subscription,
      athleteGroup,
    });

    const updatedAthlete = await updateAthleteAthleteGroup.execute({
      athlete_id: athlete.id,
      athlete_group_id: newAthleteGroup.id,
    });

    expect(updatedAthlete.id).toBe(athlete.id);
    expect(updatedAthlete.athleteGroup).toEqual(newAthleteGroup);
  });

  it('should throw an exception if athlete is not found', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes',
    });

    await expect(
      updateAthleteAthleteGroup.execute({
        athlete_id: 'id inválido',
        athlete_group_id: athleteGroup.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if ahtlete group is not found', async () => {
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
      birthDate: new Date(1992, 2, 2),
      subscription,
      athleteGroup,
    });

    await expect(
      updateAthleteAthleteGroup.execute({
        athlete_id: athlete.id,
        athlete_group_id: 'id inválido',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
