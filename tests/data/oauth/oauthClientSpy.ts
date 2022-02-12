import { OAuthClient, OAuthRequest } from 'src/data/oauth';

export class OAuthClientSpy implements OAuthClient {
  private _url!: string;

  redirect(data: OAuthRequest) {
    this._url = data.url;
  }

  get url(): string {
    return this._url;
  }
}
