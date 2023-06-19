# Overview

The template pattern is hailed as the most widly used pattern, and for good reason. Infact, the spirit behind the template pattern is what we intuitively do when we think of decoupling applications! It boils down to this: implement any common functions/methods in a more "global" scope, then for those functions and methods whose implementations can change we separately implement them. This way, we do not duplicate common code! As a simple example, a library is a place where commonly used functions are kept. You probably won't implement your own standard library functions every time you write any code, right?

Since this is in OOP, we'll talk about this pattern with OOP in mind. An abstract class defines a `Template`. This template has the "algorithm" that this class provides. For example, in merge sort, doesn't matter what we're sorting, the general idea of divide and conquer is the same across all sortable items, the only difference is HOW to sort (ascending, descending, etc). Next, suppose our algorithm has some common functions and they're so common that giving them a concrete immutable definition doesn't degrate the class, then we'll write them out here. For any method that is "implementation dependent" (like whether we're sorting by ascending or descending), put it in an `abstract method` and force a subclass to give it a concrete implementation. In short, we provide a template for an algorithm, then we fill in those implementation details that don't change no matter what, and leave methods that are implementation dependent as `abstract methods` for the user to implement.

As a more advanced concept, we'll introduce a way to make implementations flexible via `hooks`. Do not think of React hooks at this point should you be familiar with React. Hooks in this context are very simple; they offer a way to manipulate what happens inside the `Template` itself. An easy implementation is to have the hook be a function that returns a boolean; if the function returns true, we do something in the `Template`, if it returns false, then we do nothing. So, hooks in this context is just a way to hook into the `Template` and modify its runtime behavior. Note that hooks are not a core component to this design pattern, rather a way to introduce some conditional execution behavior!

# Examples

### head-first-caffeine-example.ts

-   In this example, realise that brewing coffee and tea has many similarities. In general, we have to `boilWater()`, then `brew()`, then `pourInCup()`, then `addCondiments()`.
-   Note that the brewing technique between coffee and tea are different! Coffee made right is dripped. Tea coming from tea bags are steeped. They're both performing a brew action, but they do it differently.
-   Next, notice that boiling water and pouring the beverage into a cup are the same, no matter what. We'll provide concrete implementations on these.
-   Now, different drinks need different condiments. But we'll take it one step further and ask "does this drink need beverages at all?" One can argue, but we've decided coffee doesn't need any condiments - black coffee is good enough. Tea on the other hand would benefit much from having a lemon wedge. Thus, we introduce our hook `customerWantsCondiments()`. This method returns a boolean, and depending on which boolean value it returns, it tells the `Template` whether or not we add condiments.

### data-processing.ts

-   As usual, a lengthy motivation behind this example is at the top of the file. Since this is a simple design pattern, not much explanation needs to be done.
-   `DataProcessor` has a method `process()` that contains the algorithm for data processing. Call that method and you should be able to process the data you want. To iterate from a comment in the file, if you want a more realistic example, you can create a constructor for the class and allow a file to be passed in from there.
-   Our implementation assumed `ingest()`, `store()`, and `notifyManager()` does the same things. The differences are in the way we `transform()` and `validate()` data. Another difference is on some work flows we will need to `sendNotification()` to the manager, and in others we don't. So that is our conditional hook.
