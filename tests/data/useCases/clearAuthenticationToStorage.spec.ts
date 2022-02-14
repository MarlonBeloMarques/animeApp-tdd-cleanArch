import { ClearAuthenticationToStorage } from '~/data/useCases';
import { ClearAuthenticationError } from '~/data/errors';
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

  test('should have a ClearAuthenticationError exception when clearing', async () => {
    const itemStorageSpy = new ItemStorageSpy();
    const authentication = 'any_authentication';
    itemStorageSpy.add('@storage_AuthenticationKey', authentication);
    const sut = new ClearAuthenticationToStorage(itemStorageSpy);
    itemStorageSpy.completeWithErrorWhenCleaning();
    try {
      await sut.clear();
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new ClearAuthenticationError());
    }
  });
});
