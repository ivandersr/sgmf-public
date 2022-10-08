import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );


  });

  it('should be able to authenticate an user', async () => {
    const user = await fakeUsersRepository.create({
      login: 'teste',
      name: 'Usuário de testes',
      password: '1234',
      phoneNumber: '1',
      email: 'teste@teste.com',
    });

    const response = await authenticateUser.execute({
      login: 'teste',
      password: '1234',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toBe(user);
  });

  it('should not be able to authenticate an user with invalid login',
    async () => {
      await expect(
        authenticateUser.execute({
          login: 'login inválido',
          password: '1234',
        })
      ).rejects.toBeInstanceOf(AppError);
    });

  it('should not be able to authenticate an user with wrong password',
    async () => {
      await fakeUsersRepository.create({
        login: 'teste',
        name: 'Usuário de testes',
        password: '1234',
        phoneNumber: '1',
        email: 'teste@teste.com',
      });

      await expect(
        authenticateUser.execute({
          login: 'teste',
          password: 'senha inválida',
        })
      ).rejects.toBeInstanceOf(AppError);
    });

  it('should not be able to authenticate an user if app secret is not found',
    async () => {
      await fakeUsersRepository.create({
        login: 'teste',
        name: 'Usuário de testes',
        password: '1234',
        phoneNumber: '1',
        email: 'teste@teste.com',
      });

      jest.mock('@config/auth');
      authConfig.jwt.secret = '';

      await expect(
        authenticateUser.execute({
          login: 'teste',
          password: '1234',
        })
      ).rejects.toBeInstanceOf(AppError);
    });
});
