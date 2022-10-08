import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUpdateReferralGroupDTO from "../dtos/IUpdateReferralGroupDTO";
import ReferralGroup from "../infra/typeorm/entities/ReferralGroup";
import IReferralGroupsRepository from "../repositories/IReferralGroupsRepository";

@injectable()
class UpdateReferralGroupService {
  constructor(
    @inject('ReferralGroupsRepository')
    private referralGroupsRepository: IReferralGroupsRepository
  ) { }

  public async execute(
    { id, title }: IUpdateReferralGroupDTO
  ): Promise<ReferralGroup> {
    if (!id) {
      throw new AppError(400, 'Id obrigatório')
    }

    if (!title) {
      throw new AppError(400, 'Título obrigatório');
    }

    const referralGroup = await this.referralGroupsRepository.findOne({ id });

    if (!referralGroup) {
      throw new AppError(404, 'Grupo de indicações não encontrado');
    }

    Object.assign(referralGroup, { title });

    await this.referralGroupsRepository.save(referralGroup);

    return referralGroup;
  }
}

export default UpdateReferralGroupService;
