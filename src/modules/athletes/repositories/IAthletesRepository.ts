import IActiveByReferralDTO from '../dtos/IActiveByReferralDTO';
import ICreateAthleteDTO from '../dtos/ICreateAthleteDTO';
import IFindAthleteDTO from '../dtos/IFindAthleteDTO';
import IFindByReferralGroupDTO from '../dtos/IFindByReferralGroupDTO';
import IFindManyByNameOptionsDTO from '../dtos/IFindManyByNameOptionsDTO';
import IFindManyOptionsDTO from '../dtos/IFindManyOptionsDTO';
import Athlete from '../infra/typeorm/entities/Athlete';

export default interface IAthletesRepository {
  find(): Promise<Athlete[]>;
  findByReferralGroup(data: IFindByReferralGroupDTO): Promise<Athlete[]>;
  findActiveByReferralGroup(
    data: IFindByReferralGroupDTO
  ): Promise<IActiveByReferralDTO>;
  findAndCount(options?: IFindManyOptionsDTO): Promise<[Athlete[], number]>;
  findByName(data: IFindManyByNameOptionsDTO): Promise<[Athlete[], number]>;
  findOne(data: IFindAthleteDTO): Promise<Athlete | undefined>;
  create(data: ICreateAthleteDTO): Promise<Athlete>;
  save(data: Athlete): Promise<Athlete>;
}
