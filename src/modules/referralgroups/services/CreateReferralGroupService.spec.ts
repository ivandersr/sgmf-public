import AppError from '@shared/errors/AppError';
import FakeAthleteGroupsRepository from '@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository';
import FakeSubscriptionsRepository from '@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository';
import FakeAthletesRepository from '@modules/athletes/repositories/fakes/FakeAthletesRepository';
import FakeReferralGroupsRepository from '../repositories/fakes/FakeReferralGroupsRepository';
import CreateReferralGroupService from './CreateReferralGroupService';

let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let fakeAthletesRepository: FakeAthletesRepository;
let fakeReferralGroupsRepository: FakeReferralGroupsRepository;
let createReferralGroup: CreateReferralGroupService;

describe('CreateReferralGroupService', () => {
  beforeEach(() => {
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeReferralGroupsRepository = new FakeReferralGroupsRepository();
    createReferralGroup = new CreateReferralGroupService(
      fakeReferralGroupsRepository,
      fakeAthletesRepository,
    );
  });

  it('should be able to create a referral group from athlete id', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes',
    });

    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1994, 1, 1),
      subscription,
      athleteGroup,
    });

    const referralGroup = await createReferralGroup.execute({
      referral_id: athlete.id,
    });

    expect(referralGroup).toHaveProperty('id');
  });

  it('should throw an exception if referral id is empty', async () => {
    await expect(
      createReferralGroup.execute({
        referral_id: '',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if referral athlete is not found', async () => {
    await expect(
      createReferralGroup.execute({
        referral_id: 'id inválido',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
