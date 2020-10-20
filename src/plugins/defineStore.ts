import { IDictionary } from "common-types";
import { IAbcStoreApi } from "./store-plugin-types";

export interface IStoreConfig {
  module: () => {},
  model: () => {}
  store: IAbcStoreApi,
  getConfig: () => IDictionary
}

export type IStorePluginFnDefn<TState, TServiceMap> = (ctx: IDictionary) => IStoreConfig
export type IStoreDefinition<TState, TServiceMap> = IStorePluginFnDefn<TState, TServiceMap> & { kind: 'AbcStorePlugin'}

/**
 * Used by Store Management plugins to integrate into ABC
 */
let defineStore: IStoreDefinition<any, any> = ( <TState, TServiceMap>(ctx: IAbcStoreContext) => AbcStoreApi ) {


  /** the plugin's contribution to store's API surface provided by the API */
  let pluginStore: Omit<IDictionary, keyof IAbcStoreApi> & {state: TStateTree};
  let modelConfigApi: Omit<IDictionary, 

  return {};
}

defineStore.kind = 'AbcStorePlugin'

export { defineStore }
