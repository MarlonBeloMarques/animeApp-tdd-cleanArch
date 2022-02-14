export class AddAuthenticationError extends Error {
  constructor() {
    super();
    this.message =
      'Your authentication is not valid. Try to authenticate again.';
    this.name = 'AddAuthenticationError';
  }
}
