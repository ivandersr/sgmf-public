import Subscription from '../infra/typeorm/entities/Subscription';

export interface IRequest {
  page: string;
  pageSize: string;
}

export interface IResponse {
  subscriptions: Subscription[];
  total: number;
  pages: number;
}
