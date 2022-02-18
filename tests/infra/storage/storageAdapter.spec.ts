import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AddItemToStorage,
  ClearStorage,
  GetItemToStorage,
} from '~/data/storage';

describe('Infra: StorageAdapter', () => {
  test('should add item through storageAdapter successfully', async () => {
    const sut = new StorageAdapter();
    const storageKey = '@storage_key';
    const storageValue = 'storage_value';
    await sut.add(storageKey, storageValue);
    expect(AsyncStorage.setItem).toBeCalledWith(storageKey, storageValue);
  });

  test('should get item through storageAdapter successfully', async () => {
    const sut = new StorageAdapter();
    const storageKey = '@storage_key';
    await sut.get(storageKey);
    expect(AsyncStorage.getItem).toBeCalledWith(storageKey);
  });

  test('should clean through storageAdapter successfully', async () => {
    const sut = new StorageAdapter();
    await sut.clear();
    expect(AsyncStorage.clear).toBeCalled();
  });
});

class StorageAdapter
  implements AddItemToStorage, GetItemToStorage, ClearStorage
{
  async get(key: string): Promise<any> {
    await AsyncStorage.getItem(key);
  }
  async add(key: string, item: any): Promise<void> {
    await AsyncStorage.setItem(key, item);
  }
  async clear(): Promise<void> {
    await AsyncStorage.clear();
  }
}
