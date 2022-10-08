export default interface ICreatePaymentServiceDTO {
  value: number;
  paymentDate: string;
  referenceDate: string;
  nextDueDate: string;
  athlete_id: string;
}
