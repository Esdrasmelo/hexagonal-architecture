export class InvalidPasswordLength extends Error {
  constructor() {
    super('Password must contain at least 8 characters');
    this.name = 'InvalidPasswordLength';
  }
}
