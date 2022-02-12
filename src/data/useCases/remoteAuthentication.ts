import { Authentication } from 'src/domain/useCases';
import { UnexpectedError } from '../errors';
import { OAuthClient } from '../oauth';

export class RemoteAuthentication implements Authentication {
  private url: string;
  private oAuthClient: OAuthClient;

  constructor(url: string, oAuthClient: OAuthClient) {
    this.url = url;
    this.oAuthClient = oAuthClient;
  }

  authenticate(): void {
    let url: URL;
    try {
      url = new URL(this.url);
      this.oAuthClient.redirect({ url: url.toJSON() });
    } catch (error) {
      throw new UnexpectedError();
    }
  }

  completeUrlWithParam(params: Authentication.Params): void {
    this.url = `${this.url}?${params.responseType}&${params.clientId}&${params.redirectUri}`;
  }
}
