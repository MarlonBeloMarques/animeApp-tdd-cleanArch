export class AddAuthorizationError extends Error {
  constructor() {
    super();
    this.message =
      'Your authorization is not valid. Try to authenticate again.';
    this.name = 'AddAuthorizationError';
  }
}
