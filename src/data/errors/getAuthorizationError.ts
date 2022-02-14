export class GetAuthorizationError extends Error {
  constructor() {
    super();
    this.message =
      'Your authorization was not found. Try authenticating again.';
    this.name = 'GetAuthorizationError';
  }
}
