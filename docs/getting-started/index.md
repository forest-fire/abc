---
sidebar: auto
---
# Getting Started

## Install Deps

In order to use the ABC API you must have [**Firemodel**](https://firemodel.info), [**universal-fire**](https://universal-fire.net), and [**abc**] installed:

```sh
# npm
npm install firemodel universal-fire abc-js --save
# yarn
yarn add firemodel universal-fire abc-js
```


## Typing the State Tree

Next you'll want to define your state tree's _shape_ via typescript. Imagine you wanted to create an app with the following Firemodel models:

1. `UserProfile` - just one record to represent the logged in user
2. `Product` - a relevant list of products the user could buy
3. `Order` - a list of orders which a customer has made or is considering making

In addition, let's assume that:

- you don't like the name `userProfile` (which is the default name ABC would give) so you'd like to have this hang off `profile` instead
- you also would like to add a `currentOrder` property to the orders part of the state tree to sit next to the list of products
- finally, lets imagine that you have a registration process in the application which has state associated with it but you don't really want to back it with a database


In this situation your state tree might look like this:

```ts
import { AbcModelRecord, AbcModelList } from 'abc';

export interface IStoreState = {
  profile: AbcModelRecord<UserProfile>;
  products: AbcModelList<Product>;
  orders: AbcModelList<Order> & {
    currentOrder?: string;
  };
  registration: {
    status: RegistrationStatus
    email?: string;
    phone?: string;
    emailVerified?: string;
  }
}
```
> **Note:** you don't need to use the `AbcModelList` and `AbcModelRecord` type helpers but provides a somewhat more expressive/compact type definition. 

## Choose a Local State Manager

When using ABC, your app will be transparently gathering state from either a local database and/or Firebase and using this data to update a local state management framework like Vuex, Redux, Mobx, Vegemite, etc. To setup your store you must choose which of these frameworks you'd like ABC to work with.

Currently there are two included as plugins which takes all the hard work out of the process: 

- **Vuex** [ [framework](https://vuex.vuejs.org/), [plugin](https://github.com/forest-fire/abc-plugin-vuex) ]
- **Vegemite** [ [framework](https://github.com/lukeed/vegemite), [plugin](https://github.com/forest-fire/abc-plugin-vegemite) ]. 

Alternatively, if you want to connect a different manager you can roll your own (see [Creating a Store Plugins](/topics/store) in the _topics_ section).  

Let's assume, for sake of argument, that we've decided on using the Vegemite solution. We must first install these deps:

```sh
# npm
npm install --save vegemite @forest-fire/abc-plugin-vegemite
# yarn
yarn add vegemite @forest-fire/abc-plugin-vegemite
```

In the next section we'll see how easy it is to plug this into the store and then address some complications and edge cases.

## Creating the Store

Creating a store is done through use of the `createStore` function which ABC exposes. Let's start with what will turn out to be a somewhat _over-simplified_ example:

### An _Over_-Simplifed Example

```ts{10}
import { FirestoreClient } from 'universal-fire';
import vegemite from '@forest-fire/abc-plugin-vegemite';
import { UserProfile, Product, Order } from '@/models';

const db = FirestoreClient.create();

export const store = createStore<IStoreState>(
  db, 
  vegemite, 
  [ UserProfile, Product, Order ]
);
```

At this stage we have a store but we're not doing it quite right yet. Things we have touched on yet include basic topics such as:

- **Default State:** how is the _default state_ set synchronously at startup/reload/etc?
- **Custom Mutations:** how do you add our own actions/mutations/reducers/handlers/etc (the ABC ones _have_ been added for us)? What about frameworks like Redux and Vuex which have Actions which sit above mutations?

And more advanced ones like:

- **Getters:** what if you wanted to add computed properties like Vuex's getters?
- **Subscriptions:** what if you want to plugin into the event system and take actions on any events or state changes?

In the next two sections we'll cover all of these topics, starting with the basics.

### Default State and Mutations

#### Default State
Defining default state is a requirement to ensure that your state management starts out --  *immediately* and *synchronously* -- in an expected and predictable state. Different frameworks have different semantics on how this is achieved but the idea and structure are fairly constrained simply because we're talking about giving values to a data structure that we've already typed. This allows ABC to standardize the configuation approach and pass any variance in API to the plugins to manage for us.

To demonstrate how we'd do this we're going to replace the line highlighted in the prior code example. In that example we made two mistakes:

  1. We stated which Firemodel models we wanted to use but we didn't express explicitly what their default values should be (admittedly Firemodel models have enough super powers that we _might_ have been able to come up with a sensible default for you but state management is important and it's always worth being explicit about it)
  2. We added _typing_ for the `registration` module but we left out anything concrete about the data to the run-time system. 

Fortunately fixing our mistakes is easy:

```ts
export const store = createStore<IStoreState>(
  db, 
  vegemite, 
  (model, module) => [ 
    model(UserProfile, {}, { singular: true, moduleName: 'profile' }), 
    model(Product, { all: [] }), 
    model(Order,  { all: [], currentOrder: undefined })
    module('registration', { status: 'unregistered' })
  ]
);
```

What we can see from this example is that the third parameter to `createStore` is a *function* which provides us two functions to help us configure each of our state modules. If the state module is being backed by Firemodel then use the `model()` function, if not then use `module()`. These two functions have very similar signatures and the second parameter allows us to state what the default state should be.

You may have noticed that for `UserProfile` we used a third parameter. This is an _options hash_ which has several ABC options that you'll also see but also a plugin can add in additional configuration elements. In the next section you'll see why that's important.

#### Custom Mutations

The first problem with effecting change on a state-management framework is the inconsistency in nominclature. Here a sketch of how three frameworks *talk* about changing state:

``` mermaid
graph TB
    subgraph Redux
    r1[Action]-->r2[Reducer]-->r3(State)
    end
    subgraph Vuex
    v1[Action]-->v2[Mutation]-->v3(State)
    end
    subgraph Vegemite
    vv1[Handler]-->vv2(State)
    end
```

In the case of Vuex and Redux the Actions are asynchronous and can't mutate state directly but instead must interact with a synchronous function (or set of functions) to do the mutation on behalf of the Action. In Vegemite the utility of Actions and reducer/mutations are rolled together as an asynchronous function. To say what is better would be sacrosanct ... it's all opinion topped up with emotion.

First off, let's get some good news into the picture ... all requirements related to mutating the state of ABC backed models is done for you. With that out of the way, you only need focus on _custom handlers_ to effect change on non Firebase backed properties.

We have delved into the background in part because we wanted to highlight that this is an area of  differences but because the third parameter of `createStore()` has been setup as a function that allows us to provide a typed solution that reacts to to the state-management framework you've chosen. This means that if you chose **Vuex** you can set *actions* and *mutations* but not *handlers*. If you choose **Vegemite** the opposite is true.

```ts {7,16}
// Vuex example
import { actions, mutations } from '@/my-vuex'
export const store = createStore<IStoreState>(
  db, 
  vuex, 
  (model, module) => [ 
    module('registration', { status: 'unregistered' }, { actions, mutations })
  ]
);
// Vegemite example
import { handlers } from '@/my-vegemite'
export const store = createStore<IStoreState>(
  db, 
  vuex, 
  (model, module) => [ 
    module('registration', { status: 'unregistered' }, { handlers })
  ]
);
```

#### Triggering Mutations

Triggering your custom events is handled by using the API hanging off off of the store and the _verbs_ you'll use will be based on the underlying store management framework. In Vegemite, you would call `dispatch` to trigger a _handler_. In Vuex, you get a `dispatch` function for calling Actions but in our example the better parallel is to use `commit` to call a mutation on Vuex.

```ts
// Vegemite
const store = createStore(db, vegemite, ...);
store.dispatch('registration::email', 'someone@company.com');
// Vuex
const store = createStore(db, vegemite, ...);
store.commit('registration::email', 'someone@company.com');
```

### Getters / Computed Props

The concept of including something like Vuex's `getters` is not consistent across state management frameworks and in general we don't really recommend it but everyone has their vices. If you're using the Vuex plugin you will see that `getters` is an available options in the `model()`'s options hash. If you're using a state management framework like Vegemite, this will not be an option that is presented.

### Subscriptions

Subscriptions allow you to plug into the event system of the state management framework. The act of subscribing (and unsubscribing) is a consistently offered feature across frameworks but the nominclature and specific API vary. Whatever the _verb_ that the framework provides will be exposed on the Store's API and provide you direct access to that framework's API:

```ts
// Vegemite
const unlisten = store.listen(evt, (state, prevState) => { ... });
// Vuex
store.subscribe(() => (mutation, state) => { ... })
```

## Deploying ABC

Configuring the Store also configures ABC but one step is left and that is to export the action verbs that you find appropriate for each model. Every model which you have added to your store can export any of the action verbs [ `get`, `load`, `sync`, `add`, `update`, `remove`, etc.]. In our running example, for instance, it might never make sense for our app to _write_ to the `Product` model but it does for the others. This deployment of ABC symbols -- typically found in the same file as the store configuration would look something like:

```ts
const store = createStore(...);
export { getProfile, updateProfile } = store.abc(UserProfile)
export { getProducts, loadProducts, syncProducts } = store.abc(Product)
export { getOrders, syncOrders, updateOrder } = store.abc(Order)
```

## Usage

You are now ready to use ABC. The next section will go into details about each of the various commands available in the core ABC API. 