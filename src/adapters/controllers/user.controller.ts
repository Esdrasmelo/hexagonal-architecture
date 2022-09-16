import { UserPayloadIn } from '../../domain/entities/in';
import { HttpRequest, HttpResponse } from '../../domain/protocols';
import {
  CreateUserUseCase,
  FindAllUsersUseCase,
  FindUserByEmailUseCase,
} from '../../domain/usecases';

export class UserController {
  private createUserUseCase: CreateUserUseCase;
  private findAllUsersUseCase: FindAllUsersUseCase;
  private findUserByEmailUseCase: FindUserByEmailUseCase;

  constructor(
    createUserUseCase: CreateUserUseCase,
    findAllUsersUseCase: FindAllUsersUseCase,
    findUserByEmailUseCase: FindUserByEmailUseCase,
  ) {
    this.createUserUseCase = createUserUseCase;
    this.findAllUsersUseCase = findAllUsersUseCase;
    this.findUserByEmailUseCase = findUserByEmailUseCase;
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

  async findUserByEmail(userData: HttpRequest): Promise<HttpResponse> {
    const email: string = userData.body.email;
    const user = await this.findUserByEmailUseCase.execute(email);
    return user;
  }
}
