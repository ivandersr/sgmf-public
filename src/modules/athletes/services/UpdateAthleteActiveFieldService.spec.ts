import AppError from '@shared/errors/AppError';
import FakeSubscriptionsRepository from '@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository';
import FakeAthleteGroupsRepository from '@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository';
import FakeAthletesRepository from '../repositories/fakes/FakeAthletesRepository';
import UpdateAthleteActiveFieldService from './UpdateAthleteActiveFieldService';

let fakeAthletesRepository: FakeAthletesRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let updateAthleteActiveField: UpdateAthleteActiveFieldService;

describe('UpdateAthleteActiveFieldService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    updateAthleteActiveField = new UpdateAthleteActiveFieldService(
      fakeAthletesRepository
    );
  });

  it('should be able to update athlete\'s active status', async () => {
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

    const updatedAthlete = await updateAthleteActiveField.execute({
      active: false,
      athlete_id: athlete.id,
    });

    expect(updatedAthlete.active).toBeFalsy();
  });

  it('should throw an exception if athlete is not found', async () => {
    await expect(
      updateAthleteActiveField.execute({
        active: false,
        athlete_id: 'id inválido',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
