import { GetAuthentication } from '~/domain/useCases';
import { GetAuthorizationError } from '../errors';
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

    throw new GetAuthorizationError();
  }

  set authenticationKey(authenticationKey: string) {
    this._authenticationKey = authenticationKey;
  }
}
