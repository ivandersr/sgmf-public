import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUpdateAthleteGroupDTO from "../dtos/IUpdateAthleteGroupDTO";
import AthleteGroup from "../infra/typeorm/entities/AthleteGroup";
import IAthleteGroupsRepository from "../repositories/IAthleteGroupsRepository";

@injectable()
class UpdateAthleteGroupService {
  constructor(
    @inject('AthleteGroupsRepository')
    private athleteGroupsRepository: IAthleteGroupsRepository,
  ) { }

  public async execute(
    { id, title, description }: IUpdateAthleteGroupDTO
  ): Promise<AthleteGroup> {
    if (!id) {
      throw new AppError(400, 'Id da categoria obrigatório');
    }

    if (!title || !description) {
      throw new AppError(400, 'Título e descrição obrigatórios');
    }

    const athleteGroup = await this.athleteGroupsRepository.findOne({ id });

    if (!athleteGroup) {
      throw new AppError(404, 'Categoria não encontrada');
    }

    Object.assign(athleteGroup, { title, description });

    await this.athleteGroupsRepository.save(athleteGroup);

    return athleteGroup;
  }
}

export default UpdateAthleteGroupService;
