import { AddAuthenticationToStorage } from '~/data/useCases';
import { AddAuthenticationError } from '~/data/errors';
import { ItemStorageSpy } from '../storage';
import { makeAuthentication } from '../helpers';

describe('Data: AddAuthenticationToStorage', () => {
  test('should add with AddItemToStorage correct authentication', () => {
    const [sut, itemStorageSpy] = makeSut();
    const authentication = makeAuthentication();
    sut.add(authentication);
    expect(authentication).toEqual(itemStorageSpy.item);
  });

  test('should add with storage key with AddItemToStorage', () => {
    const [sut, itemStorageSpy] = makeSut();
    const authentication = makeAuthentication();
    sut.add(authentication);
    expect(itemStorageSpy.key.length).not.toEqual(0);
  });

  test('not should add with AddItemStorage if it is not valid authentication', () => {
    const [sut, itemStorageSpy] = makeSut();
    sut.add('');
    expect(itemStorageSpy.item).toBeUndefined();
  });

  test('should return exception with AddItemStorage if it is not valid authentication', async () => {
    const [sut] = makeSut();
    try {
      await sut.add('');
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new AddAuthenticationError());
    }
  });

  test('should update storage authentication key value successfully', async () => {
    const itemStorageSpy = new ItemStorageSpy();
    const sut = new AddAuthenticationToStorage(itemStorageSpy);
    sut.add(makeAuthentication());
    expect(itemStorageSpy.key).toEqual('@storage_AuthenticationKey');
    sut.authenticationKey = '@storage_AuthKey';
    sut.add(makeAuthentication());
    expect(itemStorageSpy.key).toEqual('@storage_AuthKey');
  });
});

const makeSut = (): [AddAuthenticationToStorage, ItemStorageSpy] => {
  const itemStorageSpy = new ItemStorageSpy();
  const sut = new AddAuthenticationToStorage(itemStorageSpy);
  return [sut, itemStorageSpy];
};
