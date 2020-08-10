/**
 * The _kind_ of event provides a way to inform the typing system
 * of explicitly what the event's structure will look like.
 */
export const enum AbcEventKind {
  /** a singular record is being mutated (add, update, remove) */
  record = 'record',
  /** a list of records are being mutated (add, update, remove) */
  list = 'list',
  /** a relationship between two records has changed */
  relationship = 'relationship',
  /**
   * An action which only passes in a record's _primary keys_ for identification purposes.
   */
  pks = 'pks',

  /**
   * The payload consists of key/values for properties on a Model with dynamic properties
   */
  dynamicPathProps = 'dynamicPathProps',

  auth = 'auth',
  connection = 'connection',

  /** Informational: an error has occurred within one of the state  */
  error = 'error',
}

/**
 * Indicates the source of a mutation event
 */
export const enum AbcMutationSource {
  /** a mutation was made locally to state; it has not come from a database */
  local = 'local',
  /**
   * the local database -- _typically IndexedDb_ -- has provided data which needs to
   * be incorporated into the local state
   */
  localDb = 'localDb',
  /**
   * the Firebase database has provided data which needs to be incorporated into the
   * local state
   */

  firebase = 'firebase',
}

export const enum AbcRequestType {
  /**
   * The event was born from a _discrete_ request for specified records
   * such as:
   *
   * ```ts
   *  getProducts(['abc', 'def'])
   * ```
   */
  discrete = 'discrete',
  /**
   * The event was born out of a _query_ based request such as:
   *
   * ```ts
   *  getProducts(where('status', 'active'))
   * ```
   */
  query = 'query',
  /**
   * The event was triggered by the app originating the addition of
   * of new record.
   *
   * ```ts
   *   addProduct({ ... })
   * ```
   */
  add = 'add',
  /**
   * The event was triggered by the app originating the non-destructive update
   * of an existing record.
   *
   * ```ts
   *   updateProduct("abcd", { ... })
   * ```
   */
  update = 'update',
  /**
   * The event was triggered by the app originating a removal call:
   *
   * ```ts
   *   removeProducts(["abcd", "efgh"])
   * ```
   */
  remove = 'remove',

  purge = 'purge',
  partialPurge = 'partialPurge',

  associate = 'associate',
  disassociate = 'disassociate',
}
