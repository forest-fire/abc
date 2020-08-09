import { IDictionary } from 'common-types';
import { ConstructorFor } from '../types/general';
import { AbcPluginType } from './types';

export abstract class StorePlugin<TState extends IDictionary> {
  readonly kind: AbcPluginType.store;
  /** a reference to the state tree that is being managed */
  abstract get state(): TState;
  abstract get handlers(): 
}
