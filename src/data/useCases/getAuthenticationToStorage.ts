import { GetAuthentication } from '~/domain/useCases';
import { AuthenticationStorageAbstract } from '../abstracts';
import { GetAuthenticationError } from '../errors';
import { GetItemToStorage } from '../storage';

export class GetAuthenticationToStorage
  extends AuthenticationStorageAbstract
  implements GetAuthentication
{
  constructor(private readonly getItemToStorage: GetItemToStorage) {
    super();
  }

  async get(): Promise<string> {
    const authentication = await this.getItemToStorage.get(
      this._authenticationKey,
    );
    if (authentication) {
      return authentication;
    }

    throw new GetAuthenticationError();
  }
}
