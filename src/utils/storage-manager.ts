/**
 * Local/session storage key getter. Gets an object/token either from session storage or local storage
 *
 * @param key Object key identifier
 * @return object stored on the key component
 */
import { StorageTableConfigInterface } from '../interfaces/utils.interface';

export function getStorageObject(key: string): any {
  if (sessionStorage.getItem(key)) {
    return JSON.parse(<string>sessionStorage.getItem(key));
  } else if (localStorage.getItem(key)) {
    return JSON.parse(<string>localStorage.getItem(key));
  }
}

/**
 * Local/session storage key remover
 *
 * @param key Object key identifier
 */
export function removeStorageObject(key: string): void {
  sessionStorage.removeItem(key);
  localStorage.removeItem(key);
}

/**
 * Local/session storage key setter
 *
 * @param key Object key identifier
 * @param value Object with the value to be stored
 * @param storage Storage section, should be either 'local' or 'session'
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function setStorageObject<T>(key: string, value: T, storage = 'local'): void {
  if (storage === 'session') {
    sessionStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

// TODO: Review typing on first use
interface TableConfiguration {
  filter: Record<string, unknown>;
  page: number;
}

type MultipleTableConfig = Record<string, TableConfiguration>;

/**
 * Save a table configuration: current page, selected filter, etc.
 */
export function setStorageTableConfig(storage: string, table: string, config: TableConfiguration): void {
  let sessionParam: MultipleTableConfig = getStorageObject(storage);
  if (!sessionParam) {
    sessionParam = {};
  }

  sessionParam[table] = config;

  setStorageObject(storage, sessionParam, 'local');
}

export function getStorageTableConfig(storageName: string, table: string): StorageTableConfigInterface | null {
  const tableConfs: Record<string, StorageTableConfigInterface> = getStorageObject(storageName);

  if (tableConfs) {
    return tableConfs[table];
  } else {
    return null;
  }
}
