import { IUnderlyingError } from 'firemodel';

export interface IAbcEventPayload<T> {
  /**
   * The records resulting from the ABC request.
   */
  payload: T | T[];
  /** if a list of records was returned the count will be returned */
  count?: number;
  /**
   * Indicates where the resultset has come from
   */
  source: 'local' | 'firebase';
}

export type IAbcEvent = keyof typeof AbcEvent;

export const enum AbcEvent {}
