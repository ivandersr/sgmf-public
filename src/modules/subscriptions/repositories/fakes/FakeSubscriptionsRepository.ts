import { v4 } from 'uuid';
import IFindManyOptionsDTO from "@modules/athletes/dtos/IFindManyOptionsDTO";
import ICreateSubscriptionDTO from "@modules/subscriptions/dtos/ICreateSubscriptionDTO";
import IFindSubscriptionDTO from "@modules/subscriptions/dtos/IFindSubscriptionDTO";
import Subscription from "@modules/subscriptions/infra/typeorm/entities/Subscription";
import ISubscriptionsRepository from "../ISubscriptionsRepository";

class FakeSubscriptionsRepository implements ISubscriptionsRepository {
  private subscriptions: Subscription[] = [];

  public async find(): Promise<Subscription[]> {
    return this.subscriptions;
  }

  public async findAndCount(
    options?: IFindManyOptionsDTO
  ): Promise<[Subscription[], number]> {
    if (options) {
      const { skip, take } = options;

      if (skip && take) {
        const findSubscriptions = this.subscriptions.slice(skip, skip + take);
        return [findSubscriptions, this.subscriptions.length]
      }
    }

    return [this.subscriptions, this.subscriptions.length];
  }

  public async findOne(
    { id }: IFindSubscriptionDTO
  ): Promise<Subscription | undefined> {
    const findSubscription = this.subscriptions.find(
      subscription => subscription.id === id
    );

    return findSubscription;
  }

  public async create({
    title,
    value,
  }: ICreateSubscriptionDTO): Promise<Subscription> {
    const newSubscription = new Subscription();

    Object.assign(newSubscription, { id: v4(), title, value });

    this.subscriptions.push(newSubscription);

    return newSubscription;
  }

  public async save(data: Subscription): Promise<Subscription> {
    const findIndex = this.subscriptions.findIndex(
      subscription => subscription.id === data.id
    );

    if (findIndex !== -1) {
      this.subscriptions[findIndex] = data;
      return data;
    }

    this.subscriptions.push(data);
    return data;
  }
}

export default FakeSubscriptionsRepository;

