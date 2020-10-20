import { IAbstractedDatabase } from 'universal-fire';
import { Model } from 'firemodel';
import { IAbcEventPayload } from './index';

export const enum LocalDatabase {
  /**
   * The only option at the moment; will eventually add
   * SQL Lite or some other appropriate in-memory DB for
   * the backend.
   */
  indexedDb = 'indexedDb',
}
export type ILocalDatabase = keyof typeof LocalDatabase;
