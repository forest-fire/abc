# Watch

> This may not be part of the API ... basic idea was to get something to mimic a `get` operation but which would be intentionally made "non-reactive" in the local state management tool (aka., with something like the `Object.freeze()` approach). The thinking was that it would allow continued use of Vuex for all datasets which are small in size do not start to crowd memory; but provide a safety hatch for large datasets to be loaded into the Vuex tree non-reactively. 

> This is probably just a bad idea.