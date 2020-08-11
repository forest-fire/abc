# Store Manager Plugins

## Intro

This section if intended for people writing a plugin to integrate ABC with a store manager.

## `defineStore` Function

The plugin's ultimate reponsibility it to implement a `defineStore` function which will be exported as the default export of the plugin. 

This store definition is defined as:

[`src/types/plugins/store.ts`]()
<<< @/src/types/plugins/defineStore.ts



## Visualized


``` mermaid
erDiagram
  Store ||--|| State : manages
  State |o--|{ Modules : "may have"
  Store }o--|| Listeners : "manages"
  AbcEvents }|--|| AbcHandler : triggers
  AbcHandler}|--|| State : mutates
  CustomHandler}|--|| State : mutates
  CustomEvents }|--|| CustomHandler : triggers

  Listeners ||--|| AbcListener : subscribed
  Listeners }o--|| CustomListeners : "can subscribe"

  AbcEvents }o--
```