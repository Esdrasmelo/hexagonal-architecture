import { InternalServerError, NotFoundResources } from '../exceptions';
import { UserRepositoryPort } from '../ports/repositories';
import { HttpResponse, notFound, ok } from '../protocols';
import { UseCase } from './usecase';

export class FindUserByEmailUseCase implements UseCase {
  private userRepositoryPort: UserRepositoryPort;

  constructor(userRepositoryPort: UserRepositoryPort) {
    this.userRepositoryPort = userRepositoryPort;
  }

  async execute(email: string): Promise<HttpResponse> {
    try {
      const user = await this.userRepositoryPort.findByEmail(email);
      if (!user) {
        return notFound(new NotFoundResources('User'));
      }
      return ok({
        body: user,
      });
    } catch (error) {
      throw new InternalServerError();
    }
  }
}
