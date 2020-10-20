import { IDictionary } from 'brilliant-errors';
import { FmModelConstructor } from 'firemodel';
import { IAbstractedDatabase } from 'universal-fire';
import { IAbcStoreApi, IStoreDefinition } from '../plugins';

import { AbcServiceMap } from '../types/event-maps/AbcServiceMap';

let _config: IDictionary = {};

export const getConfig = () => _config;

/**
 * Configures ABC and returns a local store object with
 * ABC superpowers.
 */
export function createStore<TState, TServiceMap>(
  firebase: IAbstractedDatabase,
  storePlugin: IStoreDefinition<TState, AbcServiceMap<TServiceMap>>,
  configFn: (model, module) => void,
) {
  /** ABC's contribution to the store API */
  const abcStoreApi: IAbcStoreApi = {
    abc: (model: FmModelConstructor<any>) => {
      // TODO: implement
      return {};
    },
  };
  const storeCtx = {
    abcStoreApi,
  };
  const { module, model, store, getConfig } = storePlugin(storeCtx);
  _config = getConfig();
  return store;
}

// abc(Model, { singular: true })

// createStore(db, vegemix, (model, module) => [
//   model(Model, { all: [] }, { singular: true, handlers }),
//   module('path', {}),
// ]);
