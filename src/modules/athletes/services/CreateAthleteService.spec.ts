import FakeAthleteGroupsRepository from "@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository";
import FakeSubscriptionsRepository from "@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository";
import AppError from "@shared/errors/AppError";
import FakeAthletesRepository from "../repositories/fakes/FakeAthletesRepository"
import CreateAthleteService from "./CreateAthleteService";

let fakeAthletesRepository: FakeAthletesRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let createAthlete: CreateAthleteService;

describe('CreateAthleteService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new FakeAthletesRepository;
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository;
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository;
    createAthlete = new CreateAthleteService(
      fakeAthletesRepository,
      fakeSubscriptionsRepository,
      fakeAthleteGroupsRepository
    );
  });

  it('should be able to create a new athlete', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos de testes',
      description: 'Descrição grupo de alunos para testes',
    });

    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });
    const athlete = await createAthlete.execute({
      name: 'Aluno de testes',
      birthDate: '25/07/1991',
      phoneNumber: '99999999',
      athlete_group_id: athleteGroup.id,
      subscription_id: subscription.id,
    });

    const expectedBirthDate = new Date(1991, 6, 25);

    expect(athlete).toHaveProperty('id');
    expect(athlete.name).toBe('Aluno de testes');
    expect(athlete.subscription).toEqual(subscription);
    expect(athlete.birthDate).toEqual(expectedBirthDate);
  });

  it('should not be able to create an athlete without name', async () => {
    await expect(createAthlete.execute({
      name: '',
      birthDate: '25/07/1991',
      phoneNumber: '99999999',
      athlete_group_id: '',
      subscription_id: '',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an athlete without birth date', async () => {
    await expect(createAthlete.execute({
      name: 'Aluno de testes',
      birthDate: '',
      phoneNumber: '99999999',
      athlete_group_id: '',
      subscription_id: '',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an athlete without phone number',
    async () => {
      await expect(createAthlete.execute({
        name: 'Aluno de testes',
        birthDate: '25/07/1991',
        phoneNumber: '',
        athlete_group_id: '',
        subscription_id: '',
      })).rejects.toBeInstanceOf(AppError);
    });

  it('should not be able to create an athlete without athlete group id',
    async () => {
      await expect(createAthlete.execute({
        name: 'Aluno de testes',
        birthDate: '25/07/1991',
        phoneNumber: '99999999',
        athlete_group_id: '',
        subscription_id: 'id de teste',
      })).rejects.toBeInstanceOf(AppError);
    });

  it('should not be able to create an athlete without athlete group id',
    async () => {
      const athleteGroup = await fakeAthleteGroupsRepository.create({
        title: 'Grupo de alunos de testes',
        description: 'Descrição grupo de alunos para testes',
      });
      await expect(createAthlete.execute({
        name: 'Aluno de testes',
        birthDate: '25/07/1991',
        phoneNumber: '99999999',
        athlete_group_id: athleteGroup.id,
        subscription_id: '',
      })).rejects.toBeInstanceOf(AppError);
    });

  it('should not be able to create an athlete with invalid subscription id',
    async () => {
      const athleteGroup = await fakeAthleteGroupsRepository.create({
        title: 'Grupo de alunos de testes',
        description: 'Descrição grupo de alunos para testes',
      });
      await expect(createAthlete.execute({
        name: 'Aluno de testes',
        birthDate: '25/07/1991',
        phoneNumber: '99999999',
        athlete_group_id: athleteGroup.id,
        subscription_id: 'id inválido',
      })).rejects.toBeInstanceOf(AppError);
    });

  it('should not be able to create an athlete with invalid athlete group id',
    async () => {
      const subscription = await fakeSubscriptionsRepository.create({
        title: 'Plano de testes',
        value: 100,
      });
      await expect(createAthlete.execute({
        name: 'Aluno de testes',
        birthDate: '25/07/1991',
        phoneNumber: '99999999',
        athlete_group_id: 'id inválido',
        subscription_id: subscription.id,
      })).rejects.toBeInstanceOf(AppError);
    });
});

