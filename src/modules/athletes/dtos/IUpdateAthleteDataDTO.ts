export default interface IUpdateAthleteDataDTO {
  id: string;
  name: string;
  birthDate: string;
  phoneNumber: string;
  subscription_id: string;
  athlete_group_id: string;
  referral_group_id?: string;
  active: boolean;
  observation: string;
}
