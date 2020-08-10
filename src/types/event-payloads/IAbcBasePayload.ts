import type { Model } from 'firemodel';
import { AbcEventKind, AbcMutationSource, AbcRequestType } from '../index';

/**
 * A base for all ABC events which reinforces the
 * requirement of a `kind` which in turn enforces
 * the union type across event types
 */
export interface IAbcBasePayload<T extends Model, S extends AbcMutationSource> {
  /** the _kind_ of message structure used in this event */
  kind: AbcEventKind;
  /** the main data component of an event */
  payload: any | never;
  /** the _data source_ of the event (aka, local change, local db, firebase) */
  source: S;
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
