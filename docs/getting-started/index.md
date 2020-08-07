# Getting Started

## Install Deps

In order to use the ABC API you must have **Firemodel** and **Universal-Fire** installed, to install ABC as well as these deps you will:

```sh
# npm
npm install firemodel universal-fire abc --save
# yarn
yarn add firemodel universal-fire abc
```

## Create a Model

ABC works with Firemodel Model's so before using it we'll need to create a model:

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

## Choose a Dispatcher
When ABC gets updates to data it _dispatches_ them to the appropriate state-management tool. Currently the state management tools supported are [Vuex](https://vuex.vuejs.org/) and [Vegemite](https://github.com/lukeed/vegemite).

### Vuex
To use Vuex as the store solution, we simply need to pick up the dispatcher function from 

We can use Vuex's dispatcher to send our data events into Vuex's store with the following:

```typescript
// once you have a reference to the Vuex store
export const store = new Vuex.Store({ ... })
// the store provides a dispatcher to send actions to
export const dispatcher = store.dispatch
```

The Vuex dispatch has an identical signature to ABC so nothing more is needed. Just move onto the configuration section to see how to proceed from there.

### Vegemite
In Vegemite the *dispatcher* is the  


## Configure ABC for the Model

The most basic means of configuring ABC is just passing in the dispatcher:

```ts
import { Product } from '../models';
// obviously change your source here to whatever makes sense
// to your situation
import { dispatcher } from 'dipatcher';

const [ getProducts, watchProducts, loadProducts, syncProducts ] = abc(Product, dispatcher);
```

This default configuration