import { AddItemToStorage } from '~/data/storage';
import { GetItemToStorage } from '../useCases/getAuthenticationToStorage.spec';

export class ItemStorageSpy implements AddItemToStorage, GetItemToStorage {
  private _item: any;

  async add(item: any): Promise<void> {
    this._item = item;
  }

  async get(): Promise<any> {
    return this._item;
  }

  get item(): any {
    return this._item;
  }
}
