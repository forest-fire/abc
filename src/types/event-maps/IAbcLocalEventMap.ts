import type { Model } from 'firemodel';
import {
  IAbcIdsEventPayload,
  AbcMutationSource,
  AbcLocalEvent,
  IAbcRecordEventPayload,
  IAbcListEventPayload,
  IAbcDynamicPathPayload,
  IAbcModelPayload,
  IAbcRelationshipPayload,
} from '../index';

/**
 * Provides a _typing_ lookup service for incoming `AbcLocalEvent` events,
 * indicating what type the payload of the event will be.
 */
export interface IAbcLocalEventMap<T extends Model = Model, TSecondary extends Model = Model> {
  [AbcLocalEvent.add]: IAbcRecordEventPayload<T, AbcMutationSource.local>;
  [AbcLocalEvent.merge]: IAbcListEventPayload<T, AbcMutationSource>;
  [AbcLocalEvent.mergeRemoval]: IAbcListEventPayload<T, AbcMutationSource>;
  [AbcLocalEvent.partialPurge]: IAbcDynamicPathPayload<T, AbcMutationSource.local>;
  [AbcLocalEvent.purge]: IAbcModelPayload<T, AbcMutationSource.local>;
  [AbcLocalEvent.remove]: IAbcIdsEventPayload<T, AbcMutationSource.local>;
  [AbcLocalEvent.set]: IAbcRecordEventPayload<T, AbcMutationSource>;
  [AbcLocalEvent.update]: IAbcRecordEventPayload<T, AbcMutationSource>;
  [AbcLocalEvent.associate]: IAbcRelationshipPayload<T, TSecondary>;
  [AbcLocalEvent.disassociate]: IAbcRelationshipPayload<T, TSecondary>;
}
