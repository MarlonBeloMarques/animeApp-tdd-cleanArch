import { OAuthClient } from 'src/data/oauth';

export class OAuthClientSpy implements OAuthClient {
  private _url!: string;

  async redirect(data: OAuthClient.Request) {
    this._url = data.url;
  }

  get url(): string {
    return this._url;
  }
}
