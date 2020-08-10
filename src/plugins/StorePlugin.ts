import { IDictionary } from 'common-types';
import { AbcLocalEventMap, AbcPluginType } from '../types';

export class StorePlugin<TState extends IDictionary, THandlers extends AbcLocalEventMap> {
  readonly kind = AbcPluginType.store;
  /** the plugin's name */
  readonly name: string;

  constructor(name: string, handlers: THandlers) {
    this.name = name;
  }
}
