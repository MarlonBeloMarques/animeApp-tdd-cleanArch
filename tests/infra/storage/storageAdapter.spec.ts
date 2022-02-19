import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageAdapter } from '~/infra/storage';

describe('Infra: StorageAdapter', () => {
  test('should add item through storageAdapter successfully', async () => {
    const { storageKey, storageValue } = makeStorageParams();
    await makeSut().add(storageKey, storageValue);
    expect(AsyncStorage.setItem).toBeCalledWith(storageKey, storageValue);
  });

  test('should get item through storageAdapter successfully', async () => {
    const { storageKey } = makeStorageParams();
    await makeSut().get(storageKey);
    expect(AsyncStorage.getItem).toBeCalledWith(storageKey);
  });

  test('should clean through storageAdapter successfully', async () => {
    await makeSut().clear();
    expect(AsyncStorage.clear).toBeCalled();
  });
});

const makeSut = (): StorageAdapter => {
  return new StorageAdapter();
};

const makeStorageParams = (): { storageKey: string; storageValue: string } => {
  return { storageKey: '@storage_key', storageValue: 'storage_value' };
};
