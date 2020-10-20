import { IDictionary } from 'common-types';
import { IAbcApiConfig } from '../types';

let _config: IAbcApiConfig<any> & IDictionary = {};

export const getConfig: () => _config;
