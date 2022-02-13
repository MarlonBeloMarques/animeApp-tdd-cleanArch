import { AddItemToStorage } from '~/data/storage';

export class ItemStorageSpy implements AddItemToStorage {
  private _item: any;

  async addItem(item: any): Promise<void> {
    this._item = item;
  }

  get item(): any {
    return this._item;
  }
}
