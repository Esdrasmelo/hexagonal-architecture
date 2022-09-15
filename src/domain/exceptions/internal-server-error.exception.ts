export class InternalServerError extends Error {
  constructor() {
    super();
    this.message = 'Something went wrong';
  }
}
