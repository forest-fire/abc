import { test } from 'uvu';
import vegemite from 'vegemite';
import * as assert from 'uvu/assert';
import { Product } from '../models';

interface IProductStore {
  all: Product[];
}

const store = vegemite<any, IProductStore>({
  all: [],
});

store.on('add::product', (state, product: Product) => {
  state.all.push(product);
});
store.on('remove:product', (state, productId) => {
  state.all = state.all.filter(i => i.id !== productId);
});

test('Dispatch changes state with add/remove handlers', async () => {
  const product = { id: '1234', name: 'jelly beans', price: 2, category: 'foo' };
  await store.dispatch('add::product', product);
  assert.equal(1, store.state.all.length);
  await store.dispatch('remove::product', product.id);
  assert.equal(0, store.state.all.length);
});

test.run();
