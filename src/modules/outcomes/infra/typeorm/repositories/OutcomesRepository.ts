import ICreateOutcomeDTO from "@modules/outcomes/dtos/ICreateOutcomeDTO";
import IDeleteOutcomeDTO from "@modules/outcomes/dtos/IDeleteOutcomeDTO";
import { IRequest } from "@modules/outcomes/dtos/IFindByMonthDTO";
import IFindManyByDescriptionOptionsDTO from "@modules/outcomes/dtos/IFindManyByDescriptionOptionsDTO";
import IFindManyOptionsDTO from "@modules/outcomes/dtos/IFindManyOptionsDTO";
import IFindOutcomeDTO from "@modules/outcomes/dtos/IFindOutcomeDTO";
import IOutcomesRepository from "@modules/outcomes/repositories/IOutcomesRepository";
import { getRepository, ILike, Raw, Repository } from "typeorm";
import Outcome from "../entities/Outcome";

class OutcomesRepository implements IOutcomesRepository {
  private ormRepository: Repository<Outcome>;

  constructor() {
    this.ormRepository = getRepository(Outcome);
  }

  public async findOne({ id }: IFindOutcomeDTO): Promise<Outcome | undefined> {
    const outcome = await this.ormRepository.findOne(id);

    return outcome;
  }

  public async findAndCount(
    options?: IFindManyOptionsDTO
  ): Promise<[Outcome[], number]> {
    const result = await this.ormRepository.findAndCount(options);

    return result;
  }

  public async findByDescription(
    { text, skip, take, order }: IFindManyByDescriptionOptionsDTO
  ): Promise<[Outcome[], number]> {
    const result = await this.ormRepository.findAndCount({
      where: { name: ILike(`%${text}%`) },
      skip,
      take,
      order,
    });

    return result;
  }

  public async findByMonth(
    { month, year }: IRequest
  ): Promise<Outcome[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const outcomes = await this.ormRepository.find({
      where: {
        dueDate: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        )
      },
      order: {
        dueDate: 'ASC',
      }
    });

    return outcomes;
  }

  public async create({
    description,
    value,
    dueDate,
  }: ICreateOutcomeDTO): Promise<Outcome> {
    const outcome = this.ormRepository.create({
      description,
      value,
      dueDate,
    });

    await this.ormRepository.save(outcome);
    return outcome;
  }

  public async save(data: Outcome): Promise<Outcome> {
    await this.ormRepository.save(data);

    return data;
  }

  public async delete({ id }: IDeleteOutcomeDTO): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default OutcomesRepository;
