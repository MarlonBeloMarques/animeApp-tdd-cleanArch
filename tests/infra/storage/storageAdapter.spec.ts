import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddItemToStorage } from '~/data/storage';

describe('Infra: StorageAdapter', () => {
  test('should add item with storageAdapter successfully', async () => {
    const sut = new StorageAdapter();
    const storageKey = '@storage_key';
    const storageValue = 'storage_value';
    await sut.add(storageKey, storageValue);
    expect(AsyncStorage.setItem).toBeCalledWith(storageKey, storageValue);
  });
});

class StorageAdapter implements AddItemToStorage {
  async add(key: string, item: any): Promise<void> {
    await AsyncStorage.setItem(key, item);
  }
}
