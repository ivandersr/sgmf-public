import Athlete from '../infra/typeorm/entities/Athlete';

export default interface IActiveByReferralDTO {
  athletes: Athlete[];
  count: number;
}
