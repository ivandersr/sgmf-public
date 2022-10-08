import AppError from '@shared/errors/AppError';
import FakeAthleteGroupsRepository from '@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository';
import FakeSubscriptionsRepository from '@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository';
import FakeReferralGroupsRepository from '@modules/referralgroups/repositories/fakes/FakeReferralGroupsRepository';
import FakeAthletesRepository from '../repositories/fakes/FakeAthletesRepository';
import UpdateAthleteService from './UpdateAthleteService';

let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let fakeReferralGroupsRepository: FakeReferralGroupsRepository;
let updateAthlete: UpdateAthleteService;

describe('UpdateAthleteService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    fakeReferralGroupsRepository = new FakeReferralGroupsRepository();
    updateAthlete = new UpdateAthleteService(
      fakeAthletesRepository,
      fakeSubscriptionsRepository,
      fakeAthleteGroupsRepository,
      fakeReferralGroupsRepository
    );
  });

  it('should be able to update athlete\'s details', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes',
    });

    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const referralGroup = await fakeReferralGroupsRepository.create({
      title: 'Grupo de indicações de testes',
    })

    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1995, 9, 9),
      subscription,
      athleteGroup,
    });

    const updatedAthlete = await updateAthlete.execute({
      id: athlete.id,
      birthDate: '25/10/1995',
      name: 'Aluno de testes atualizado',
      phoneNumber: '2',
      athlete_group_id: athleteGroup.id,
      subscription_id: subscription.id,
      referral_group_id: referralGroup.id,
      active: true,
    });

    expect(updatedAthlete.birthDate).toEqual(new Date(1995, 9, 25));
    expect(updatedAthlete.name).toBe('Aluno de testes atualizado');
    expect(updatedAthlete.phoneNumber).toBe('2');
    expect(updatedAthlete.subscription).toEqual(subscription);
    expect(updatedAthlete.athleteGroup).toEqual(athleteGroup);
    expect(updatedAthlete.referralGroup).toEqual(referralGroup);
    expect(updatedAthlete.active).toBeTruthy();
  });

  it('should be able to update athlete\'s details without referral group',
    async () => {
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
        birthDate: new Date(1995, 9, 9),
        subscription,
        athleteGroup,
      });

      const updatedAthlete = await updateAthlete.execute({
        id: athlete.id,
        birthDate: '25/10/1995',
        name: 'Aluno de testes atualizado',
        phoneNumber: '2',
        athlete_group_id: athleteGroup.id,
        subscription_id: subscription.id,
        active: true,
      });

      expect(updatedAthlete.referralGroup).toBeFalsy();
    });

  it('should throw an exception if athlete is not found', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes',
    });

    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    await expect(
      updateAthlete.execute({
        id: 'id inválido',
        name: 'teste',
        phoneNumber: 'teste',
        birthDate: '25/10/1995',
        subscription_id: subscription.id,
        athlete_group_id: athleteGroup.id,
        active: true,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if name, phone number or birth date is missing',
    async () => {
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
        birthDate: new Date(1995, 9, 9),
        subscription,
        athleteGroup,
      });

      await expect(
        updateAthlete.execute({
          id: athlete.id,
          name: '',
          phoneNumber: 'teste',
          birthDate: '25/10/1995',
          subscription_id: subscription.id,
          athlete_group_id: athleteGroup.id,
          active: true,
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        updateAthlete.execute({
          id: athlete.id,
          name: 'teste',
          phoneNumber: '',
          birthDate: '25/10/1995',
          subscription_id: subscription.id,
          athlete_group_id: athleteGroup.id,
          active: true,
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        updateAthlete.execute({
          id: athlete.id,
          name: 'teste',
          phoneNumber: 'teste',
          birthDate: '',
          subscription_id: subscription.id,
          athlete_group_id: athleteGroup.id,
          active: true,
        })
      ).rejects.toBeInstanceOf(AppError);
    });

  it('should throw an exception if subscription is not found', async () => {
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
      birthDate: new Date(1995, 9, 9),
      subscription,
      athleteGroup,
    });

    await expect(
      updateAthlete.execute({
        id: athlete.id,
        name: 'teste',
        phoneNumber: 'teste',
        birthDate: '25/10/1995',
        subscription_id: 'id inválido',
        athlete_group_id: athleteGroup.id,
        active: true,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if athlete group is not found', async () => {
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
      birthDate: new Date(1995, 9, 9),
      subscription,
      athleteGroup,
    });

    await expect(
      updateAthlete.execute({
        id: athlete.id,
        name: 'teste',
        phoneNumber: 'teste',
        birthDate: '25/10/1995',
        subscription_id: subscription.id,
        athlete_group_id: 'id inválido',
        active: true,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if referral group is not found', async () => {
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
      birthDate: new Date(1995, 9, 9),
      subscription,
      athleteGroup,
    });

    await expect(
      updateAthlete.execute({
        id: athlete.id,
        name: 'teste',
        phoneNumber: 'teste',
        birthDate: '25/10/1995',
        subscription_id: subscription.id,
        athlete_group_id: athleteGroup.id,
        referral_group_id: 'id inválido',
        active: true,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

});
