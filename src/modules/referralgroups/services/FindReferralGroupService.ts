import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IFindReferralGroupDTO from "../dtos/IFindReferralGroupDTO";
import ReferralGroup from "../infra/typeorm/entities/ReferralGroup";
import IReferralGroupsRepository from "../repositories/IReferralGroupsRepository";

@injectable()
class FindReferralGroupService {
  constructor(
    @inject('ReferralGroupsRepository')
    private referralGroupsRepository: IReferralGroupsRepository,
  ) { }

  public async execute(
    { id }: IFindReferralGroupDTO
  ): Promise<ReferralGroup> {
    if (!id) {
      throw new AppError(400, 'Informe id do grupo de indicações');
    }

    const referralGroup = await this.referralGroupsRepository.findOne({
      id
    });

    if (!referralGroup) {
      throw new AppError(404, 'Grupo de indicações não encontrado');
    }

    return referralGroup;
  }
}

export default FindReferralGroupService;
