import FakeAthleteGroupsRepository from "@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository";
import FakeReferralGroupsRepository from "@modules/referralgroups/repositories/fakes/FakeReferralGroupsRepository";
import FakeSubscriptionsRepository from "@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository";
import AppError from "@shared/errors/AppError";
import Athlete from "../infra/typeorm/entities/Athlete";
import FakeAthletesRepository from "../repositories/fakes/FakeAthletesRepository";
import ListActiveAthletesByReferralGroupService from "./ListActiveAthletesByReferralGroupService"

let listActiveAthletesByRefGroup: ListActiveAthletesByReferralGroupService;
let fakeAthletesRepository: FakeAthletesRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeReferralGroupsRepository: FakeReferralGroupsRepository;

describe('ListActiveAthletesByReferralGroupService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeReferralGroupsRepository = new FakeReferralGroupsRepository();
    listActiveAthletesByRefGroup = new ListActiveAthletesByReferralGroupService(
      fakeAthletesRepository
    );
  });

  it('should be able to list active athletes in an specific referral group',
    async () => {
      const subscription = await fakeSubscriptionsRepository.create({
        title: 'Plano de testes',
        value: 100,
      });

      const athleteGroup = await fakeAthleteGroupsRepository.create({
        title: 'Grupo de testes',
        description: 'Grupo utilizado em testes',
      });

      const athletes: Athlete[] = [];

      const athlete1 = await fakeAthletesRepository.create({
        name: 'Aluno de testes 1',
        phoneNumber: '1',
        birthDate: new Date(1995, 5, 5),
        athleteGroup,
        subscription,
      });


      const referralGroup = await fakeReferralGroupsRepository.create({
        title: athlete1.name,
      });

      Object.assign(athlete1, { referral_group_id: referralGroup.id });

      athletes.push(athlete1);

      await fakeAthletesRepository.save(athlete1);

      const findActiveAthletes = await listActiveAthletesByRefGroup.execute({
        referral_group_id: referralGroup.id,
      });

      expect(findActiveAthletes).toEqual({ athletes, count: 1 });
    });

  it('should throw an exception if id is not informed', async () => {
    await
      expect(listActiveAthletesByRefGroup.execute({ referral_group_id: '' }))
        .rejects.toBeInstanceOf(AppError);
  })
});
