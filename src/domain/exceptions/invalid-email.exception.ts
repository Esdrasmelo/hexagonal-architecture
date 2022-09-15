export class InvalidEmail extends Error {
  constructor() {
    super();
    this.message = 'Please, provide a valid email';
  }
}
