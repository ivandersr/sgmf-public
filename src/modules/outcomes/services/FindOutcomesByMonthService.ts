import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IRequest, IResponse } from "../dtos/IFindByMonthDTO";
import IOutcomesRepository from "../repositories/IOutcomesRepository";

@injectable()
class FindOutcomesByMonthService {
  constructor(
    @inject('OutcomesRepository')
    private outcomesRepository: IOutcomesRepository,
  ) { }

  public async execute(
    { month, year }: IRequest
  ): Promise<IResponse> {
    if (!month || !year) {
      throw new AppError(400, 'Mês e ano obrigatórios');
    }

    const outcomes = await this.outcomesRepository.findByMonth({
      month,
      year,
    });

    const total = outcomes.reduce(
      (totalValue, outcome) => { return totalValue + Number(outcome.value) },
      0
    );

    return { outcomes, total };
  }
}

export default FindOutcomesByMonthService;
