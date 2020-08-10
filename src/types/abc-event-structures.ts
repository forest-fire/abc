import { Model } from 'firemodel';
import { ConstructorFor } from './general';

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
  /** Informational: a change to the local database -- _usually IndexedDB_ - has completed */
  localDb = 'localDb',
  /** Informational: a change to Firebase has completed */
  firebase = 'firebase',
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
   * getProducts(['abc', 'def'])
   * ```
   */
  discrete = 'discrete',
  /**
   * The event was born out of a _query_ based request such as:
   *
   * ```ts
   * getProducts(where('status', 'active'))
   * ```
   */
  query = 'query',
  add = 'add',
  update = 'update',
  remove = 'remove',
}

export interface IAbcRecordEventPayload<T> extends IAbcBaseEvent<T> {
  kind: AbcEventKind.record;
  /**
   * A record which needs mutation in the local state tree
   */
  payload: T;
  modelName: string;
  modelOffset: string;
  originatingRequest: Exclude<AbcRequestType, AbcRequestType.query | AbcRequestType.remove>;
}

export interface IAbcListEventPayload<T> extends IAbcBaseEvent<T> {
  kind: AbcEventKind.list;
  /**
   * The list of records needing mutation in the local state tree
   */
  payload: T[];
  modelName: string;
  modelOffset: string;
  /** the number of records in the payload */
  count: number;
  originatingRequest: Exclude<AbcRequestType, AbcRequestType.remove>;
}

/**
 * A base for all ABC events which reinforces the
 * requirement of a `kind` which in turn enforces
 * the union type across event types
 */
export interface IAbcBaseEvent<T extends Model = Model> {
  /** the _kind_ of message structure used in this event */
  kind: AbcEventKind;
  /** the main data component of an event */
  payload: any | never;
  /** the _data source_ of the event (aka, local change, local db, firebase) */
  source: AbcMutationSource;
  /** The kind of request (e.g., discrete, query, add, remove, ...) which originated the event */
  originatingRequest: AbcRequestType | never;
  /** The name of the model being operated on */
  modelName?: string;
  /**
   * The offset from the root state, where the the model being operated on resides.
   * Local offsets are by default just the plural name of the model:
   *
   * ```ts
   *    export store.abc(Product)
   * ```
   * or the singular model name if you specified the state tree to just store one of this
   * model type:
   *
   * ```ts
   *    export store.abc(UserProfile, { singular: true })
   * ```
   *
   * but can also be explicitly forced to whatever you like:
   *
   * ```ts
   *    export store.abc(UserProfile, { localOffset: 'customers' })
   * ```
   */
  localOffset?: string;
}
