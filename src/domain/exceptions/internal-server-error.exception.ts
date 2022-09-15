export class InternalServerError extends Error {
  constructor() {
    super('Something went wrong');
    this.name = 'InternalServerError';
  }
}
