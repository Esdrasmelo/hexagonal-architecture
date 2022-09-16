import { pbkdf2Sync, randomUUID } from 'crypto';
import { InvalidEmail, InvalidPasswordLength } from '../exceptions';
import { UserPayloadIn } from './in';
import { UserPayloadOut } from './out';

export class UserEntity {
  private id: string;
  private name: string;
  private email: string;
  private password: string;

  constructor(userData: UserPayloadIn) {
    this.setId = randomUUID();
    this.setName = userData.name;
    this.setEmail = userData.email;
    this.setPassword = userData.password;
  }

  public newUser(userData: UserPayloadIn) {
    const user = new UserEntity(userData);
    return user;
  }

  private set setPassword(password: string) {
    const hashedPassword = this.hashPassword(password);
    if (hashedPassword) this.password = hashedPassword;
  }

  private set setEmail(email: string) {
    if (this.isEmailValid(email)) this.email = email;
  }

  private set setName(name: string) {
    this.name = name;
  }

  private set setId(id: string) {
    this.id = id;
  }

  public get getName(): string {
    return this.name;
  }

  public get getEmail(): string {
    return this.email;
  }

  public get getId(): string {
    return this.id;
  }

  public get getPassword(): string {
    return this.password;
  }

  private passwordContainsValidLength(password: string): boolean {
    if (password.length < 8) throw new InvalidPasswordLength();
    return true;
  }

  private isEmailValid(email: string) {
    const regexp =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email.match(regexp)) return true;
    throw new InvalidEmail();
  }

  private hashPassword(password: string) {
    if (this.passwordContainsValidLength(password)) {
      const hashedPassword = pbkdf2Sync(
        password,
        'aaa',
        1000,
        64,
        'sha512',
      ).toString('hex');
      return hashedPassword;
    }
  }

  public returnFields(): UserPayloadOut {
    return {
      id: this.getId,
      email: this.getEmail,
      name: this.getName,
      password: this.getPassword,
    };
  }
}
