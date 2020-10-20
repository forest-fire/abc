# Add
## Two-Phased Commit

The `add` command allows an application to add a record in the classical "two-phased commit" pattern:

1. Additions hit the Store _immediately_ 
2. An attempt to update Firebase is made in parallel
3. If Firebase accepts this addition, then it will be added to the local database and confirmed in the store.
4. If Firebase rejects then it will be rolled back in the Store and never sent to the local database

This interaction can be seen below:

``` mermaid
graph LR
  call("add(...)") -- add --> store[Store] -- add --> fb{Firebase}
  fb -. success .-> db[IndexedDB]
  fb -. failure .-> rollback("rollback").->store
```

## Situational Awareness

If your application wants to indicate that a record has been _added but is not yet confirmed by Firebase_, this is made possible by the built-in typing that an ABC backed state module is provided. To understand how you can get this information read the topic [Beyond the Record](/topics/beyond-the-record).

