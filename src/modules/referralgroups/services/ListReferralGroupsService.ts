import { inject, injectable } from "tsyringe";
import ReferralGroup from "../infra/typeorm/entities/ReferralGroup";
import IReferralGroupsRepository from "../repositories/IReferralGroupsRepository";

@injectable()
class FindReferralGroupsService {
  constructor(
    @inject('ReferralGroupsRepository')
    private referralGroupsRepository: IReferralGroupsRepository,
  ) { }

  public async execute(): Promise<ReferralGroup[]> {
    const referralGroups = await this.referralGroupsRepository.find();

    return referralGroups;
  }
}

export default FindReferralGroupsService;
