import AppError from "@shared/errors/AppError";
import Formatter from "@shared/utils/Formatter";
import { inject, injectable } from "tsyringe";
import IUpdateOutcomeDTO from "../dtos/IUpdateOutcomeDTO";
import Outcome from "../infra/typeorm/entities/Outcome";
import IOutcomesRepository from "../repositories/IOutcomesRepository";

@injectable()
class UpdateOutcomeService {
  constructor(
    @inject('OutcomesRepository')
    private outcomesRepository: IOutcomesRepository,
  ) { }

  public async execute({
    id,
    description,
    value,
    dueDate,
  }: IUpdateOutcomeDTO): Promise<Outcome> {
    if (!id) {
      throw new AppError(400, 'Id obrigatório');
    }

    if (!description || !dueDate) {
      throw new AppError(400, 'Descrição e data obrigatórias');
    }

    if (value < 0) {
      throw new AppError(400, 'Valor inválido');
    }

    const outcome = await this.outcomesRepository.findOne({ id });

    if (!outcome) {
      throw new AppError(404, 'Despesa não encontrada');
    }

    const parsedDueDate = Formatter.formatDate(dueDate);

    Object.assign(outcome, {
      description,
      value,
      dueDate: parsedDueDate,
    });

    await this.outcomesRepository.save(outcome);

    return outcome;
  }
}

export default UpdateOutcomeService;
