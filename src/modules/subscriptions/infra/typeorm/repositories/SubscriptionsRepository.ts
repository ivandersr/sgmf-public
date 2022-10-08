import { getRepository, Repository } from 'typeorm';
import ISubscriptionsRepository from "@modules/subscriptions/repositories/ISubscriptionsRepository";
import ICreateSubscriptionDTO from '@modules/subscriptions/dtos/ICreateSubscriptionDTO';
import IFindManyOptionsDTO from '@modules/athletes/dtos/IFindManyOptionsDTO';
import IFindSubscriptionDTO from '@modules/subscriptions/dtos/IFindSubscriptionDTO';
import Subscription from "../entities/Subscription";

class SubscriptionsRepository implements ISubscriptionsRepository {
  private ormRepository: Repository<Subscription>;

  constructor() {
    this.ormRepository = getRepository(Subscription);
  }

  public async create(data: ICreateSubscriptionDTO): Promise<Subscription> {
    const subscription = this.ormRepository.create(data);

    await this.ormRepository.save(subscription);

    return subscription;
  }

  public async save(data: Subscription): Promise<Subscription> {
    await this.ormRepository.save(data);

    return data;
  }

  public async find(): Promise<Subscription[]> {
    const subscriptions = await this.ormRepository.find();

    return subscriptions;
  }

  public async findAndCount(
    options?: IFindManyOptionsDTO
  ): Promise<[Subscription[], number]> {
    const result = await this.ormRepository.findAndCount(options);

    return result;
  }

  public async findOne(
    data: IFindSubscriptionDTO
  ): Promise<Subscription | undefined> {
    const subscription = await this.ormRepository.findOne(data);

    return subscription;
  }
}

export default SubscriptionsRepository;
