import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IFindByEmailDTO from "../dtos/IFindByEmailDTO";
import IFindByLoginDTO from "../dtos/IFindByLoginDTO";
import IFindUserDTO from "../dtos/IFindUserDTO";
import User from "../infra/typeorm/entities/User";

export default interface IUsersRepository {
  findOne(data: IFindUserDTO): Promise<User | undefined>;
  findByLogin(data: IFindByLoginDTO): Promise<User | undefined>;
  findByEmail(data: IFindByEmailDTO): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(data: User): Promise<User>;
}
