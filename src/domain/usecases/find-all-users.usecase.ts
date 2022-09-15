import { NotFoundResources } from '../exceptions/not-found-resource.exception';
import { UserRepositoryPort } from '../ports/repositories';
import { HttpResponse, internalServerError, notFound, ok } from '../protocols';
import { UseCase } from './usecase';

export class FindAllUsersUseCase implements UseCase {
  private userRepository: UserRepositoryPort;

  constructor(userRepository: UserRepositoryPort) {
    this.userRepository = userRepository;
  }

  async execute(): Promise<HttpResponse> {
    try {
      const users = await this.userRepository.findAll();
      if (users.length) {
        return ok({
          body: users,
        });
      }
      return notFound(new NotFoundResources('Users'));
    } catch (error) {
      return internalServerError();
    }
  }
}
