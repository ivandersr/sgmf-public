import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindByEmailDTO from '@modules/users/dtos/IFindByEmailDTO';
import IFindByLoginDTO from '@modules/users/dtos/IFindByLoginDTO';
import IFindUserDTO from '@modules/users/dtos/IFindUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findOne({ user_id }: IFindUserDTO): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(user_id);

    return user;
  }

  public async findByLogin(
    { login }: IFindByLoginDTO
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        login,
      }
    });

    return user;
  }

  public async findByEmail(
    { email }: IFindByEmailDTO
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      }
    });

    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(data: User): Promise<User> {
    await this.ormRepository.save(data);

    return data;
  }
}

export default UsersRepository;
