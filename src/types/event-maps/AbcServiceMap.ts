import { Model } from 'firemodel';
import { IAbcFirebaseEventMap, IAbcInformationalEventMap, IAbcLocalEventMap } from './index';

export type AbcServiceMap<T extends Model = Model> = IAbcFirebaseEventMap<T> &
  IAbcInformationalEventMap<T> &
  IAbcLocalEventMap;
