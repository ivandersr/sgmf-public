import Outcome from "../infra/typeorm/entities/Outcome";

export interface IRequest {
  month: string;
  year: string;
}

export interface IResponse {
  outcomes: Outcome[];
  total: number;
}
