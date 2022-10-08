import ICreateAthleteGroupDTO from "@modules/athletegroups/dtos/ICreateAthleteGroupDTO";
import IFindAthleteGroupDTO from "@modules/athletegroups/dtos/IFindAthleteGroupDTO";
import AthleteGroup from "@modules/athletegroups/infra/typeorm/entities/AthleteGroup";
import { v4 } from "uuid";
import IAthleteGroupsRepository from "../IAthleteGroupsRepository";

class FakeAthleteGroupsRepository implements IAthleteGroupsRepository {
  private athleteGroups: AthleteGroup[] = [];

  public async create(
    { title, description }: ICreateAthleteGroupDTO
  ): Promise<AthleteGroup> {
    const athleteGroup = new AthleteGroup();

    Object.assign(athleteGroup, { id: v4(), title, description });

    this.athleteGroups.push(athleteGroup);

    return athleteGroup;
  }

  public async find(): Promise<AthleteGroup[]> {
    return this.athleteGroups;
  }

  public async save(data: AthleteGroup): Promise<AthleteGroup> {
    const athleteGroupIndex = this.athleteGroups.findIndex(
      athleteGroup => athleteGroup.id === data.id
    );

    if (athleteGroupIndex !== -1) {
      this.athleteGroups[athleteGroupIndex] = data;
    }

    this.athleteGroups.push(data);

    return data;
  }

  public async findOne(
    { id }: IFindAthleteGroupDTO
  ): Promise<AthleteGroup | undefined> {
    const athleteGroup = this.athleteGroups.find(group => group.id === id);

    return athleteGroup;
  }
}

export default FakeAthleteGroupsRepository;
