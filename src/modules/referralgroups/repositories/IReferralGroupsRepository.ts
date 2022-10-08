import ICreateReferralGroupDTO from "../dtos/ICreateReferralGroupDTO";
import IFindReferralGroupDTO from "../dtos/IFindReferralGroupDTO";
import ReferralGroup from "../infra/typeorm/entities/ReferralGroup";

export default interface IReferralGroupsRepository {
  create(data: ICreateReferralGroupDTO): Promise<ReferralGroup>;
  save(data: ReferralGroup): Promise<ReferralGroup>;
  find(): Promise<ReferralGroup[]>
  findOne(data: IFindReferralGroupDTO): Promise<ReferralGroup | undefined>;
}
