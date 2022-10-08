import IAthletesRepository from "@modules/athletes/repositories/IAthletesRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IDeletePaymentDTO from "../dtos/IDeletePaymentDTO";
import IPaymentsRepository from "../repositories/IPaymentsRepository";

@injectable()
class DeletePaymentService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,

    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,
  ) { }

  public async execute({ id }: IDeletePaymentDTO): Promise<void> {
    if (!id) {
      throw new AppError(400, 'Id obrigatório');
    }

    const payment = await this.paymentsRepository.findOne({ id });

    if (!payment) {
      throw new AppError(404, 'Pagamento não encontrado');
    }

    const athlete = await this.athletesRepository.findOne({
      id: payment.athlete_id
    });

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado')
    }

    await this.paymentsRepository.delete({ id });

    const lastAthletePayment = await this.paymentsRepository
      .findLastPaymentByAthlete({ athlete_id: athlete.id });

    athlete.nextDueDate = lastAthletePayment
      ? lastAthletePayment.nextDueDate
      : new Date();

    await this.athletesRepository.save(athlete);
  }
}

export default DeletePaymentService;
