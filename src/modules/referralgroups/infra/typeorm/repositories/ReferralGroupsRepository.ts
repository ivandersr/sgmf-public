import ICreateReferralGroupDTO from "@modules/referralgroups/dtos/ICreateReferralGroupDTO";
import IFindReferralGroupDTO from "@modules/referralgroups/dtos/IFindReferralGroupDTO";
import IReferralGroupsRepository from "@modules/referralgroups/repositories/IReferralGroupsRepository";
import { getRepository, Repository } from "typeorm";
import ReferralGroup from "../entities/ReferralGroup";

class ReferralGroupsRepository implements IReferralGroupsRepository {
  private ormRepository: Repository<ReferralGroup>;

  constructor() {
    this.ormRepository = getRepository(ReferralGroup);
  }

  public async find(): Promise<ReferralGroup[]> {
    const referralGroups = await this.ormRepository.find();

    return referralGroups;
  }

  public async findOne(
    { id }: IFindReferralGroupDTO
  ): Promise<ReferralGroup | undefined> {
    const referralGroup = await this.ormRepository.findOne(id);

    return referralGroup;
  }

  public async create(data: ICreateReferralGroupDTO): Promise<ReferralGroup> {
    const referralGroup = this.ormRepository.create(data);

    await this.ormRepository.save(referralGroup);

    return referralGroup;
  }

  public async save(data: ReferralGroup): Promise<ReferralGroup> {
    await this.ormRepository.save(data);

    return data;
  }
}

export default ReferralGroupsRepository;
