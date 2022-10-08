import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import IFindByEmailDTO from "@modules/users/dtos/IFindByEmailDTO";
import IFindByLoginDTO from "@modules/users/dtos/IFindByLoginDTO";
import IFindUserDTO from "@modules/users/dtos/IFindUserDTO";
import User from "@modules/users/infra/typeorm/entities/User";
import { v4 } from "uuid";
import IUsersRepository from "../IUsersRepository";

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findOne({ user_id }: IFindUserDTO): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === user_id);

    return findUser;
  }

  public async findByLogin(
    { login }: IFindByLoginDTO
  ): Promise<User | undefined> {
    const findUser = this.users.find(user => user.login === login);

    return findUser;
  }

  public async findByEmail(
    { email }: IFindByEmailDTO
  ): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async create(
    { login, name, phoneNumber, password, email }: ICreateUserDTO
  ): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: v4(),
      login,
      name,
      phoneNumber,
      password,
      email,
    });

    this.users.push(user);

    return user;
  }

  public async save(data: User): Promise<User> {
    const userIndex = this.users.findIndex(user => user.id === data.id);

    if (userIndex !== -1) {
      this.users[userIndex] = data;
      return data;
    }

    this.users.push(data);
    return data;
  }
}

export default FakeUsersRepository;
