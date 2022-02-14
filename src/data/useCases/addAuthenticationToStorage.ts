import { AddAuthentication } from '~/domain/useCases';
import { AddAuthenticationError } from '../errors';
import { AddItemToStorage } from '../storage';

export class AddAuthenticationToStorage implements AddAuthentication {
  private _authenticationKey = '@storage_AuthenticationKey';
  constructor(private readonly addItemToStorage: AddItemToStorage) {}

  async add(authentication: string): Promise<void> {
    if (this.authenticationIsValid(authentication)) {
      this.addItemToStorage.add(this._authenticationKey, authentication);
    } else {
      throw new AddAuthenticationError();
    }
  }

  private authenticationIsValid(authentication: string): boolean {
    return !!(authentication.length !== 0);
  }

  set authenticationKey(authenticationKey: string) {
    this._authenticationKey = authenticationKey;
  }
}
