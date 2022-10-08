import FakeAthleteGroupsRepository from '@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository';
import FakeSubscriptionsRepository from '@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository';
import FakeAthletesRepository from '../repositories/fakes/FakeAthletesRepository';
import Athlete from '../infra/typeorm/entities/Athlete';
import CountActiveAthletesService from './CountActiveAthletesService';


let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let countActiveAthletes: CountActiveAthletesService;
let athletes: Athlete[];

describe('ListAthletesService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    countActiveAthletes = new CountActiveAthletesService(
      fakeAthletesRepository
    );
    athletes = [];
  });

  it('should be able to count active athletes', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes',
    });

    const athlete1 = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1992, 2, 2),
      subscription,
      athleteGroup,
    });

    const athlete2 = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1992, 2, 2),
      subscription,
      athleteGroup,
    });

    athletes.push(athlete1, athlete2);

    const countAthletes = await countActiveAthletes.execute();

    expect(countAthletes).toBe(2);
  });
});
