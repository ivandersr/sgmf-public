import { v4 } from 'uuid';
import IFindReferralGroupDTO from "@modules/referralgroups/dtos/IFindReferralGroupDTO";
import ReferralGroup from "@modules/referralgroups/infra/typeorm/entities/ReferralGroup";
import ICreateReferralGroupDTO from '@modules/referralgroups/dtos/ICreateReferralGroupDTO';
import IReferralGroupsRepository from "../IReferralGroupsRepository";

class FakeReferralGroupsRepository implements IReferralGroupsRepository {
  private referralGroups: ReferralGroup[] = [];

  public async find(): Promise<ReferralGroup[]> {
    return this.referralGroups;
  }

  public async findOne(
    { id }: IFindReferralGroupDTO
  ): Promise<ReferralGroup | undefined> {
    const referralGroup = this.referralGroups.find(
      refGroup => refGroup.id === id
    );

    return referralGroup;
  }

  public async create(
    { title }: ICreateReferralGroupDTO
  ): Promise<ReferralGroup> {
    const referralGroup = new ReferralGroup();

    Object.assign(referralGroup, {
      id: v4(),
      title,
    });

    this.referralGroups.push(referralGroup);

    return referralGroup;
  }

  public async save(data: ReferralGroup): Promise<ReferralGroup> {
    const findIndex = this.referralGroups.findIndex(
      refGroup => refGroup.id === data.id
    );

    if (findIndex !== -1) {
      Object.assign(this.referralGroups[findIndex], data);

      return this.referralGroups[findIndex];
    }

    this.referralGroups.push(data);

    return data;
  }
}

export default FakeReferralGroupsRepository;
