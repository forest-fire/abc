export enum AbcEventType {}

export interface IAbcRecordEventPayload<T> {
  singular: true;
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

export interface IAbcListEventPayload<T> {
  singular: false;
  /**
   * The records resulting from the ABC request.
   */
  payload: T[];
  /** if a list of records was returned the count will be returned */
  count: number;
  /**
   * Indicates where the resultset has come from
   */
  source: 'local' | 'firebase';
  /**
   *
   */
}

export interface IAbcEventBase<T> {
  singular: AbcEventType;
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
  /**
   *
   */
}
