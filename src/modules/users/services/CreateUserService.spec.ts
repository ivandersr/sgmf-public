import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create an user', async () => {
    const user = await createUser.execute({
      login: 'teste',
      name: 'Usuário de testes',
      password: '123123',
      phoneNumber: '1',
      email: 'teste@teste.com',
    });

    expect(user).toHaveProperty('id');
    expect(user.login).toBe('teste');
    expect(user.name).toBe('Usuário de testes');
    expect(user.phoneNumber).toBe('1');
  });

  it('should not create an user with existing login', async () => {
    await createUser.execute({
      login: 'teste',
      name: 'Usuário de testes',
      password: '123123',
      phoneNumber: '1',
      email: 'teste@teste.com',
    });

    await expect(
      createUser.execute({
        login: 'teste',
        name: 'Usuário de testes',
        password: '123123',
        phoneNumber: '1',
        email: 'teste2@teste.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create an user with existing email', async () => {
    await createUser.execute({
      login: 'teste',
      name: 'Usuário de testes',
      password: '123123',
      phoneNumber: '1',
      email: 'teste@teste.com',
    });

    await expect(
      createUser.execute({
        login: 'teste2',
        name: 'Usuário de testes',
        password: '123123',
        phoneNumber: '1',
        email: 'teste@teste.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if login, password, name or email is empty',
    async () => {
      await expect(
        createUser.execute({
          login: '',
          name: 'Usuário de testes',
          password: '123123',
          phoneNumber: '1',
          email: 'teste@teste.com',
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        createUser.execute({
          login: 'teste',
          name: '',
          password: '123123',
          phoneNumber: '1',
          email: 'teste@teste.com',
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        createUser.execute({
          login: 'teste',
          name: 'Usuário de testes',
          password: '',
          phoneNumber: '1',
          email: 'teste@teste.com',
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        createUser.execute({
          login: 'teste',
          name: 'Usuário de testes',
          password: '123123',
          phoneNumber: '1',
          email: '',
        })
      ).rejects.toBeInstanceOf(AppError);
    });
});
