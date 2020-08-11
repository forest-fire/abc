import { IDictionary } from 'brilliant-errors';
import { FmModelConstructor } from 'firemodel';
import { AbcEvents } from '../../event-maps/AbcServiceMap';
import { IStoreSubscriber, ISubscriptionCallback } from './index';

export interface IStoreDefinition<TState, TUserServiceMap extends object = {}> {
  /** the active state tree */
  state: TState;

  /**
   * Provides a dictionary of symbols for the various ABC API commands
   */
  abc: <T>(model: FmModelConstructor<T>) => IDictionary;
  // TODO: fixup the return typing of abc

  /**
   * Injects a callback function which is to be called whenever one of the "subscribed" events
   * is triggered.
   *
   * @param cb the function to be called when subscribed events are received
   * @param events when left off, all events are sent to subscriber but you can pair down
   * the subscription to only those you are interested in
   */
  subscribe(cb: ISubscriptionCallback<TUserServiceMap>, events?: AbcEvents<TUserServiceMap> | RegExp): IStoreSubscriber;

  /**
   *
   * @param subscriber
   */
  unsubscribe(subscriber: IStoreSubscriber): void;
}
