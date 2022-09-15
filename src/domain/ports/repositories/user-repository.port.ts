import { UserPayloadOut } from '../../entities/out';
import { UserEntity } from '../../entities/user.entity';

export type UserRepositoryPort = {
  save: (userData: UserEntity) => Promise<UserPayloadOut>;
  findAll: () => Promise<UserPayloadOut[]>;
  findByEmail: (email: string) => Promise<UserPayloadOut | null>;
};
