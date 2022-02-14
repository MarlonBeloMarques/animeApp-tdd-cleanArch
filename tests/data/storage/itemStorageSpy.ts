import { AddItemToStorage, GetItemToStorage } from '~/data/storage';
import { UnexpectedError } from '~/data/errors';
import { ClearStorage } from '../useCases/clearAuthenticationToStorage.spec';

export class ItemStorageSpy
  implements AddItemToStorage, GetItemToStorage, ClearStorage
{
  private _item: any;
  private _key!: string;
  private isErrorWhenCleaning = false;

  async add(key: string, item: any): Promise<void> {
    this._key = key;
    this._item = item;
  }

  async get(key: string): Promise<any> {
    if (key === this._key) {
      return this._item;
    }
  }

  async clear(): Promise<void> {
    if (this.isErrorWhenCleaning) throw new UnexpectedError();
    this._item = null;
    this._key = '';
  }

  completeWithErrorWhenCleaning(): void {
    this.isErrorWhenCleaning = true;
  }

  get item(): any {
    return this._item;
  }

  get key(): string {
    return this._key;
  }
}
