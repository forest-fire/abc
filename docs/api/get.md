# Get

The `get` operation _gets_ data from a database as quickly as possible from the closest source possible and loads it into the local state management framework. 

There are several strategies which can change behavior as it relates to Firebase but the default strategy ignores Firebase entirely.

## Default Flow

The default flow for `get` assumes that you've already setup your IndexedDb to be appropriately "fresh" as a caching layer and then ignores Firebase completely in favor of viewing IndexedDB as the source of truth. 

The syntax for using `get` would look something like:

```typescript
// discrete request
const results = await getProducts(['abc', 'def'])
// query request
const results = await getProducts(where('inStock', true))
```

And this would execute along the following path:

``` mermaid
sequenceDiagram
participant App
participant StateMgmt
participant IndexedDb
participant Firebase

App->>IndexedDb: getProducts( [ 'abc', 'def' ] )
activate IndexedDb
IndexedDb->>IndexedDb: gets products from IDB
IndexedDb->>StateMgmt: updates state
IndexedDb->>App: Promise < Product[] >
deactivate IndexedDb
```

> For more info on how to ensure you have a fresh cache, read the [**load**](./load.md) and [**sync**](./sync.md) sections

## Two Phased Get

In this strategy, the IndexedDB and Firebase are queried in parallel. The caller receives two promises for each query and the local state management is updated (typically) first by IndexedDB and then finally with Firebase. In all cases, Firebase results are considered to trump IndexedDB as a final state.

the default strategy is executed but in parallel to returning the IndexedDb results, a request is also sent to Firebase and when that's been resolved ABC refreshes the cache _as well as_ the local state management.

Activating this strategy is simply a matter of stating the strategy in the options hash:

```typescript
const results = await getProducts(where('inStock', true), { 
  strategy: GetStrategy.twoPhased 
})
```

This results in the following execution flow:

``` mermaid
sequenceDiagram
participant App
participant StateMgmt
participant IndexedDb
participant Firebase

App->>Firebase: getProducts( [ 'abc', 'def' ] )
activate Firebase
App->>IndexedDb: getProducts( [ 'abc', 'def' ] )
activate IndexedDb

IndexedDb->>IndexedDb: gets products from IDB
IndexedDb->>StateMgmt: updates state
IndexedDb->>App: Promise < Product[] >
deactivate IndexedDb

Firebase->>Firebase: gets products from Firebase
Firebase->>IndexedDb: refreshes cache
Firebase->>StateMgmt: updates state
Firebase->>App: Promise < Product[] >
deactivate Firebase
```