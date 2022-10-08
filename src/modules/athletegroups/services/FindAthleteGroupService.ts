import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IFindAthleteGroupDTO from "../dtos/IFindAthleteGroupDTO";
import AthleteGroup from "../infra/typeorm/entities/AthleteGroup";
import IAthleteGroupsRepository from "../repositories/IAthleteGroupsRepository";

@injectable()
class FindAthleteGroupService {
  constructor(
    @inject('AthleteGroupsRepository')
    private athleteGroupsRepository: IAthleteGroupsRepository,
  ) { }

  public async execute({ id }: IFindAthleteGroupDTO): Promise<AthleteGroup> {
    if (!id) {
      throw new AppError(400, 'Id da categoria obrigatório');
    }

    const athleteGroup = await this.athleteGroupsRepository.findOne({ id });

    if (!athleteGroup) {
      throw new AppError(404, 'Categoria não encontrada');
    }

    return athleteGroup;
  }
}

export default FindAthleteGroupService;
