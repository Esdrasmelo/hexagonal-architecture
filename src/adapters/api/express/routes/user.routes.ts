import { Router } from 'express';
import {
  CreateUserUseCase,
  FindAllUsersUseCase,
} from '../../../../domain/usecases';
import { UserController } from '../../../controllers/user.controller';
import { UserRepositoryImpl } from '../../../database/repositories';

const userRouter = Router();

const userRepository = new UserRepositoryImpl();
const createUserUseCase = new CreateUserUseCase(userRepository);
const findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
const userController = new UserController(
  createUserUseCase,
  findAllUsersUseCase,
);

userRouter.route('/users/create').post(async (request, response) => {
  const { status, body } = await userController.createUser(request);
  return response.status(status).send(body);
});

userRouter.route('/users').get(async (request, response) => {
  const { status, body } = await userController.findUsers();
  return response.status(status).send(body);
});

export default userRouter;
