export class NotFilledFieldsException extends Error {
  constructor(field: string) {
    super();
    this.message = `Please, fill the ${field} field`;
  }
}
