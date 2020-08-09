import { IUnderlyingError } from 'firemodel';

/**
 * The data events coming from ABC which require state management
 * handlers to mutate the local state.
 *
 * > **Note:** _all local state management plugins must provide handlers for
 * each of these events and all events are expected to mutate state_
 */
export const enum AbcLocalEvent {
  /**
   * All records of a given model are removed and replaced with what is passed in
   * the payload.
   *
   * > **Note:** for model's with dynamic paths, only those records on the same
   * dynamic path are affected; others will be left untouched.
   */
  set = 'set',
  /**
   * Merges in a set of records into the local store.
   *
   * - precendence is given to records coming from the database which overrides
   * the same records in the local store
   * - records which already existed in the store are retained
   *
   * > **Note:** for model's with dynamic paths, only those records on the same
   * dynamic path are affected; others will be left untouched.
   */
  merge = 'merge',
  /**
   * The same as a _merge_, except used for cases where a discrete request for a record
   * has returned `null` indicating that this record no longer exists.
   */
  mergeRemoval = 'mergeRemoval',
  /**
   * Updates one or more records in the store non-destructively.
   */
  update = 'update',
  /**
   * Removes a record or a list of records from the store
   */
  remove = 'remove',
  /**
   * Clears all records within of a segment of a dynamically-pathed model
   */
  partialPurge = 'partialPurge',
  /**
   * Clear all records of a particular model from the store.
   *
   * > Note: this operation clears all records regardless of whether the
   * given model has a dynamic path or not
   */
  purge = 'purge',
}

/**
 * There are data events fired into the local state management's handlers
 * which are purely informational about activities taken on the IndexedDB
 * (or any other DB serving as the local caching database).
 *
 * These events do not mutate state so depending on the framework they can
 * either be ignored or handled (to avoid error messages about "unknown xxx", etc).
 *
 * Their value is actually quite high, however, debugging and development to
 * better understand about how state changes have serialized over time.
 */
export const enum AbcLocalDbEvent {
  /** set a single record in the local database */
  setLocalRecord = 'setLocalRecord',
  updatedLocalRecord = 'updatedLocalRecord',
  /**
   * records any local database error; in addition to the error message
   * it provides context about the db operation as well as if the code
   * _handled_ the error or not.
   */
  localDbError = 'localDbError',
}
