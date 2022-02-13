describe('Data: AddAuthenticationToStorage', () => {
  test('should add with AddItemToStorage correct authentication', () => {
    const itemStorageSpy = new ItemStorageSpy();
    const sut = new AddAuthenticationToStorage(itemStorageSpy);
    const authentication = 'any_authentication';
    sut.add(authentication);
    expect(authentication).toEqual(itemStorageSpy.item);
  });
});

class AddAuthenticationToStorage implements AddAuthentication {
  constructor(private readonly addItemToStorage: AddItemToStorage) {}

  async add(authentication: string): Promise<void> {
    this.addItemToStorage.addItem(authentication);
  }
}

class ItemStorageSpy implements AddItemToStorage {
  private _item: any;

  async addItem(item: any): Promise<void> {
    this._item = item;
  }

  get item(): any {
    return this._item;
  }
}

interface AddItemToStorage {
  addItem(item: any): Promise<void>;
}

interface AddAuthentication {
  add(authentication: string): Promise<void>;
}
