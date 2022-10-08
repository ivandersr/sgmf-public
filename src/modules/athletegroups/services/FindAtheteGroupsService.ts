import { inject, injectable } from "tsyringe";
import IAthleteGroupsRepository from "../repositories/IAthleteGroupsRepository";
import AthleteGroup from '../infra/typeorm/entities/AthleteGroup';

@injectable()
class FindAthleteGroupsService {
  constructor(
    @inject('AthleteGroupsRepository')
    private athleteGroupsRepository: IAthleteGroupsRepository
  ) { }

  public async execute(): Promise<AthleteGroup[]> {
    const athleteGroups = await this.athleteGroupsRepository.find();

    return athleteGroups;
  }
}

export default FindAthleteGroupsService;
