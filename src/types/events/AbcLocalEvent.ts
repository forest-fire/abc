/**
 * The data events coming from ABC which require state management
 * handlers to mutate the local state.
 *
 * > **Note:** _all local state management plugins must provide handlers for
 * each of these events and all events are expected to mutate state_
 */
export const enum AbcLocalEvent {
  /**
   * Add a newly created record to local state. If this record already exists the
   * handler will throw an error extension of **AbcError** with a `code` of 'invalid-record'
   *
   * This is typically actuated by a local action (aka, not yet confirmed to reside
   * in a database yet) because it is most commonly the App which knows what is a "new"
   * record but another use-case for this is
   */
  add = 'add',
  /**
   * All records of a given model are removed and replaced with what is passed in
   * the payload.
   *
   * > **Note:** _for model's with dynamic paths, only those records on the same
   * dynamic path are affected; others will be left untouched._
   */
  set = 'set',
  /**
   * Merges in a set of records into the local store.
   *
   * - precendence is given to records coming from the database which overrides
   * the same records in the local store
   * - records which already existed in the store are retained
   *
   * > **Note:** _for model's with dynamic paths, only those records on the same
   * dynamic path are affected; others will be left untouched._
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
   * > **Note:** _this operation clears all records regardless of whether the
   * given model has a dynamic path or not_
   */
  purge = 'purge',
  /**
   * Associates two records together
   */
  associate = 'associate',
  /**
   * Disassociates two records
   */
  disassociate = 'disassociate',

  recordConfirm = 'recordConfirm',
  recordRollback = 'recordRollback',
  relationshipConfirm = 'relationshipConfirm',
  relationshipRollback = 'relationshipRollback',
}
