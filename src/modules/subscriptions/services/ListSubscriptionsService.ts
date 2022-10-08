import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import {
  IRequest,
  IResponse,
} from '../dtos/IListSubscriptionsWithPaginationDTO';
import ISubscriptionsRepository from '../repositories/ISubscriptionsRepository';

@injectable()
class ListSubscriptionsService {
  constructor(
    @inject('SubscriptionsRepository')
    private subscriptionsRepository: ISubscriptionsRepository,
  ) { }

  public async execute({ page, pageSize }: IRequest): Promise<IResponse> {
    if (!page || !pageSize) {
      const [
        subscriptions,
        total,
      ] = await this.subscriptionsRepository.findAndCount();
      return { subscriptions, total, pages: 1 };
    }

    if (isNaN(Number(page)) || isNaN(Number(pageSize))) {
      throw new AppError(400, 'A página e seu tamanho devem ser numéricos');
    }

    const [subscriptions, total] = await this.subscriptionsRepository
      .findAndCount({
        skip: Number(page) * Number(pageSize),
        take: Number(pageSize),
        order: {
          title: 'ASC',
        },
      });

    const pages = Math.ceil(total / Number(pageSize));

    return { subscriptions, total, pages };
  }
}

export default ListSubscriptionsService;
