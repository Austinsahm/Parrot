import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

export type DataAccessKey = string | number;

/**
 * Reactive store item
 */
export interface DataAccessEntry<V> {
  key: DataAccessKey,
  value: V
}

/**
 * Reactive storage class
 */
export class ReactiveStore<T> {

  private readonly _source: BehaviorSubject<DataAccessEntry<T>[]>;

  /**
   * Source observable that can be subscribed to for future values
   */
  get source$(): Observable<DataAccessEntry<T>[]> {
    return this._source.asObservable();
  }

  /**
   * Returns current values in the data store
   */
  get values(): DataAccessEntry<T>[] {
    return this._source.getValue();
  }

  /**
   * 
   * @param values Initial store values
   */
  constructor(values: DataAccessEntry<T>[] = []) {
    this._source = new BehaviorSubject<DataAccessEntry<T>[]>(values);
  }

  /**
   * Replaces entire entries of the store
   * @param entries 
   */
  setValues(...entries: DataAccessEntry<T>[]): void {
    this._source.next(entries);
  }

  /**
   * Replaces given items
   * @param entries
   */
  replace(...entries: DataAccessEntry<T>[]): void {

    const values = this.values.map((curEntry) => {
      const matchedItem = entries.find((curItem) => curItem.key === curEntry.key);
      return matchedItem || curEntry;
    });

    this.setValues(...values);
  }

  /**
   * Appends the given items to the end of the items in the store
   * @param entries
   */
  append(...entries: DataAccessEntry<T>[]): void {
    this.setValues(...[...this.values, ...entries]);
  }

  /**
   * Inserts the given items at the beginning of the items in the store
   * @param entries
   */
  prepend(...entries: DataAccessEntry<T>[]): void {
    this.setValues(...[...entries, ...this.values]);
  }

  /**
   * Removes items with the given keys from the store
   * @param keys
   */
  remove(...keys: DataAccessKey[]): void {
    const values = this.values.filter((curEntry) => !keys.includes(curEntry.key));
    this.setValues(...values);
  }

  /**
   * Finds a single entry by key
   * @param key 
   */
  find(key: DataAccessKey): DataAccessEntry<T> {
    return this.values.find((entry) => entry.key === key);
  }

  /**
   * Sorts items currently in the store by given function
   * @param compareFn 
   */
  sort(compareFn: (value: T) => number): void {
    const values = this.values.sort((value) => compareFn(value.value));
    this.setValues(...values);
  }
}

/**
 * Base data access service
 * NOTE: NONE OF THE METHODS IN THIS CLASS DIRECTLY MODIFIES DATA ON THE SERVER
 */
export abstract class AbstractDataAccessService<T> {

  /**
   * Reactive storage
   */
  private readonly _store: ReactiveStore<T>;

  /**
   * Observables containing all futures values
   */
  get source$(): Observable<T[]> {
    return this._store.source$.pipe(map((values) => {
      return values.map((value) => value.value);
    }));
  }

  /**
   * Contains all items currently in the store
   */
  get values(): T[] {
    return this._store.values.map((entry) => entry.value);
  }

  /**
   * Contains keys of all items currently in the store
   */
  get keys(): DataAccessKey[] {
    return this._store.values.map((entry) => entry.key);
  }

  constructor(values: T[] = []) {
    this._store = new ReactiveStore<T>(this._createEntries(values));
  }

  private _createEntry(item: T): DataAccessEntry<T> {
    return { key: this.getKey(item), value: item };
  }

  private _createEntries(items: T[]): DataAccessEntry<T>[] {
    return items.map((item) => this._createEntry(item));
  }

  /**
   * Method that returns the unique identifier of a given store entry
   * @param entry 
   */
  protected abstract getKey(entry: T): DataAccessKey;

  /**
   * Appends given items to those in the store.
   * @param items 
   */
  append(...items: T[]): void {
    this._store.append(...this._createEntries(items));
  }

  /**
   * Sets a new value
   * @param items 
   */
  setValues(...items: T[]): void {
    this._store.setValues(...this._createEntries(items));
  }

  /**
  * Prepends given items to those in the store
  * @param items 
  */
  prepend(...items: T[]): void {
    this._store.prepend(...this._createEntries(items));
  }

  /**
  * Replaces matching in the store
  * @param items 
  */
  replace(...items: T[]): void {
    this._store.replace(...this._createEntries(items));
  }

  /**
   * Removes given items from the store
   * @param items 
   */
  remove(...items: T[]): void {
    const keys = items.map((item) => this.getKey(item));
    this._store.remove(...keys);
  }

  /**
   * Finds a single item by key
   * @param key 
   */
  find(key: DataAccessKey): T {
    return this._store.find(key)?.value;
  }
}
