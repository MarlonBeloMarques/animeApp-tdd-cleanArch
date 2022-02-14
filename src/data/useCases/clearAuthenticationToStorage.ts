import { ClearAuthentication } from '~/domain/useCases';
import { ClearAuthenticationError } from '../errors';
import { ClearStorage } from '../storage';

export class ClearAuthenticationToStorage implements ClearAuthentication {
  constructor(private readonly clearStorage: ClearStorage) {}

  async clear(): Promise<void> {
    try {
      await this.clearStorage.clear();
    } catch (error) {
      throw new ClearAuthenticationError();
    }
  }
}
