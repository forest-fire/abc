# Return values versus Store State

It is worth noting that when you execute either a `get` command operation you are achieving two results:

1. The operation will return what you requested
2. The Store you've chosen will have it's state updated

It might be easy to overlook that these two are _not_ the same data structures. The results from your request are just the results which you asked for, nothing more. By comparison, the "state" of the model you're impacting will be the result of 