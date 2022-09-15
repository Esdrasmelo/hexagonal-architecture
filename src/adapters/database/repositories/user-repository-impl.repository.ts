import { UserPayloadOut } from '../../../domain/entities/out';
import { UserEntity } from '../../../domain/entities/user.entity';
import { InternalServerError } from '../../../domain/exceptions';
import { UserRepositoryPort } from '../../../domain/ports/repositories';
import { prismaConnection } from '../prisma/prisma-connection';

export class UserRepositoryImpl implements UserRepositoryPort {
  private userDBConnection = prismaConnection['users'];

  async save(userData: UserEntity): Promise<UserPayloadOut> {
    try {
      const user = await this.userDBConnection.create({
        data: {
          email: userData.getEmail,
          password: userData.getPassword,
          id: userData.getId,
          name: userData.getName,
        },
      });
      return user;
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async findAll(): Promise<UserPayloadOut[]> {
    try {
      const users = await this.userDBConnection.findMany();
      return users;
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async findByEmail(email: string): Promise<UserPayloadOut | null> {
    try {
      const user = await this.userDBConnection.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      throw new InternalServerError();
    }
  }
}
