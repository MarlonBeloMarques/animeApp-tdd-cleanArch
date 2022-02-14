import { GetAuthentication } from '~/domain/useCases';
import { GetAuthenticationError } from '../errors';
import { GetItemToStorage } from '../storage';

export class GetAuthenticationToStorage implements GetAuthentication {
  private _authenticationKey = '@storage_AuthenticationKey';
  constructor(private readonly getItemToStorage: GetItemToStorage) {}

  async get(): Promise<string> {
    const authentication = await this.getItemToStorage.get(
      this._authenticationKey,
    );
    if (authentication) {
      return authentication;
    }

    throw new GetAuthenticationError();
  }

  set authenticationKey(authenticationKey: string) {
    this._authenticationKey = authenticationKey;
  }
}
