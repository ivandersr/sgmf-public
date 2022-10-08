import Athlete from "@modules/athletes/infra/typeorm/entities/Athlete";

export default interface ICreatePaymentDTO {
  value: number;
  paymentDate: Date;
  referenceDate: Date;
  nextDueDate: Date;
  athlete: Athlete;
}
