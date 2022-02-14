import { AddItemToStorage, GetItemToStorage } from '~/data/storage';

export class ItemStorageSpy implements AddItemToStorage, GetItemToStorage {
  private _item: any;
  private _key!: string;

  async add(key: string, item: any): Promise<void> {
    this._key = key;
    this._item = item;
  }

  async get(): Promise<any> {
    return this._item;
  }

  get item(): any {
    return this._item;
  }

  get key(): string {
    return this._key;
  }
}
