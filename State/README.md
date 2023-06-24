# Overview

The State Pattern is one of the more interesting composition based design patterns, whereby the use cases for the pattern are very intuitive! This pattern is amazing for systems that have discrete states, or in dummy terms "multiple steps". Because, we can represent each step or state as its own class. What is the benefit of abstracting each step into its own class? Imagine a new step is to be added to your system. Now, your entire system has to account for this addition, leading to bug prone code! Instead, we can treat that additional step like how we treat our other steps; put it into its own class.

The mental approach to designing a state pattern is:

1. Figure out your states. In a full execution of your system, what discrete, isolated steps can you identify?
2. Figure out the actions possible in your system. In a full execution of your system, list out all the possible actions that one can take. Usually, it is a good idea to condense as many steps as possible into one bigger step so that you have fewer individual actions to code for.
3. Define a `State` interface and list out your final methods in this interface. Now, every state you came up with in step 1 will `implement` this interface, thereby forcing every state to implement logic for every action (method) this interface specified.
4. In the `Context class` (your original problem, the class that these states relate to), instantiate all the concrete state classes from step 3. Also, have a `currentState` variable. This will be the variable we use to store which of the states from step 3 we're at.

> Since in step 3, every state defined the methods (actions) from step 2, you can feel safe swap and replace any other state with `currentState` at all times!

5. Provide getters and setters for getting all the states you've instantiated in step 4, and a setter to set states at run time.

# Examples

### head-first-gumball-example.ts

-   Consider a gumball machine. It has a few states it can be in at any one time: `HasQuater`, `NoQuarter`, `Sold`, `SoldOut`. NoQuarter here is the "initial" state, because it is the state where no quarters are in the machine just yet. The rest should be self explanatory.
-   In a gumball machine, it is expected to have a few actions: user `insertQuarter`, user `ejectQuarter`, user `turnCrank`, and the machine `dispense` the gumball after cranking.
-   For each state, we define what happens when a user does something at that state. For example, in the initial `NoQuarter` state, if a user inserts a quarter then the machine gets a quarter, if a user ejects a quarter when there are no quarters put in yet then you need to tell them they haven't inserted a quarter. In another state, say `HasQuarter`, if a user inserts a quarter you need to tell them only one quarter is needed at a time, if they eject the quarter in the machine then safely eject the quarter.
-   From the small example above, we observe that
    -   Every state might respond in their own unique way towards an action. Thus implementation of that logic on the programmers part is necessary.
-   Now, each of the states from the first bullet point get their own `State` concrete implementaion. As mentioned in the previous bullet point, this is necessary since for each state, the actions possible on the state can be different. In the `GumballMachine` class, we have a variable `state` that can take on any one of the 4 states from the first bullet point. Additionally, for some safety, we set our state variables to `private`, so we're forced to use getters and setters. These getters and setters get and set the states we've defined.
-   Its important to mention that each concrete state definition contains a reference to the `GumballMachine`. This is important because when we want to change states, we want to use the getters and setters defined in the `GumballMachine` class!

### food-delivery.ts

-   As usual, the description and motivation behind this example is at the top of the file.
-   One **major** note: In this implementation, I used `chooseRestaurant()` within `SelectFoodPage` class and `MakePaymentPage` class as a "shortcut" to the `SelectRestaurantPage` class. I apologize in advance if this confuses you. I've added comments to the test to explain this confusion.
