import { AddAuthentication } from '~/domain/useCases';
import { AuthenticationStorageAbstract } from '../abstracts';
import { AddAuthenticationError } from '../errors';
import { AddItemToStorage } from '../storage';

export class AddAuthenticationToStorage
  extends AuthenticationStorageAbstract
  implements AddAuthentication
{
  constructor(private readonly addItemToStorage: AddItemToStorage) {
    super();
  }

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
}
