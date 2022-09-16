import { Router } from 'express';
import {
  CreateUserUseCase,
  FindAllUsersUseCase,
  FindUserByEmailUseCase,
} from '../../../../domain/usecases';
import { UserController } from '../../../controllers/user.controller';
import { UserRepositoryImpl } from '../../../database/repositories';

const userRouter = Router();

const userRepository = new UserRepositoryImpl();
const createUserUseCase = new CreateUserUseCase(userRepository);
const findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
const findUserByEmailUseCase = new FindUserByEmailUseCase(userRepository);
const userController = new UserController(
  createUserUseCase,
  findAllUsersUseCase,
  findUserByEmailUseCase,
);

userRouter.route('/users/create').post(async (request, response) => {
  const { statusCode, body } = await userController.createUser(request);
  return response.status(statusCode).send(body);
});

userRouter.route('/users').get(async (request, response) => {
  const { statusCode, body } = await userController.findUsers();
  return response.status(statusCode).send(body);
});

userRouter.route('/users/findByEmail').get(async (request, response) => {
  const { statusCode, body } = await userController.findUserByEmail(request);
  return response.status(statusCode).send(body);
});

export default userRouter;
