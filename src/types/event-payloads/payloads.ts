import type { IPrimaryKey, Model } from 'firemodel';
import { AbcEventKind, AbcMutationSource, AbcRequestType, IAbcBasePayload } from '../index';

//#region event payloads
export interface IAbcRecordEventPayload<T, S extends AbcMutationSource> extends IAbcBasePayload<T, S> {
  kind: AbcEventKind.record;
  /**
   * A record which needs mutation in the local state tree
   */
  payload: T;
  modelName: string;
  localOffset: string;
  originatingRequest: Exclude<AbcRequestType, AbcRequestType.query | AbcRequestType.remove>;
}

export interface IAbcListEventPayload<T, S extends AbcMutationSource> extends IAbcBasePayload<T, S> {
  kind: AbcEventKind.list;
  /**
   * The list of records needing mutation in the local state tree
   */
  payload: T[];
  modelName: string;
  localOffset: string;
  /** the number of records in the payload */
  count: number;
  originatingRequest: Exclude<AbcRequestType, AbcRequestType.remove>;
}

export interface IAbcIdsEventPayload<T, S extends AbcMutationSource> extends IAbcBasePayload<T, S> {
  kind: AbcEventKind.pks;
  /** The primary keys of records which this action be taken on */
  payload: IPrimaryKey<T>[];
  modelName: string;
  localOffset: string;
  /** the number of records in the payload */
  count: number;
  orginatingRequest: AbcRequestType.remove;
}

/**
 * Changes relating to a particular "path" on a dynamically pathed `Model`
 */
export interface IAbcDynamicPathPayload<T, S extends AbcMutationSource> extends IAbcBasePayload<T, S> {
  kind: AbcEventKind.dynamicPathProps;
  /**
   * The properties on a dynamically pathed `Model` with the exclusion of the `id` property.
   * The goal is to identify the _set_ of records which are on this "path".
   */
  payload: Omit<Partial<T>, 'id' | 'lastUpdated' | 'createdAt'>; // TODO: tighten typing
  modelName: string;
  localOffset: string;
  orginatingRequest: AbcRequestType.partialPurge;
}

/**
 * Changes relating to the `Model` at large
 */
export interface IAbcModelPayload<T, S extends AbcMutationSource> extends IAbcBasePayload<T, S> {
  kind: AbcEventKind.dynamicPathProps;
  payload: undefined;
  modelName: string;
  localOffset: string;
  orginatingRequest: AbcRequestType.purge;
}

export interface IAbcRelationshipPayload<TPrimary extends Model, TSecondary extends Model>
  extends IAbcBasePayload<TPrimary, AbcMutationSource.local> {
  kind: AbcEventKind.relationship;
  payload: undefined;

  pk: IPrimaryKey<TPrimary>;
  /**
   * The `Model` representing the "primary" in a relationship based event
   */
  pkModel: string;
  /**
   * The "primary" model's offset from the root state in local state.
   * By default this is the plural name of the model.
   */
  pkOffset: string;
  pkCardinality: 'one' | 'many';

  fk: IPrimaryKey<TSecondary>;
  /**
   * The `Model` representing the "secondary" in a relationship based event
   */
  fkModel: string;
  /**
   * The "secondary" model's offset from the root state in local state.
   * By default this is the plural name of the model.
   */
  fkOffset: string;
  fkCardinality: 'one' | 'many';

  orginatingRequest: AbcRequestType.associate | AbcRequestType.disassociate;
}

export interface IAbcAuthPayload extends IAbcBasePayload<never, AbcMutationSource.firebase> {
  kind: AbcEventKind.auth;
  payload: undefined;
  uid: string;
}
export interface IAbcConnectionPayload extends IAbcBasePayload<never, AbcMutationSource.firebase> {
  kind: AbcEventKind.connection;
  payload: undefined;
  connected: boolean;
}

//#endregion event payloads

export type IAbcEventPayload<T> =
  | IAbcAuthPayload
  | IAbcConnectionPayload
  | IAbcRelationshipPayload<T, any>
  | IAbcModelPayload<T, any>
  | IAbcDynamicPathPayload<T, any>
  | IAbcIdsEventPayload<T, any>
  | IAbcListEventPayload<T, any>
  | IAbcRecordEventPayload<T, any>
  | IAbcRelationshipPayload<T, any>;
