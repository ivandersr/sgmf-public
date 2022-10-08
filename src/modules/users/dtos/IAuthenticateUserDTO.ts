import User from "../infra/typeorm/entities/User";

export interface IRequest {
  login: string;
  password: string;
}

export interface IResponse {
  user: User;
  token: string;
}
