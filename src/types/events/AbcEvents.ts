import { AbcServiceMap } from '../event-maps/AbcServiceMap';
/**
 * Includes all ABC events and optionally adds any events passed in
 * as a ServiceMap dictionary (aka, the keys are the event names)
 */
export type AbcEvents<T extends object = {}> = keyof AbcServiceMap<any> | keyof T;
