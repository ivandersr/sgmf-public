import AthleteGroup from "@modules/athletegroups/infra/typeorm/entities/AthleteGroup";
import Subscription from "@modules/subscriptions/infra/typeorm/entities/Subscription";

export default interface ICreateAthleteDTO {
  name: string;
  birthDate: Date;
  phoneNumber: string;
  subscription: Subscription;
  athleteGroup: AthleteGroup;
}
