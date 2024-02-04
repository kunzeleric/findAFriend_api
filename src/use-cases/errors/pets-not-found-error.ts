export class PetsNotFoundError extends Error {
  constructor() {
    super('Pets not found!')
  }
}
