import { UserPayloadIn } from '../../domain/entities/in';
import { HttpRequest, HttpResponse } from '../../domain/protocols';
import { CreateUserUseCase } from '../../domain/usecases';

export class UserController {
  private createUserUseCase: CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async createUser(userData: HttpRequest): Promise<HttpResponse> {
    const body: UserPayloadIn = userData.body;
    const user = await this.createUserUseCase.execute({
      email: body.email,
      password: body.password,
      name: body.name,
    });
    return user;
  }
}
