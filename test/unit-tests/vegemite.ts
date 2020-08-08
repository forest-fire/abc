import { test } from 'uvu';
import vegemite from 'vegemite';
import * as assert from 'uvu/assert';
import { Product } from '../models';

interface IProductStore {
  all: Product[];
  featured: string[];
}

interface IEventMap {
  add: Product;
  remove: string;
}

const events = {
  add: (state: IProductStore, product: Product) => {
    state.all.push(product);
  },
  remove: (state: IProductStore, productId: string) => {
    state.all = state.all.filter(i => i.id !== productId);
  },
};

Object.keys(events).forEach((evt: keyof typeof events) => {
  store.on(evt, events[evt]);
});

const store = vegemite<IEventMap, IProductStore>({
  all: [],
  featured: [],
});

test('Dispatch changes state with add/remove handlers', async () => {
  const product = { id: '1234', name: 'jelly beans', price: 2, category: 'foo' };
  await store.dispatch('add', product);
  assert.equal(store.state.all.length, 1);
  await store.dispatch('remove', product.id);
  assert.equal(store.state.all.length, 0);
});

test.run();
