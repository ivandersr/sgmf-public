import AppError from '@shared/errors/AppError';
import FakeReferralGroupsRepository from '@modules/referralgroups/repositories/fakes/FakeReferralGroupsRepository';
import FakeSubscriptionsRepository from '@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository';
import FakeAthleteGroupsRepository from '@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository';
import FakeAthletesRepository from '../repositories/fakes/FakeAthletesRepository';
import UpdateAthleteReferralGroupService from './UpdateAthleteReferralGroupService';

let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeReferralGroupsRepository: FakeReferralGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let updateAthleteReferralGroup: UpdateAthleteReferralGroupService;

describe('UpdateAthleteReferralGroupService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeReferralGroupsRepository = new FakeReferralGroupsRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    updateAthleteReferralGroup = new UpdateAthleteReferralGroupService(
      fakeAthletesRepository,
      fakeReferralGroupsRepository,
    );
  });

  it('should be able to update an athlete\'s referral group', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes',
    });

    await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1997, 11, 11),
      subscription,
      athleteGroup,
    });

    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1997, 11, 11),
      subscription,
      athleteGroup,
    });

    const referralGroup = await fakeReferralGroupsRepository.create({
      title: 'Grupo de indicações de testes',
    });

    const updatedAthlete = await updateAthleteReferralGroup.execute({
      id: athlete.id,
      referral_group_id: referralGroup.id,
    });

    expect(updatedAthlete.referral_group_id).toBe(referralGroup.id);
  });

  it('should throw an exception if athlete is not found', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes',
    });

    await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1997, 11, 11),
      subscription,
      athleteGroup,
    });

    const referralGroup = await fakeReferralGroupsRepository.create({
      title: 'Grupo de indicações de testes',
    });

    await expect(
      updateAthleteReferralGroup.execute({
        id: 'id inválido',
        referral_group_id: referralGroup.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if referral group is not found', async () => {
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
      birthDate: new Date(1997, 11, 11),
      subscription,
      athleteGroup,
    });

    await expect(
      updateAthleteReferralGroup.execute({
        id: athlete.id,
        referral_group_id: 'id inválido',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

