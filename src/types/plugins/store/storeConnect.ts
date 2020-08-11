import { IDictionary } from 'brilliant-errors';

/**
 * Used by Store Management plugins to integrate into ABC
 */
export function storeConnect<TState extends object>() {
  let storeApi: Omit<IDictionary, 'abc'> & {state: TState};
  let modelConfigApi: Omit<IDictionary, 

  return {};
}
