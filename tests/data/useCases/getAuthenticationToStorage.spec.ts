import { ItemStorageSpy } from '../storage';

describe('Data: GetAuthenticationToStorage', () => {
  test('should get with success authentication of storage', async () => {
    const itemStorageSpy = new ItemStorageSpy();
    const sut = new GetAuthenticationToStorage(itemStorageSpy);
    itemStorageSpy.add('@storage_AuthenticationKey', 'any_authentication');
    const authentication = await sut.get();
    expect(authentication.length).not.toEqual(0);
  });
});

class GetAuthenticationToStorage implements GetAuthentication {
  constructor(private readonly getItemToStorage: GetItemToStorage) {}

  async get(): Promise<string> {
    const authenticationKey = '@storage_AuthenticationKey';
    return this.getItemToStorage.get(authenticationKey);
  }
}

interface GetAuthentication {
  get(): Promise<string>;
}

export interface GetItemToStorage {
  get(key: string): Promise<any>;
}
