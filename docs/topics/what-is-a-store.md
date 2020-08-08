# What is a Store?

## Intro

It's a place you go to buy things silly! Are you feeling ok? Oh wait, you meant a front-end management store? Well now that's a _good_ question.

For ABC, the **Store** is the top level primitive which an App will interact with an which provides clear isolation from any other potential stores which may exist. It's important, however, to understand that ABC's main responsibilities are _not_ to maintain "the store" but rather to defer that to the underlying frame chosen. Therefore it's useful to think of the store as unified interface that presents both the ABC and underlying store capabilities.

### ABC Responsibilities

- Provide a single API surface that effects change across a local state management solution, IndexedDB, and Firebase
- This is achieved by:
  -  Integrating with `universal-fire` to provide Firebase connection(s)
     -  this is both a _shared_ connections for the store
     -  as well as the option to have any Model use a different connection
  -  Integrating with `Firemodel` models and API to query and write to Firebase and IndexedDb
  -  Integrate with the _underlying_ state-management tool for local state management

### Store Management Features

While deferring the following to the underlying state management framework:

- c 
- d


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