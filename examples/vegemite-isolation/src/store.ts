import { IAbstractedDatabase, RealTimeClient } from 'universal-fire';
import vegemite from '@forest-fire/abc-plugin-vegemite';

export const firebase = RealTimeClient.create({ mocking: true });
export const store = createStore(firebase);

// import { createStore } from '@forest-fire/abc';
// export const store = createStore(RealTimeClient, vegemite, AbcStrategy.isolated);
