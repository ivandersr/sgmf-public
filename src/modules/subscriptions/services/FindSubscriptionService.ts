import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IFindSubscriptionDTO from "../dtos/IFindSubscriptionDTO";
import Subscription from "../infra/typeorm/entities/Subscription";
import ISubscriptionsRepository from "../repositories/ISubscriptionsRepository";

@injectable()
class FindSubscriptionService {
  constructor(
    @inject('SubscriptionsRepository')
    private subscriptionsRepository: ISubscriptionsRepository,
  ) { }

  public async execute(
    { id }: IFindSubscriptionDTO
  ): Promise<Subscription> {
    if (!id) {
      throw new AppError(400, 'Informe o id do plano');
    }

    const subscription = await this.subscriptionsRepository.findOne({ id });

    if (!subscription) {
      throw new AppError(404, 'Plano não encontrado');
    }

    return subscription;
  }
}

export default FindSubscriptionService;
