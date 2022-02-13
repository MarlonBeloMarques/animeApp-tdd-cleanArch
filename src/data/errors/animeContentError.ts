export class AnimeContentError extends Error {
  constructor() {
    super();
    this.message =
      'It was not possible to get the content of the Animes. Try again later.';
    this.name = 'AnimeContentError';
  }
}
