import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';
import IFindByAthleteDTO from '../dtos/IFindByAthleteDTO';
import IPaymentsRepository from '../repositories/IPaymentsRepository';
import Payment from '../infra/typeorm/entities/Payment';

@injectable()
class FindPaymentsByAthleteService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,

    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,
  ) { }

  public async execute({ athlete_id }: IFindByAthleteDTO): Promise<Payment[]> {
    const athlete = await this.athletesRepository.findOne({ id: athlete_id });

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    const payments = await this.paymentsRepository.findByAthlete({
      athlete_id
    });

    return payments;
  }
}

export default FindPaymentsByAthleteService;
