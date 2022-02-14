export class GetAuthenticationError extends Error {
  constructor() {
    super();
    this.message =
      'Your authentication was not found. Try authenticating again.';
    this.name = 'GetAuthenticationError';
  }
}
