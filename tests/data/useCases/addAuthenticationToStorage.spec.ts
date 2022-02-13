describe('Data: AddAuthenticationToStorage', () => {
  test('should add with AddItemToStorage correct authentication', () => {
    const itemStorageSpy = new ItemStorageSpy();
    const sut = new AddAuthenticationToStorage(itemStorageSpy);
    const authentication = 'any_authentication';
    sut.add(authentication);
    expect(authentication).toEqual(itemStorageSpy.item);
  });

  test('should add with AddItemToStorage if it is a valid authentication', () => {
    const itemStorageSpy = new ItemStorageSpy();
    const sut = new AddAuthenticationToStorage(itemStorageSpy);
    const authentication = '';
    sut.add(authentication);
    expect(itemStorageSpy.item).toBeUndefined();
  });
});

class AddAuthenticationToStorage implements AddAuthentication {
  constructor(private readonly addItemToStorage: AddItemToStorage) {}

  async add(authentication: string): Promise<void> {
    if (this.authenticationIsValid(authentication)) {
      this.addItemToStorage.addItem(authentication);
    } else {
      throw new AddAuthorizationError();
    }
  }

  private authenticationIsValid(authentication: string): boolean {
    if (authentication.length !== 0) {
      return true;
    }

    return false;
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

class AddAuthorizationError extends Error {
  constructor() {
    super();
    this.message =
      'Your authorization is not valid. Try to authenticate again.';
    this.name = 'AddAuthorizationError';
  }
}
