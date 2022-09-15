import { UserPayloadIn } from '../entities/in';
import { UserEntity } from '../entities/user.entity';
import { UserAlreadyExists } from '../exceptions';
import { UserRepositoryPort } from '../ports/repositories';
import {
  badRequest,
  HttpResponse,
  internalServerError,
  ok,
} from '../protocols';
import { UseCase } from './usecase';

export class CreateUserUseCase implements UseCase {
  private userRepository: UserRepositoryPort;

  constructor(userRepository: UserRepositoryPort) {
    this.userRepository = userRepository;
  }

  async execute(userData: UserPayloadIn): Promise<HttpResponse> {
    try {
      const { newUser, getEmail } = new UserEntity(userData);
      const userExists = await this.userRepository.findByEmail(getEmail);
      if (userExists) {
        return badRequest(new UserAlreadyExists());
      }
      const user = newUser(userData);
      const createUser = await this.userRepository.save(user);
      return ok({
        body: createUser,
      });
    } catch (error) {
      return internalServerError();
    }
  }
}
