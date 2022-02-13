import { ItemStorageSpy } from '../storage';

describe('Data: GetAuthenticationToStorage', () => {
  test('should get with success authentication of storage', async () => {
    const itemStorageSpy = new ItemStorageSpy();
    const sut = new GetAuthenticationToStorage(itemStorageSpy);
    itemStorageSpy.add('@storage_AuthenticationKey', 'any_authentication');
    const authentication = await sut.get();
    expect(authentication.length).not.toEqual(0);
  });

  test('should get an error when trying to get authentication from storage', async () => {
    const itemStorageSpy = new ItemStorageSpy();
    const sut = new GetAuthenticationToStorage(itemStorageSpy);
    try {
      await sut.get();
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new GetAuthorizationError());
    }
  });
});

class GetAuthenticationToStorage implements GetAuthentication {
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

interface GetAuthentication {
  get(): Promise<string>;
}

export interface GetItemToStorage {
  get(key: string): Promise<any>;
}

export class GetAuthorizationError extends Error {
  constructor() {
    super();
    this.message =
      'Your authorization was not found. Try authenticating again.';
    this.name = 'GetAuthorizationError';
  }
}
