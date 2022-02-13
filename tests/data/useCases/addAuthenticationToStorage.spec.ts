import { AddAuthenticationToStorage } from '~/data/useCases';
import { AddAuthorizationError } from '~/data/errors';
import { ItemStorageSpy } from '../storage';

describe('Data: AddAuthenticationToStorage', () => {
  test('should add with AddItemToStorage correct authentication', () => {
    const [sut, itemStorageSpy] = makeSut();
    const authentication = 'any_authentication';
    sut.add(authentication);
    expect(authentication).toEqual(itemStorageSpy.item);
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
      expect(error).toEqual(new AddAuthorizationError());
    }
  });
});

const makeSut = (): [AddAuthenticationToStorage, ItemStorageSpy] => {
  const itemStorageSpy = new ItemStorageSpy();
  const sut = new AddAuthenticationToStorage(itemStorageSpy);
  return [sut, itemStorageSpy];
};
