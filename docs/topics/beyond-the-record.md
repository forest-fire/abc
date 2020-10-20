# Beyond the Record

In ABC we're mainly concerned with _records_ of data but beyond just the core model data which ABC provides, it also provides helpful meta information as well. To explore this topic let's first start with what a model-backed ABC module looks like in the store:

- **List**

  Probably in most cases your models will represent a _list_ of records and where that's the case you can expect the default data structure to look like this (assuming a model name of `Customer`):

     ```ts
     {
       customers: {
         all: Customer[],
         __local__: string[]
       }
     }
     ```

- **Singular**

  Singular models will look almost the same: 

    ```ts
    {
       customers: {
         record: Customer,
         __local__: string[]
       }
    }
     ```
So regardless of the cardinality of your model's representation, there is one rather _unsurprising_ property (`all` or `record`) and then one more which you may not have expected.