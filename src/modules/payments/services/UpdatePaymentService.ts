import IAthletesRepository from "@modules/athletes/repositories/IAthletesRepository";
import AppError from "@shared/errors/AppError";
import Formatter from "@shared/utils/Formatter";
import { startOfDay } from "date-fns";
import { inject, injectable } from "tsyringe";
import IUpdatePaymentDTO from "../dtos/IUpdatePaymentDTO";
import Payment from "../infra/typeorm/entities/Payment";
import IPaymentsRepository from "../repositories/IPaymentsRepository";

@injectable()
class UpdatePaymentService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,

    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,
  ) { }

  public async execute({
    id,
    value,
    paymentDate,
    referenceDate,
    nextDueDate,
  }: IUpdatePaymentDTO): Promise<Payment> {
    if (!id) {
      throw new AppError(400, 'Id obrigatório');
    }

    if (!value) {
      throw new AppError(400, 'Valor obrigatório');
    }

    if (!paymentDate) {
      throw new AppError(400, 'Data do pagamento obrigatória');
    }

    if (!referenceDate) {
      throw new AppError(400, 'Data de referência obrigatória');
    }

    if (!nextDueDate) {
      throw new AppError(400, 'Data de próximo vencimento obrigatória')
    }

    const payment = await this.paymentsRepository.findOne({ id });

    if (!payment) {
      throw new AppError(404, 'Pagamento não encontrado');
    }

    const athlete = await this.athletesRepository.findOne({
      id: payment.athlete_id
    });

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    const parsedPaymentDate = startOfDay(Formatter.formatDate(paymentDate));
    const parsedReferenceDate = startOfDay(Formatter.formatDate(referenceDate));
    const parsedNextDueDate = startOfDay(Formatter.formatDate(nextDueDate));

    Object.assign(payment, {
      value,
      paymentDate: parsedPaymentDate,
      referenceDate: parsedReferenceDate,
      nextDueDate: parsedNextDueDate,
    });

    await this.paymentsRepository.save(payment);

    Object.assign(athlete, { nextDueDate: parsedNextDueDate });

    await this.athletesRepository.save(athlete);

    return payment;
  }

}

export default UpdatePaymentService;
