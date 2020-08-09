import type { StorePlugin } from "../plugins";

export const enum AbcPluginType {
  store = 'store',
  localDb = 'localDb',
}

export type AbcStorePluginInterface = <T extends StorePlugin<T>>() => StorePlugin<T>;

export type Abc