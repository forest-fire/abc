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

const store = vegemite<IEventMap, IProductStore>({
  all: [],
  featured: [],
});

store.on('add', (state: IProductStore, product: Product) => {
  state.all.push(product);
});
store.on('remove', (state: IProductStore, productId: string) => {
  state.all = state.all.filter(i => i.id !== productId);
});

test('Dispatch changes state with add/remove handlers', async () => {
  const product: Product = { id: '1234', name: 'jelly beans', price: 2, category: 'foo', brand: '' };
  await store.dispatch('add', product);
  assert.equal(store.state.all.length, 1);
  await store.dispatch('remove', product.id as string);
  assert.equal(store.state.all.length, 0);
});

test.run();
