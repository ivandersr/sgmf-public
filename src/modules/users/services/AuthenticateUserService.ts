import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { IRequest, IResponse } from '../dtos/IAuthenticateUserDTO';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ login, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByLogin({ login });

    if (!user) {
      throw new AppError(400, 'Combinação Login/Senha inválida.');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password, user.password
    );

    if (!passwordMatched) {
      throw new AppError(400, 'Combinação Login/Senha inválida.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    if (!secret) {
      throw new AppError(500, 'Internal server error');
    }
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
