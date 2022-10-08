import ICreatePaymentDTO from '../dtos/ICreatePaymentDTO';
import IDeletePaymentDTO from '../dtos/IDeletePaymentDTO';
import IFindByAthleteDTO from '../dtos/IFindByAthleteDTO';
import IFindByDateAndAthleteDTO from '../dtos/IFindByDateAndAthleteDTO';
import IFindPaymentDTO from '../dtos/IFindPaymentDTO';
import Payment from '../infra/typeorm/entities/Payment';

export default interface IPaymentsRepository {
  findOne(data: IFindPaymentDTO): Promise<Payment | undefined>;
  findByDate(paymentDate: Date): Promise<Payment[]>;
  findByDateAndAthlete(data: IFindByDateAndAthleteDTO): Promise<Payment[]>;
  findByAthlete(data: IFindByAthleteDTO): Promise<Payment[]>;
  findLastPaymentByAthlete(
    data: IFindByAthleteDTO
  ): Promise<Payment | undefined>;
  create(data: ICreatePaymentDTO): Promise<Payment>;
  save(data: Payment): Promise<Payment>;
  delete(data: IDeletePaymentDTO): Promise<void>;
}
