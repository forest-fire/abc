import { IDictionary } from 'brilliant-errors';
import { FmModelConstructor } from 'firemodel';

/**
 * The ABC api surface for the local **Store**
 */
export type AbcStoreApi<TStorePlugin extends object> = IAbcStoreApi & TStorePlugin;

/**
 * Provides the ABC aspects of the `AbcStore` definition; most of this is
 * provided via the Store Plugin.
 */
export interface IAbcStoreApi {
  /**
   * Provides a dictionary of symbols for the various ABC API commands
   */
  abc: <T>(model: FmModelConstructor<T>) => IDictionary;
  // TODO: fixup the return typing of abc
}
