export interface IStoreSubscriber {
  readonly kind: 'AbcSubscriber';
  unsubscribe: () => void;
}

export interface ISubscriptionCallback<TServiceMap> {
  (evt: keyof TServiceMap, ) => void
}
