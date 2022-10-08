import ICreateAthleteGroupDTO from '../dtos/ICreateAthleteGroupDTO';
import IFindAthleteGroupDTO from '../dtos/IFindAthleteGroupDTO';
import AthleteGroup from '../infra/typeorm/entities/AthleteGroup';

export default interface IAthleteGroupsRepository {
  create(data: ICreateAthleteGroupDTO): Promise<AthleteGroup>;
  find(): Promise<AthleteGroup[]>;
  findOne(data: IFindAthleteGroupDTO): Promise<AthleteGroup | undefined>;
  save(data: AthleteGroup): Promise<AthleteGroup>;
}
