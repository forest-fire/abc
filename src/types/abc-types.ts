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

export interface IAbcApiConfig<T extends Model> {
  /**
   * When ABC receives data from either **Firebase** or **IndexedDB**
   * it will
   */
  dispatcher: (event: string, data: IAbcEventPayload<T>) => void;

  /**
   * By default models are assumed to be a _list_ of records but if
   * configured to be "singular" then only one record will be stored
   * in the local store.
   */
  singular?: boolean;

  /**
   * Currently the only local database is Indexed DB but eventually
   * other in-memory DB's for the backend will be added.
   */
  localDbType?: ILocalDatabase;

  /**
   * You can explicitly set the Firebase database access; if not set as an
   * option then it will rely on **Firemodel**'s _defaultDb_ being
   * set.
   */
  db?: IAbstractedDatabase;

  /**
   * **Firemodel** typically determines the local path for you -- based
   * on the plural name of the model -- but if you need to you can override
   * this path with whatever you like.
   */
  moduleName?: string;
}
