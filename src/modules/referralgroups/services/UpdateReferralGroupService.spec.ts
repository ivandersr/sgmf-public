import AppError from "@shared/errors/AppError";
import FakeReferralGroupsRepository from "../repositories/fakes/FakeReferralGroupsRepository";
import UpdateReferralGroupService from './UpdateReferralGroupService';

let fakeReferralGroupsRepository: FakeReferralGroupsRepository;
let updateReferralGroup: UpdateReferralGroupService;
describe('UpdateReferralGroupService', () => {
  beforeEach(() => {
    fakeReferralGroupsRepository = new FakeReferralGroupsRepository();
    updateReferralGroup = new UpdateReferralGroupService(
      fakeReferralGroupsRepository
    );
  });

  it('should be able to update a referral group\'s data', async () => {
    const referralGroup = await fakeReferralGroupsRepository.create({
      title: 'Grupo de indicações'
    });

    const updatedReferralGroup = await updateReferralGroup.execute({
      id: referralGroup.id,
      title: 'Grupo de indicações atualizado'
    });

    expect(updatedReferralGroup.title).toBe('Grupo de indicações atualizado');
    expect(updatedReferralGroup.id).toBe(referralGroup.id);
  });

  it('should throw an exception if referral group is not found', async () => {
    await expect(
      updateReferralGroup.execute({
        id: 'id inválido',
        title: 'Grupo de indicações atualizado'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if id field is empty', async () => {
    await expect(
      updateReferralGroup.execute({
        id: '',
        title: 'Grupo de indicações atualizado'
      })
    ).rejects.toBeInstanceOf(AppError)
  });

  it('should throw an exception if title field is empty', async () => {
    const referralGroup = await fakeReferralGroupsRepository.create({
      title: 'Grupo de indicações',
    });

    await expect(
      updateReferralGroup.execute({
        id: referralGroup.id,
        title: '',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
