export class UserAlreadyExists extends Error {
  constructor() {
    super();
    this.message = 'User already exists';
  }
}
