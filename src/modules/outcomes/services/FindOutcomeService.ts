import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IFindOutcomeDTO from "../dtos/IFindOutcomeDTO";
import Outcome from "../infra/typeorm/entities/Outcome";
import IOutcomesRepository from "../repositories/IOutcomesRepository";

@injectable()
class FindOutcomeService {
  constructor(
    @inject('OutcomesRepository')
    private outcomesRepository: IOutcomesRepository,
  ) { }

  public async execute({ id }: IFindOutcomeDTO): Promise<Outcome | undefined> {
    if (!id) {
      throw new AppError(400, 'Id não pode ser vazio');
    }

    const outcome = await this.outcomesRepository.findOne({ id });

    return outcome;
  }
}

export default FindOutcomeService;
