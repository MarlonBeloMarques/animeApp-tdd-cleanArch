import { ItemStorageSpy } from '../storage';

describe('Data: ClearAuthenticationToStorage', () => {
  test('should clear authentication of storage with successfully', async () => {
    const itemStorageSpy = new ItemStorageSpy();
    const authentication = 'any_authentication';
    itemStorageSpy.add('@storage_AuthenticationKey', authentication);
    const sut = new ClearAuthenticationToStorage(itemStorageSpy);
    await sut.clear();
    expect(itemStorageSpy.item).not.toEqual(authentication);
  });
});

class ClearAuthenticationToStorage implements ClearAuthentication {
  constructor(private readonly clearStorage: ClearStorage) {}

  async clear(): Promise<void> {
    try {
      await this.clearStorage.clear();
    } catch (error) {
      throw new ClearAuthenticationError();
    }
  }
}

export interface ClearStorage {
  clear(): Promise<void>;
}

interface ClearAuthentication {
  clear(): Promise<void>;
}

class ClearAuthenticationError extends Error {
  constructor() {
    super();
    this.message =
      'There was an error trying to clear your authentication. Try again later.';
    this.name = 'ClearAuthenticationError';
  }
}
