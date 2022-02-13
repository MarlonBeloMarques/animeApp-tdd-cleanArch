import { Anime, AnimeList } from '~/domain/useCases';
import { AnimeContentError, UnexpectedError } from '../errors';
import { HttpGetClient, HttpResponse, HttpStatusCode } from '../http';

export class RemoteAnimeList implements AnimeList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient,
  ) {}

  async list(
    authorization?: string,
  ): Promise<HttpResponse<Array<Anime.Model>>> {
    const { statusCode, body } = await this.httpClient.get({
      url: this.url,
      headers: { Authorization: `Bearer ${authorization}` },
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body;
      case HttpStatusCode.notFound:
        throw new AnimeContentError();
      case HttpStatusCode.badRequest:
        throw new AnimeContentError();
      default:
        throw new UnexpectedError();
    }
  }
}
