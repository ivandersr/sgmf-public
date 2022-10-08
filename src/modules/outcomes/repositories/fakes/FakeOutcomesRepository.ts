import ICreateOutcomeDTO from "@modules/outcomes/dtos/ICreateOutcomeDTO";
import IFindManyByDescriptionOptionsDTO from "@modules/outcomes/dtos/IFindManyByDescriptionOptionsDTO";
import IFindManyOptionsDTO from "@modules/outcomes/dtos/IFindManyOptionsDTO";
import IFindOutcomeDTO from "@modules/outcomes/dtos/IFindOutcomeDTO";
import Outcome from "@modules/outcomes/infra/typeorm/entities/Outcome";
import { v4 } from "uuid";
import { IRequest } from "@modules/outcomes/dtos/IFindByMonthDTO";
import IDeleteOutcomeDTO from "@modules/outcomes/dtos/IDeleteOutcomeDTO";
import IOutcomesRepository from "../IOutcomesRepository";

class FakeOutcomesRepository implements IOutcomesRepository {
  private outcomes: Outcome[] = [];

  public async findOne({ id }: IFindOutcomeDTO): Promise<Outcome | undefined> {
    const findOutcome = this.outcomes.find(outcome => outcome.id === id);

    return findOutcome;
  }

  public async findAndCount(
    options?: IFindManyOptionsDTO
  ): Promise<[Outcome[], number]> {
    if (options) {
      const { skip, take } = options;

      if (skip && take) {
        const findOutcomes = this.outcomes.slice(skip, skip + take);
        return [findOutcomes, this.outcomes.length]
      }
    }
    return [this.outcomes, this.outcomes.length];
  }

  public async findByDescription(
    { text, skip, take, order }: IFindManyByDescriptionOptionsDTO
  ): Promise<[Outcome[], number]> {
    if (skip && take) {
      const filteredOutcomes = this.outcomes.filter(
        outcome => outcome.description.toLocaleLowerCase().includes(
          text.toLowerCase()
        )
      );
      const findOutcomes = filteredOutcomes.slice(skip, skip + take);

      return [findOutcomes, this.outcomes.length]
    }

    const filteredOutcomes = this.outcomes.filter(
      outcome => outcome.description.toLocaleLowerCase().includes(
        text.toLowerCase()
      )
    );

    if (order) {
      filteredOutcomes.sort((a, b) => a.description <= b.description ? 1 : -1);
    }

    return [filteredOutcomes, filteredOutcomes.length];
  }

  public async findByMonth(
    { month, year }: IRequest
  ): Promise<Outcome[]> {
    const outcomes = this.outcomes.filter(
      outcome => outcome.dueDate.getMonth() === Number(month) - 1
    ).filter(
      outcome => outcome.dueDate.getFullYear() === Number(year)
    );

    return outcomes;
  }

  public async create({
    description,
    value,
    dueDate,
  }: ICreateOutcomeDTO): Promise<Outcome> {
    const newOutcome = new Outcome();

    Object.assign(newOutcome, {
      id: v4(),
      description,
      value,
      dueDate,
    });

    this.outcomes.push(newOutcome);

    return newOutcome;
  }

  public async save(data: Outcome): Promise<Outcome> {
    const outcomeIndex = this.outcomes.findIndex(
      outcome => outcome.id === data.id
    );

    if (outcomeIndex !== -1) {
      this.outcomes[outcomeIndex] = data;
      return data;
    }

    this.outcomes.push(data);
    return data;
  }

  public async delete({ id }: IDeleteOutcomeDTO): Promise<void> {
    const findIndex = this.outcomes.findIndex(outcome => outcome.id === id);

    this.outcomes.splice(findIndex, 1);
  }
}

export default FakeOutcomesRepository;
