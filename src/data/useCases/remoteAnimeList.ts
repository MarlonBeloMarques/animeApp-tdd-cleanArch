import { Anime, AnimeList } from '~/domain/useCases';
import { AnimeContentError, UnexpectedError } from '../errors';
import { HttpGetClient, HttpStatusCode } from '../http';

export class RemoteAnimeList implements AnimeList {
  private urlWithParam = '';

  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient,
  ) {
    this.urlWithParam = url;
  }

  async list(authorization?: string): Promise<Anime.Model> {
    const { statusCode, body } = await this.httpClient.get({
      url: this.urlWithParam,
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

  completeUrlWithParam(params: Anime.Params): void {
    const urlParam = `?page=${params.page}&per_page=${params.per_page}&locale=${params.locale}`;
    this.urlWithParam = this.url + urlParam;
  }
}
