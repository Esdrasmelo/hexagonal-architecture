import { Router } from 'express';
import { CreateUserUseCase } from '../../../../domain/usecases';
import { UserController } from '../../../controllers/user.controller';
import { UserRepositoryImpl } from '../../../database/repositories';

const userRouter = Router();

const userRepository = new UserRepositoryImpl();
const createUserUseCase = new CreateUserUseCase(userRepository);
const userController = new UserController(createUserUseCase);

userRouter.route('/users/create').post(async (request, response) => {
  const { status, body } = await userController.createUser(request);
  return response.status(status).send(body);
});

export default userRouter;
