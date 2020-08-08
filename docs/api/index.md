# Overview

The API's provided by ABC are as follows:

1. **Store API**
   
   With ABC you setup a store as a one time event using `createStore`, this returns the Store API which is then used to configure each `Model` appropriately.

   ```typescript
   import Vuex  from 'vuex-plugin';
   const vuex = new Vuex(  )
   const firebase = FirestoreClient.connect()
   export const store = createStore(firebase, vuex, {  } )
   export store.abc(Product, { ... })
   export store.abc(Customer, { ... })
   ```

2. **Core API**

   The core API which App users will use to interact with state in the store.

     ```typescript
     import { getProducts, loadProducts, ... } from '@/store';
     ```

3. **Connect API**
   
   Used by local state management plugins to bridge into the ABC ecosystem.