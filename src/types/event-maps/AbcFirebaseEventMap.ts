import { IAbcIdsEventPayload, AbcFirebaseEvent, AbcMutationSource } from '../index';

/**
 * There are a few meta-events that the Firebase database provides to **ABC** and which are
 * stored to the `abc` module which is added to all
 */
export interface AbcFirebaseEventMap<T> {
  [AbcFirebaseEvent.firebase_connect]: IAbcIdsEventPayload<T, AbcMutationSource.firebase>;
  [AbcFirebaseEvent.firebase_disconnect]: IAbcIdsEventPayload<T, AbcMutationSource.firebase>;
  [AbcFirebaseEvent.firebase_login]: IAbcIdsEventPayload<T, AbcMutationSource.firebase>;
  [AbcFirebaseEvent.firebase_logout]: IAbcIdsEventPayload<T, AbcMutationSource.firebase>;
}
