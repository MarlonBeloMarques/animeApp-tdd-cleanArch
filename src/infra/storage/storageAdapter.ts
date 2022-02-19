import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AddItemToStorage,
  ClearStorage,
  GetItemToStorage,
} from '~/data/storage';

export class StorageAdapter
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
