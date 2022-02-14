export class ClearAuthenticationError extends Error {
  constructor() {
    super();
    this.message =
      'There was an error trying to clear your authentication. Try again later.';
    this.name = 'ClearAuthenticationError';
  }
}
