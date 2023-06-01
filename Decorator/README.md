# Overview

-   The Decorator pattern is a useful pattern to follow when you want to "tack on" features or processes (like rate limiting in a web environment) to your "core" functionality.

    > From now on, we'll call features we're "tacking on" decorators.

-   A decorator wraps the original object by implementing the methods and features the base object implements. In other words, the decorator inherits the base object's `interface`. The decorator is allowed to method-override the base object's behavior to do whatever unique thing this decorator is made for.
-   The key reason for the decorator pattern is the ability to add new features to a larger feature, without touching the larger feature's code. In every sense, the new features only tack onto the larger feature, never ever looking inside it. This is the `Open-Closed principle` - classes should never be modified, only **extended**. Here, we use decorators to extend the existing class - **NOT MODIFYING THE EXISTING CLASS TO FACILITATE MORE FEATURES**.
-   Drawbacks of the Decorator pattern include:
    -   Increased complexity and potential for excessive nesting of decorators. 
    -   If the base `interface` changes, **ALL** decorators will need to be modified. There is a tight coupling situation going on here. 
    -   Once a decorator is set, it is non-trivial to unset it.
    -   Every time a new decorator is invoked, a new object is created. The "tacking on" described above isn't 100% true. Instead, you create a new object with a new decorator attached. 

# Examples

### head-first-starbuzz-example.ts

-   We want to imagine a check-out terminal in our favourite cafe - Starbuzz. In Starbuzz, customers are allowed to have a "base" `Beverage`, such as an `Espresso`, then top it off with `Condiments`, such as `Milk`, `Mocha`, etc. This example wants you to think of `Condiments` as **decorating** the base `Beverage`.
-   As mentioned in the [Overview](#overview) section, decorators will implement the base object's interface. Which is why a class `CondimentDecorator` implements the original `Beverage` class. Notice in `getDescription()` and `cost()` of `CondimentDecorator`, they don't actually play a role at runtime. Those 2 methods existence is merely to conform to the `Beverage` class' contract. In fact, the `getDescription()` and `cost()` are important in the `Milk` and `Mocha` subclasses (these are the methods that actually get executed when we invoke `getDescription()` and `cost()`).
-   In our example, we first create a `Beverage` of type `Espresso`. This is our base drink. Time to decorate our drink. We create a new drink that wraps our `Espresso` with `Milk`, visualize it as such `new Milk(new Espresso())`. Similar to milk, we wrap `Mocha` with the milk espresso we created earlier. 
