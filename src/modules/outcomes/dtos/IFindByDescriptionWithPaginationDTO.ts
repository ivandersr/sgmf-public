import Outcome from "../infra/typeorm/entities/Outcome";

export interface IRequest {
  text: string;
  page: string;
  pageSize: string;
}

export interface IResponse {
  outcomes: Outcome[];
  total: number;
  pages: number;
}
