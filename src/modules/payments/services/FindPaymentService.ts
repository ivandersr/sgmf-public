import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IFindPaymentDTO from "../dtos/IFindPaymentDTO";
import Payment from "../infra/typeorm/entities/Payment";
import IPaymentsRepository from "../repositories/IPaymentsRepository";

@injectable()
class FindPaymentService {
  constructor(
    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,
  ) { }

  public async execute({ id }: IFindPaymentDTO): Promise<Payment> {
    if (!id) {
      throw new AppError(400, 'Id obrigatório');
    }

    const payment = await this.paymentsRepository.findOne({ id });

    if (!payment) {
      throw new AppError(404, 'Pagamento não encontrado');
    }

    return payment;
  }
}

export default FindPaymentService;
