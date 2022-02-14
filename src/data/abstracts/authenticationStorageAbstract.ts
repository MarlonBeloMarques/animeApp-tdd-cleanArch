export abstract class AuthenticationStorageAbstract {
  protected _authenticationKey = '@storage_AuthenticationKey';

  set authenticationKey(authenticationKey: string) {
    this._authenticationKey = authenticationKey;
  }
}
