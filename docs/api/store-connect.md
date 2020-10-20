# `StoreConnect` API

``` mermaid
sequenceDiagram
participant app as App
participant abc as ABC
abc-->>plugin: import defineStore()
plugin-->>abc: export default
app->>abc: createStore()
activate abc
    Note over abc: setting up the store and ABC config
abc->>plugin: pluginDefinition()
plugin->>abc: store, model(), and module()
abc-->>abc: receive app's config
abc->>app: StoreApi
deactivate abc
```

key _types_ are:

- State Tree
- Service Map (local, informational, database)
- 