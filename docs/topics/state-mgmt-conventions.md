# State Management Conventions

## Introduction

This section will attempt to convey a loose picture of how state management frameworks express themselves in nominclature as well as what that has led for ABC's internal representation. This topic is probably only relevant to those who want to bring in a new state management framework via the plugin architecture. For most users it will suffice to just use a plugin and then leverage the typed interface to gain understanding of usage.

In today's frontend state-management world we get a lot of terms like "reducer", "action", "mutation", etc. These are all intended to provide a hint toward their function but in the aggregate the frameworks are not consistent as there is no governing body nor natural language definitions definitions to align the frameworks. 

To illustrate:

- **Redux**
  - An *Action* is asynchronous and is calls one (or more) Reducers to effect change to state
  - *Reducers* are guarenteed to be synchronous and are the only functions allowed to actually mutate state
  - *State* changes must always be done in an immutable way (though the data structures themselves are not immutable, or at least aren't required to be)
- **Vuex** 
  - Similar to Redux, Vuex provides *Actions* which call _other_ functions to effect state change
  - Rather than "reducers", Vuex uses the term *Mutations* and similarly to Redux, a _mutation_ must be synchronous
  - Unlike Redux, *State* changes are mutable and rely on Vue's reactivity system to track change versus changing reference pointers
  - Provides a native primitive called **Module** which namespaces state
- **Vegemite**
  - Reduces the API surface of actions/reducers/mutuations to just _Handlers_
  - *Handlers* are asynchronous and _can_ update state directly
  - *State* updates in the handler are mutable (though as an implementation detail ... Vegemite is wrapped by a Proxy object and the underlying mutations are all immutable at run time).

> **Note:** the Vuex landscape will likely change quite a bit as people move to the Vue3 ecosystem; the conventions which change at this point aren't known fully by this author (and possibly not yet grounded) but it is assumed that the underlying reactivity will move to Vue 3's _proxy object_ based approach.


## ABC's Naming Approach

- **Less is More (with options).** Look for "less is more" moments to reduce the API surface (but *do* provide options that keep the framework relevant for larger projects)
- **Prefer Generic over Overloaded.** Opt for more generic names where naming may conflict. There's nothing worse than two really clear definitions of the same term. In cases like this we will _try_ to opt for a more general term that doesn't lead people to assume too much.
- **Reduce Wheel Redesign.** We've all been caught redesigning the wheel and it's fun but not helpful. We will try to reuse nominclature where possible and we will prefer JS/TS language convensions over frameworks but consider both.

## ABC's Summary Naming

In practice, what does this mean? The next topic -- [What is a Store?](./what-is-a-store.md) -- will go into greater detail but at a summary level:


- [Store](./what-is-a-store.md) - we will provide access to all underlying primitives; this seems to be true for all the state management frameworks this author is familiar with
- [Handlers](./what-is-a-store.md#handlers) - mimics the Vegemite convention of providing a singular path to mutate state that is both asynchronous and allows for mutable or immutable changes to state. This term is also considered better because it is more generic and fits into a general understanding of the word that JS developers use consistently.
- [Listeners](./what-is-a-store.md#listeners) - we again mimic Vegemite for similar reasons. In this case *Subscription* was tempting because it does describe what's happening well and both Redux and Vuex conform to this convention but still JS is the stronger player and JS/Vegemite's conversion on this term was the winner.
