# Overview

The iterator pattern is simple - it takes care of iterating collections. What's wrong with the current ways of iterating? Why aren't my for and while loops invalid anymore? Why increase the complexity of doing something so simple? The problem doesn't lie within your favourite looping mechanism; it lies within the fact that there are many collection types and each collection type has its own syntax for looping.

Take TypeScript, for example.

-   The `Map` library uses the `.get()`
-   Normal arrays can be gotten by iterating the array and indexing it, then returning the element at the index
-   Singly linked lists use the `.next()` method to get the next element in the linked list and uses the `.val()` method to get the value of the current item.

Imagine a scenario where you have the aforementioned collections, all of which you have to consume at the same time for your application to work. A naive idea would be to transform 2 out of 3 data structures into one type that matches the data structure you didn't transform, but that could become very expensive time and space wise. How about a special `Iterator` whose sole responsibility is to perform iterations for all kinds of data structures?

> The issue illustrated is the most alarming reason why we want to use a dedicated "iterator" to handle the myriad iterating operations we need to support. Consider the more common case where you need to loop `X` number of data structures. There is a lot of code to write if you're going to perform `X` consecutive for loops to get something done! The iterator here could make our code look neater and be more decoupled!

> Unlike usual, we'll not show another example for this pattern, just the example we see from the book. That's because the iterator pattern is quite a specialised pattern - there isn't any other example we can think of that will add value to the reader's understanding of this pattern. It's worth noting that this problem is solved in major programming languages - TypeScript's `Iterable` library has a wealth of iterating methods.

# Examples

### head-first-restaurant-merging-example.ts

-   Warning: This example does not implement the full functionality of the example from the book. This is a more stripped down version with less distraction from the Iterator pattern we actually want to present!
-   Here we imagine 2 restaurants merging. The obvious thing to do is to merge menus. However, `PancakeHouseMenu`'s code uses an array to hold menu items, while `DinerMenu` uses a `Map` type for the same purpose.
-   Now imagine a server (as in the person that serves you food in a restaurant, not the thing that serves your http requests), they'll need to know the underlying data structure of `PancakeHouseMenu` and `DinerMenu` if they want to list out the merged menu to customers! That's poor implementation because it locks your server in with fixed implementation. Should either menu change data structures or we introduce another menu into this merger, the server will have to change quite some code!
-   We make it a rule and say: **Every merger partner needs to implement their own `MyIterator` interface, because you should take care of the way your menu needs to be iterated.** The `MyIterator` interface is simple, there are 2 methods `next()` and `hasNext()` that all menus need to implement. Can you see why this is a great idea already? If everyone implements the same interface, then the server is able to access every menu item from the various merger partners through the `next()` method - rather than doing the loop themselves for all menus, the `next()` method handles it all! Polymorphism!
-   So, `PancakeHouse` implements the `MyIterator` and calls it `PancakeHouseMenuIterator`. Since they're using an array as their menu data structure, their looping mechanism uses array looping syntax. Likewise, in `Diner`, they implement their own looping mechanism for their Map data structure.
-   A question might be: "why create an instance of an iterator like in line 74 and 75? Why not the menus just implement looping logic within them? Just make sure everyone uses the same naming convention for their looping mechanism!" Sure, that is possible. From the perspective of the server they use the same syntax and everyone's life moves on. However, using an `interface` enforces strict compliance - your new merger partners can't say "oh well `next()` and `Next()` are the same afterall, let the server handle it, that's what we pay them for."
