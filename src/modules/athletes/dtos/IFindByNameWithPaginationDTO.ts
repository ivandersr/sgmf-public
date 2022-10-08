import Athlete from "../infra/typeorm/entities/Athlete";

export interface IRequest {
  text: string;
  page: string;
  pageSize: string;
}

export interface IResponse {
  athletes: Athlete[];
  total: number;
  pages: number;
}
