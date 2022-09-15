export class NotFoundResources extends Error {
  constructor(resourceName: string) {
    super(`${resourceName} not found`);
    this.name = 'NotFoundResources';
  }
}
