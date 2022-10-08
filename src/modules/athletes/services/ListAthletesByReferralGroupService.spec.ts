import FakeAthleteGroupsRepository from "@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository";
import FakeSubscriptionsRepository from "@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository";
import FakeAthletesRepository from "../repositories/fakes/FakeAthletesRepository";
import ListAthletesByReferralGroupService from "./ListAthletesByReferralGroupService";

let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let listAthletesByReferralGroup: ListAthletesByReferralGroupService;

describe('ListAthletesByReferralGroupService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    listAthletesByReferralGroup = new ListAthletesByReferralGroupService(
      fakeAthletesRepository,
    );
  });

  it('should list athletes by referral groups using referral group id',
    async () => {
      const athleteGroup = await fakeAthleteGroupsRepository.create({
        title: 'Grupo de testes',
        description: 'Descrição grupo de testes',
      });

      const subscription = await fakeSubscriptionsRepository.create({
        title: 'Plano de testes',
        value: 100,
      });

      const athlete1 = await fakeAthletesRepository.create({
        name: 'Aluno de teste',
        phoneNumber: '1',
        birthDate: new Date(1980, 10, 10),
        athleteGroup,
        subscription,
      });

      Object.assign(athlete1, { referral_group_id: '123' });

      const findAthletes = await listAthletesByReferralGroup.execute({
        referral_group_id: '123',
      });

      expect(findAthletes).toEqual([athlete1]);
    });
});
