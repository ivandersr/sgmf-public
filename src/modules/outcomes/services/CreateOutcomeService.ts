import AppError from "@shared/errors/AppError";
import Formatter from "@shared/utils/Formatter";
import { inject, injectable } from "tsyringe";
import ICreateOutcomeServiceDTO from "../dtos/ICreateOutcomeServiceDTO";
import Outcome from "../infra/typeorm/entities/Outcome";
import IOutcomesRepository from "../repositories/IOutcomesRepository";

@injectable()
class CreateOutcomeService {
  constructor(
    @inject('OutcomesRepository')
    private outcomesRepository: IOutcomesRepository,
  ) { }

  public async execute({
    description,
    value,
    dueDate,
  }: ICreateOutcomeServiceDTO): Promise<Outcome> {
    if (!description) {
      throw new AppError(400, 'Descrição obrigatória (description)');
    }

    if (!dueDate) {
      throw new AppError(400, 'Data da despesa obrigatória (dueDate)');
    }

    if (value < 0) {
      throw new AppError(400, 'Valor inválido');
    }

    const parsedDueDate = Formatter.formatDate(dueDate);

    const outcome = await this.outcomesRepository.create({
      description,
      value,
      dueDate: parsedDueDate,
    });

    return outcome;
  }
}

export default CreateOutcomeService;
