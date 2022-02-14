import { GetAuthenticationToStorage } from '~/data/useCases';
import { GetAuthenticationError } from '~/data/errors';
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
      expect(error).toEqual(new GetAuthenticationError());
    }
  });

  test('should update storage authentication key value successfully', async () => {
    const itemStorageSpy = new ItemStorageSpy();
    const sut = new GetAuthenticationToStorage(itemStorageSpy);

    itemStorageSpy.add('@storage_AuthenticationKey', 'any_authentication');
    try {
      const authentication = await sut.get();
      expect(authentication.length).not.toEqual(0);
    } catch (error) {
      throw new Error('something unexpected occurred in your test');
    }

    try {
      sut.authenticationKey = '@storage_AuthKey';
      await sut.get();
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new GetAuthenticationError());
    }
  });
});
