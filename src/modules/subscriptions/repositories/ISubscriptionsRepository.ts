import IFindManyOptionsDTO from "@modules/athletes/dtos/IFindManyOptionsDTO";
import ICreateSubscriptionDTO from "../dtos/ICreateSubscriptionDTO";
import IFindSubscriptionDTO from "../dtos/IFindSubscriptionDTO";
import Subscription from "../infra/typeorm/entities/Subscription";

export default interface ISubscriptionsRepository {
  find(): Promise<Subscription[]>;
  findAndCount(
    options?: IFindManyOptionsDTO
  ): Promise<[Subscription[], number]>;
  findOne(data: IFindSubscriptionDTO): Promise<Subscription | undefined>;
  create(data: ICreateSubscriptionDTO): Promise<Subscription>;
  save(data: Subscription): Promise<Subscription>;
}
