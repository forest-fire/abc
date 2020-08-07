# Getting Started

## Install Deps

In order to use the ABC API you must have **Firemodel** and **universal-fire** installed, to install ABC as well as these deps you will:

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
Vegemite is a more compact/efficient store as it doesn't add a lot of the getter/setter magic of Vuex/Vue2's reactivity system. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


## Configure ABC for a Model

The simplist configuration of ABC is just the `Model` and _dispatcher_ but you can also pass it along with other options configured:

```ts
import { Product, UserProfile } from '../models';
import { dispatcher } from '@/store';

// basic config
const [ getProducts, watchProducts, loadProducts, syncProducts ] 
  = abc(Product, dispatcher);

// openning up other config options
const [ getUsers, watchUsers, loadUsers, syncUsers ] 
  = abc(UserProfile, dispatcher);
```
