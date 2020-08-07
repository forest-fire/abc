import { IAbstractedDatabase } from 'universal-fire';
import { Model } from 'firemodel';
import { IAbcEvent, IAbcEventPayload } from './index';

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
  dispatcher: (event: IAbcEvent, data: IAbcEventPayload<T>) => void;

  /**
   * Indicates whether the Vuex store is storing a _list_
   * of this type of `Model` or just a single _record_.
   *
   * If this property is not stated than it will be assumed
   * to be `true`.
   */
  isList?: boolean;
  /**
   * Indicates whether ABC should cache this `Model`
   * in **IndexedDB** or not. Default is set to **true**.
   *
   * **Note:** there's very little reason to use the ABC API if you
   * _aren't_ going to use the IndexedDB but there may be cases
   * where a particular model is not desirable to be in IndexedDB
   * but you want to preserve the same API surface for it.
   */
  useIndexedDb?: boolean;

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
   *
   * **Note:** this path will be used not only in the **ABC** API but also when
   * responding to Firemodel mutations as well.
   */
  moduleName?: string;
}
