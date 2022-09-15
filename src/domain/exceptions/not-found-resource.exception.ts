export class NotFoundResources extends Error {
  constructor(resourceName: string) {
    super();
    this.message = `${resourceName} not found`;
  }
}
