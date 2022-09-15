import { UserPayloadIn } from '../../domain/entities/in';
import { HttpRequest, HttpResponse } from '../../domain/protocols';
import { CreateUserUseCase, FindAllUsersUseCase } from '../../domain/usecases';

export class UserController {
  private createUserUseCase: CreateUserUseCase;
  private findAllUsersUseCase: FindAllUsersUseCase;

  constructor(
    createUserUseCase: CreateUserUseCase,
    findAllUsersUseCase: FindAllUsersUseCase,
  ) {
    this.createUserUseCase = createUserUseCase;
    this.findAllUsersUseCase = findAllUsersUseCase;
  }

  async createUser(userData: HttpRequest): Promise<HttpResponse> {
    const body: UserPayloadIn = userData.body;
    const user = await this.createUserUseCase.execute(body);
    return user;
  }

  async findUsers(): Promise<HttpResponse> {
    const users = await this.findAllUsersUseCase.execute();
    return users;
  }
}
