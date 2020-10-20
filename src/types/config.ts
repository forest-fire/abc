import { FmModelConstructor, Model } from 'firemodel';
import { IAbstractedDatabase } from 'universal-fire';
import { IAbcEventPayload, ILocalDatabase } from '.';

/**
 * Configuration properties for ABC Core
 */
export interface IAbcConfig {
  /** the models  */
  managedModels: IAbcModelConfig<any>[];
}

/**
 * A _per model_ configuration for ABC
 */
export interface IAbcModelConfig<T extends Model> {
  ctor: FmModelConstructor<T>;
  modelName: string;
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
