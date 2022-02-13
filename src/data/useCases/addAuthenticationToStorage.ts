import { AddAuthentication } from '~/domain/useCases';
import { AddAuthorizationError } from '../errors';
import { AddItemToStorage } from '../storage';

export class AddAuthenticationToStorage implements AddAuthentication {
  constructor(private readonly addItemToStorage: AddItemToStorage) {}

  async add(authentication: string): Promise<void> {
    if (this.authenticationIsValid(authentication)) {
      this.addItemToStorage.add(authentication);
    } else {
      throw new AddAuthorizationError();
    }
  }

  private authenticationIsValid(authentication: string): boolean {
    return !!(authentication.length !== 0);
  }
}
