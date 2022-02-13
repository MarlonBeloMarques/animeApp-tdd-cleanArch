export interface AddItemToStorage {
  add(key: string, item: any): Promise<void>;
}
