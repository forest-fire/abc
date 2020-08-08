---
sidebar: auto
---
# Getting Started

## Install Deps

In order to use the ABC API you must have [**Firemodel**](https://firemodel.info) and [**universal-fire**](https://universal-fire.net) installed:

```sh
# npm
npm install firemodel universal-fire abc --save
# yarn
yarn add firemodel universal-fire abc
```

## Creating a Store(s)



## Dispatching
**ABC** responds to data changes by packaging it up as an "event" and _dispatching_ it. Dispatching is the bridge used to move the change to the state management tool of your choice. In order to add your favorite state management tool you just need to respond to the events provided by ABC and then mutate the state in the way your tool proscribes.

All frameworks require a very simple "plugin" to provide dispatcher functionality which really is no more than a function which conforms to the `AbcDispatchPlugin` type defined below:

```typescript
export type AbcDispatchPlugin = () => {  
  dispatcher: AbcDispatchFunction,
  handlers: AbcHandlerLibrary
}

export type AbcDispatchFunction = <T>(event: string, payload: T) => Promise<void>
```

<!-- TODO: bring in type definition for AbcHandlerLibrary, or more likely link out to it -->

### Included Plugins

We include two plugins that are officially maintained and if you've developed one for another framework let us know and we'll link to it. Offical plugins are:

1. [Vuex](https://vuex.vuejs.org/)
2. [Vegemite](https://github.com/lukeed/vegemite)

> both plugins can be found on Github under the **forest-fire** organization: [vuex plugin](https://github.com/forest-fire/abc-dispatch-vuex), [vegemite plugin](https://github.com/forest-fire/abc-dispatch-vegemite) and should as good instruction for anyone wanting to create their own

## The Store

The "store" is the in-memory data structure that the frontend framework will leverage to *reactively* update pages in the DOM. Structurally they start out as a generic dictionary but then must be _shaped_ into a form that is useful for the application. The specifics of each framework are not important to ABC but there are three broad-based formats that ABC supports:

1. Single Store, Namespaced

    Frameworks such as **Vuex**, assume a single data structure for the store. However, they do provide the concept of a "module" so that different parts of the tree (aka, modules) can be namespaced and avoid
    any collisions with one another in terms of mutations/reducers/etc.

2. Store per Model

    Frameworks like **Vegemite** can be setup as a single store but are often better structured on a "store per model" basis. This provides the namespace isoloation that modules provide along with other flexibility that can sometimes be important.  

ABC's only requirement about the store is that you 
<!-- TODO: finish this off -->

## Configuring ABC

Configuration of ABC is done on a model-by-model basis and would look something like this if you were using the Vegemite plugin:

```ts
import { Product } from '../models';
import dispatcher from '@forest-fire/abc-dispatch-vegemite';

// basic config
export const [ getProducts, watchProducts, loadProducts, syncProducts ] 
  = abc(Product, dispatcher);
```

There are more advanced configurations which you can try later -- described in [Configuring ABC]() section) -- but at this point you have the ABC functions you'll need to interact with your `Product` model.

## Example: Vegemite

To illustrate we'll use a simple example where we have only one model `Product` and we've decided to use the **Vegemite** state manager in a "one store to model" configuration. 

### Create the `Product` Model

ABC works with [Firemodel](https://firemodel.info) Model's so before doing anything let's define the model so it can be used in all state layers (e.g., Firebase, IndexedDb, and Vegemite):

```typescript
@model()
export class Product extends Model {
  @property name: string;
  @property price: number;
  @property description: string;
  @property category: ICategory;
}
```

> **Note:** this is a very simple model with no relationships, mocks, or other advanced featues. Check the Firemodel docs for more info on this topic: [Modeling in Firemodel](https://firemodel.info/modeling/)

### Store Setup
In our example we're using the `isolation` store type which takes just a single model as the basis for it's state management. A few defaults and opinions that are worth mentioning:

- All models being managed are assumed to be 

This is where 99% of your configuration will go and in this simple example 100%:

`/src/store.ts`
```typescript
import {createStore, moduleDefn} from 'abc';
import vegemite from '@forest-fire/abc-plugin-vegemite';
import { FirestoreClient } from 'universal-fire';

interface IProductStore {
  all: Product[];
  featured: string[];
}

const db = await FirestoreClient.connect();
export const store = createStore(
  db, vegemite, 'isolated',
  moduleDefn<IProductStore>(Product, { all: [], featured: [] })
});

export [
  getProducts, 
  watchProducts, 
  loadProducts, 
  syncProducts
] = store.abc(Product);

export const store = vegemite<IEventMap, IProductStore>({
  all: [],
  featured: [],
});
```



Imagine when we login the following lifecycle hook is called:

```typescript
async function onLogin() {
  import { syncProducts, dispatch } from "@/store";
  syncProducts(where('inStock', true)).then(() => dispatch('products::in-sync')) 
}
```