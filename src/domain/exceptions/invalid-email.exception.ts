export class InvalidEmail extends Error {
  constructor() {
    super('Please, provide a valid email');
    this.name = 'InvalidEmail';
  }
}
