# Overview

Hailed for its simplicity, we have the Singleton Pattern. The motivation behind this pattern is to **ensure** only **one** instance of a class exists during run time. When will we ever want just one instance of a class? Well, there are many places where more than one such class instance is harmful to the system, for example system device drivers, logs, caches etc.

The mechanism behind the Singleton pattern is the use of:

-   A _private_ constructor. This assures no one other than the Singleton class itself may initialize an instance of the Singleton class.
-   A _private static_ reference to the Singleton class. By keeping the reference _private_, the Singleton class retains control over its creation and ensures that it cannot be casually accessed or modified by external code. The _static_ will expose the reference without initialization of Singleton.
-   Access to the instance is typically provided through a public static method, often named `getInstance()`, which returns the single instance and handles its creation if it doesn't exist.

The Singleton pattern offers a centralized point of access to a unique instance, ensuring consistency and coordination in scenarios where multiple instances would lead to undesirable consequences.

# Examples

### head-first-chocolate-example.ts

-   Imagine a chocolate factory. We have many workers in this factory. There is a button on the chocolate making dashboard that once hit will start churning chocolate. Because of poor coordination and tired workers, as a result, the factory has more than once experienced workers unknowingly clicking the chocolate creating button thinking it hasn't been clicked yet. What ends up happening, the factory will produce more chocolate than necessary. We need to centralize this button, so that if an erroneous click were to take place, the excessive click will be "ignored".
-   As discussed in the Overview section, the key attributes of a Singleton is present as:
    -   `private static instance: ChocolateMachine;`: A single static reference to a `ChocolateMachine` type.
    -   `private constructor()`: A private constructor; nobody can initialize it now.
    -   `public static getInstance(): ChocolateMachine`: If `instance` is null (not yet created), we create it, otherwise we return that `instance`.
-   Now, if `worker1` and `worker2` ask for an instance of a `ChocolateMachine`, the same `instance` is returned; meaning, `worker2` doesn't wrongly create a new `ChocolateMachine` by accident. And as such, if `worker2` clicked on `createChocolate()` without knowing `worker1` has already created it, we don't have 2 `ChocolateMachine`s on our hands creating chocolate, just the one `worker1` started, and the day is saved!

### 
