export class ResourceDoesNotExistError extends Error {
  constructor() {
    super('Resources not found!')
  }
}
