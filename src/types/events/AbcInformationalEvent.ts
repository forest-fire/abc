/**
 * There are data events fired into the local state management's handlers
 * which are purely informational about activities taken on the IndexedDB
 * (or any other DB serving as the local caching database) or the FirebaseDB.
 *
 * These events do not mutate state so depending on the framework they do
 * not need to be handled by the local state management framework (assuming
 * no error is generated as an outcome).
 */
export const enum AbcInformationalDbEvent {
  localDb_add = 'localDb_add',
  localDb_set = 'localDb_set',
  localDb_update = 'localDb_update',
  localDb_remove = 'localDb_remove',
  localDb_purge = 'localDb_purge',

  firebase_add = 'firebase_add',
  firebase_set = 'firebase_set',
  firebase_update = 'firebase_update',
  firebase_remove = 'firebase_remove',

  localDb_error = 'localDb_error',
  firebase_error = 'firebase_error',
}
