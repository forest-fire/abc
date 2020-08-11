import { IAbcIdsEventPayload, AbcMutationSource, AbcInformationalDbEvent, IAbcModelPayload } from '../index';

/**
 * Informational-only events about changes to either the Firebase or local database's
 * state.
 */
export interface IAbcInformationalEventMap<T> {
  [AbcInformationalDbEvent.localDb_add]: IAbcIdsEventPayload<T, AbcMutationSource.localDb>;
  [AbcInformationalDbEvent.localDb_set]: IAbcIdsEventPayload<T, AbcMutationSource.localDb>;
  [AbcInformationalDbEvent.localDb_update]: IAbcIdsEventPayload<T, AbcMutationSource.localDb>;
  [AbcInformationalDbEvent.localDb_remove]: IAbcIdsEventPayload<T, AbcMutationSource.localDb>;
  [AbcInformationalDbEvent.localDb_purge]: IAbcModelPayload<T, AbcMutationSource.localDb>;

  [AbcInformationalDbEvent.firebase_add]: IAbcIdsEventPayload<T, AbcMutationSource.firebase>;
  [AbcInformationalDbEvent.firebase_set]: IAbcIdsEventPayload<T, AbcMutationSource.firebase>;
  [AbcInformationalDbEvent.firebase_update]: IAbcIdsEventPayload<T, AbcMutationSource.firebase>;
  [AbcInformationalDbEvent.firebase_remove]: IAbcIdsEventPayload<T, AbcMutationSource.firebase>;
}
