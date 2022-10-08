import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IDeleteOutcomeDTO from "../dtos/IDeleteOutcomeDTO";
import IOutcomesRepository from "../repositories/IOutcomesRepository";

@injectable()
class DeleteOutcomeService {
  constructor(
    @inject('OutcomesRepository')
    private outcomesRepository: IOutcomesRepository,
  ) { }

  public async execute({ id }: IDeleteOutcomeDTO): Promise<void> {
    if (!id) {
      throw new AppError(400, 'Id não deve ser vazio');
    }

    const outcome = await this.outcomesRepository.findOne({ id });

    if (!outcome) {
      throw new AppError(404, 'Despesa não encontrada');
    }

    await this.outcomesRepository.delete({ id });
  }
}

export default DeleteOutcomeService;
