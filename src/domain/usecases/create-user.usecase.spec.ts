import { UserPayloadOut } from '../entities/out';
import { UserRepositoryPort } from '../ports/repositories';
import { CreateUserUseCase } from './create-user.usecase';
import { UserPayloadIn } from '../entities/in';

const makeSut = () => {
  const userData: UserPayloadOut = {
    email: 'valid@email.com',
    id: 'valid_id',
    name: 'valid name',
    password: 'valid_password',
  };
  const userRepositoryPort: UserRepositoryPort = {
    save: async () => userData,
    findByEmail: async () => userData,
    findAll: async () => [userData],
  };
  return new CreateUserUseCase(userRepositoryPort);
};

describe('Create User UseCase', () => {
  it('Should return 500 if email is invalid', async () => {
    const sut = makeSut();
    const data: UserPayloadIn = {
      email: 'validemail',
      name: 'valid name',
      password: 'valid_password',
    };
    const httpResponse = await sut.execute(data);
    expect(httpResponse.status).toBe(500);
  });
  it('Should return 500 if field is not provided', async () => {
    const sut = makeSut();
    const data: UserPayloadIn = {
      email: '',
      name: 'valid name',
      password: 'valid_password',
    };
    const httpResponse = await sut.execute(data);
    expect(httpResponse.status).toBe(500);
  });
  it('Should return 400 if user already exists', async () => {
    const sut = makeSut();
    const data: UserPayloadIn = {
      email: 'valid@gmail.com',
      name: 'valid name',
      password: 'valid_password',
    };
    const httpResponse = await sut.execute(data);
    expect(httpResponse.status).toBe(500);
  });
});
