import { inject, injectable } from 'tsyringe';
import { startOfDay } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';
import Formatter from '@shared/utils/Formatter';
import ICreatePaymentServiceDTO from '../dtos/ICreatePaymentServiceDTO';
import IPaymentsRepository from '../repositories/IPaymentsRepository';
import Payment from '../infra/typeorm/entities/Payment';

@injectable()
class CreatePaymentService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,

    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,
  ) { }

  public async execute({
    value,
    paymentDate,
    referenceDate,
    nextDueDate,
    athlete_id,
  }: ICreatePaymentServiceDTO): Promise<Payment> {
    if (!value) {
      throw new AppError(400, 'Valor do pagamento não deve ser vazio');
    }

    if (!paymentDate) {
      throw new AppError(400, 'Data do pagamento obrigatória');
    }

    if (!referenceDate) {
      throw new AppError(400, 'Data de referência obrigatória');
    }

    if (!nextDueDate) {
      throw new AppError(400, 'Data do próximo vencimento obrigatória');
    }

    if (!athlete_id) {
      throw new AppError(400, 'O aluno deve ser indicado no pagamento');
    }

    const athlete = await this.athletesRepository.findOne({ id: athlete_id });

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    const parsedPaymentDate = startOfDay(Formatter.formatDate(paymentDate));
    const parsedReferenceDate = startOfDay(Formatter.formatDate(referenceDate));
    const parsedNextDueDate = startOfDay(Formatter.formatDate(nextDueDate));

    const payment = await this.paymentsRepository.create({
      value,
      paymentDate: parsedPaymentDate,
      referenceDate: parsedReferenceDate,
      nextDueDate: parsedNextDueDate,
      athlete,
    });

    const athleteLastPayment = await this.paymentsRepository
      .findLastPaymentByAthlete({ athlete_id: athlete.id });

    if (
      athleteLastPayment
      &&
      athleteLastPayment.nextDueDate.getMilliseconds()
      >
      parsedNextDueDate.getMilliseconds()
    ) {
      athlete.nextDueDate = athleteLastPayment.nextDueDate;
    } else {
      athlete.nextDueDate = parsedNextDueDate;
    }

    await this.athletesRepository.save(athlete);

    return payment;
  }
}

export default CreatePaymentService;
