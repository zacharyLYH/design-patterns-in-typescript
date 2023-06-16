# Overview

Probably the _number 1_ most intuitive design pattern you'll encounter, the Facade pattern.

> The one word definition for the pattern: Refactoring.

Indeed, should you encounter a sufficiently complex or duplicate code, refactor these codes into its own function use that function as an interface for all the mess of logic underneath it. In OOP design pattern theory, we will talk about the Facade pattern as a way to simplify a complex interface by grouping `complexInterface`'s methods, and using a `simplerInterface` with methods that take on the responsibility of each one of `complexInterface`'s groups. In general, any kind of refactoring that takes complex logic or duplicate code into their own entity applies the Facade pattern, as a non-OOP example, you may refactor a common web API call into its own function, so that your individual functions don't need to contain verbose and duplicate API call codes.

# Examples

### head-first-home-theater-example.ts

-   In this example, we imagine a home theater and the complexity of just trying to watch a movie.
-   We define a method `watchMovie()` in `HomeTheaterFacade` that contains all the things we need to do **before** we watch a movie.
    -   Ponder on what we'd need to do to before we watch a movie should this method not exist. Yes, we'll have to call all 9 methods individually.
    -   Instead of 9 separate tasks, how about just 1 button called `watchMovie()` that will take care of all 9 steps automatically?
-   Similarly, we define a `endMovie()` to responsibly turn off everything we turned on for the movie.
-   Can't we agree that with this implementation, we reduce the work we have to do as an end user? This is the power of the Facade pattern. Always hiding away ugly detail and repetitive work, in favor of a user-friendlier experience.

### payment-system.ts

-   A good motivation behind this example is already at the top of the file.
-   The lesson learnt here is this: when there is repetitive and complex work involving multiple steps at a time, the Facade pattern might be able to help group these lines of code together, so using them in the future becomes as easy as calling a method!
