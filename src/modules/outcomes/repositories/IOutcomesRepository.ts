import ICreateOutcomeDTO from "../dtos/ICreateOutcomeDTO";
import IDeleteOutcomeDTO from "../dtos/IDeleteOutcomeDTO";
import { IRequest } from "../dtos/IFindByMonthDTO";
import IFindManyByDescriptionOptionsDTO from "../dtos/IFindManyByDescriptionOptionsDTO";
import IFindManyOptionsDTO from "../dtos/IFindManyOptionsDTO";
import IFindOutcomeDTO from "../dtos/IFindOutcomeDTO";
import Outcome from "../infra/typeorm/entities/Outcome";

export default interface IOutcomesRepository {
  findOne(data: IFindOutcomeDTO): Promise<Outcome | undefined>;
  findByDescription(
    data: IFindManyByDescriptionOptionsDTO
  ): Promise<[Outcome[], number]>;
  findAndCount(options?: IFindManyOptionsDTO): Promise<[Outcome[], number]>;
  create(data: ICreateOutcomeDTO): Promise<Outcome>;
  save(data: Outcome): Promise<Outcome>;
  findByMonth(data: IRequest): Promise<Outcome[]>;
  delete(data: IDeleteOutcomeDTO): Promise<void>;
}
