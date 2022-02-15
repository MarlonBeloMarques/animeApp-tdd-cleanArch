import { ClearAuthenticationToStorage } from '~/data/useCases';
import { ClearAuthenticationError } from '~/data/errors';
import { ItemStorageSpy } from '../storage';

describe('Data: ClearAuthenticationToStorage', () => {
  test('should clear authentication of storage with successfully', async () => {
    const authentication = 'any_authentication';
    const [sut, itemStorageSpy] = makeSut(authentication);
    await sut.clear();
    expect(itemStorageSpy.item).not.toEqual(authentication);
  });

  test('should have a ClearAuthenticationError exception when clearing', async () => {
    const [sut, itemStorageSpy] = makeSut();
    itemStorageSpy.completeWithErrorWhenCleaning();
    try {
      await sut.clear();
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new ClearAuthenticationError());
    }
  });
});

const makeSut = (
  authentication = 'any_authentication',
): [ClearAuthenticationToStorage, ItemStorageSpy] => {
  const itemStorageSpy = new ItemStorageSpy();
  const sut = new ClearAuthenticationToStorage(itemStorageSpy);
  itemStorageSpy.add('@storage_AuthenticationKey', authentication);
  return [sut, itemStorageSpy];
};
