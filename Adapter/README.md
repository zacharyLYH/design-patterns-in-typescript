# Overview

Known to be a simple design pattern, the adapter pattern is used when you're trying to use an `interface A` on a system that expects an `interface B`. We do our best to develop software that is easily understandable and easy to maintain, however, more often than not 2 separate entities would not know each other's implementation of their own specific products. Should their APIs ever need to communicate with each other, it becomes an issue if `interface` contracts cannot be agreed upon. We'll have more concrete examples further below.

# Examples

### head-first-duck-example.ts

-   In this conthrived example, we'll see how we'll use the `Duck` interface's methods to invoke the `Turkey` interface's methods. The end user will call methods like `quack()` and `fly()`, but under the hood, they'll be invoking `gobble()` and `Turkey`'s `fly()` instead.
-   A `TurkeyAdapter` takes an instance of a `Turkey` and stores it. Introduce the "adaptive" lines of code:
    -   As mentioned earlier, the end user wants to use `Duck`'s methods. `quack()` from `Duck` will call the **equivalent** of quacking on a `Turkey`, which is `gobble()`.
    -   In the Adapter's `fly()` method, even thought this class' base class is of type `Duck`, we call within this function the `fly()` method of type `Turkey`. Essentially, the user thinks any call to `fly()` in `TurkeyAdapter` should probably call the `Duck`'s `fly()` method instead of the `Turkey`'s. But they've been fooled.
-   This example neatly illustrates the idea of using another class' methods in another method; in other words, adapting an incompatible class' methods to a compatible class we can use.

### read-the-manual.ts

-   In our (slightly) more realistic example, we play out a scenario of a payment vendor your company hired that didn't read the implementation guide, and delivered a set of methods that didn't conform to what your company's needs. However, it was too late for anyone to change their code, all that's left to do it adapt the bad APIs to the expected implementation.
-   We start by introducing the 2 incompatible interfaces `OurCompany` and `ThirdParty`. As mentioned, we need to adapt `ThirdParty`.
-   `ThirdPartyAdapter` wraps the bad code from `ThirdParty` in the interface that `OurCompany` was expecting. Thus making it compatible with our company's needs again.
-   Start by initializing an instance of `ConcreteThirdParty` which has the implementation of the payment system. Then pass this poorly written `ConcreteThirdParty` into our `ThirdPartyAdapter`. Our adapter will do the rest.
