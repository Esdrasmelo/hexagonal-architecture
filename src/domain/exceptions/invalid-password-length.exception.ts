export class InvalidPasswordLength extends Error {
  constructor() {
    super();
    this.message = 'Password must contain at least 8 characters';
  }
}
