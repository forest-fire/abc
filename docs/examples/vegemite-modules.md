# Vegemite / Modules Store

## Context 
For a "modules" store backed by Vegemite we map as many models as we like into the store. Each model will be stored directly off the root of the store using the model's plural name (unless a module has been explicitly configured as `singular`).

In addition to all the modules which we add to a module-based store, ABC adds one more which is the `@firemodel` module. This module provides useful state information on the state of the Firebase database including the state of Firebase Auth if that's being used.

> Note: Vegemite doesn't have a native representation of a "module" but the key feature that the Vegemite _plugin_ provides us is a way to ensure that when a event comes in it is namespaced to the appropriate model.

## Overview of Example

In this example we'll use two models: `UserProfile` and `Company` where a user can be part zero or more Companies. We'll show how to setup the **store**, load and then get users and companies, remove users/companies, associate a user to store, and then remove that association.

All of the code in this document is a direct reference to real code that compiles and can be found in the `/examples/vegemite-modules` folder in the github repo. Each of these examples will use **VueJS** to present the basic ideas of the example code but this example has no dependency on Vue at all.

### Models Used in Example

fill in refs to models

## Store Setup

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Loading Data
