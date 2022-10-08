import AppError from "@shared/errors/AppError";
import FakeReferralGroupsRepository from "../repositories/fakes/FakeReferralGroupsRepository";
import FindReferralGroupService from "./FindReferralGroupService";

let fakeReferralGroupsRepository: FakeReferralGroupsRepository;
let findReferralGroup: FindReferralGroupService;

describe('FindReferralGroupService', () => {
  beforeEach(() => {
    fakeReferralGroupsRepository = new FakeReferralGroupsRepository();
    findReferralGroup = new FindReferralGroupService(
      fakeReferralGroupsRepository,
    )
  });

  it('should be able to list referral groups', async () => {
    const referralGroup = await fakeReferralGroupsRepository.create({
      title: 'Grupo de indicações de testes',
    });

    const findRefGroup = await findReferralGroup.execute({
      id: referralGroup.id,
    });

    expect(findRefGroup).toEqual(referralGroup);
  });

  it('should throw an exception if referral group id is empty', async () => {
    await expect(
      findReferralGroup.execute({
        id: ''
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if referral group is not found', async () => {
    await expect(
      findReferralGroup.execute({
        id: 'id inválido',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
