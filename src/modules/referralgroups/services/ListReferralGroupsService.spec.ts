import FakeReferralGroupsRepository from "../repositories/fakes/FakeReferralGroupsRepository";
import ListReferralGroupsService from "./ListReferralGroupsService";

let fakeReferralGroupsRepository: FakeReferralGroupsRepository;
let listReferralGroups: ListReferralGroupsService;

describe('ListReferralGroupsService', () => {
  beforeEach(() => {
    fakeReferralGroupsRepository = new FakeReferralGroupsRepository();
    listReferralGroups = new ListReferralGroupsService(
      fakeReferralGroupsRepository,
    );
  });

  it('should be able to list referral groups', async () => {
    const referralGroup = await fakeReferralGroupsRepository.create({

      title: 'Grupo de indicações de testes',
    });

    const findRefGroups = await listReferralGroups.execute();

    expect(findRefGroups).toEqual([referralGroup]);
  });
});
