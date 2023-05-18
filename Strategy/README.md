# Overview
A strategy can be thought of as an option. An option among many other options under one same umbrella. By defining strategies, we abstract the logic that goes into these individual options, and provide a neat API to the end user to manipulate behavior. 

A good mental approach would be in 3 steps:
1. Figure out what the high level common features/functionality are. Put them in an `interface`.  
2. For each feature/functionality, implement their subfeatures as type of the `interface` this feature belongs to. This step allows the "manipulating on the fly" behavior that this pattern is well known for by leveraging the power of polymorphism.
3. Lastly, define an avenue for all the features you decided on in step 1 to live in. Provide them with APIs such as setters.

This pattern is particularly useful when you run into a situation where there are multiple ways to perform a task. One interesting example is compressing files - you might compress a file depending on the file type and file size etc.

The pitfall to this pattern is its increased complexity. Under a certain threshold of number of strategies, the complexity introduced could instead become diminished returns, making the code worst than it originally was. 

# Examples
### head-first-duck-example.ts
- In this example, we use ducks as a contrived but easy to understand example. 
- We define 2 interfaces, `FlyBehavior` and `QuackBehavior`. These behaviors are common to all kinds of ducks (inanimate ducks don't fly and don't quack, but that's a behavior too).
- We go on to specify each possible `FlyBehavior` (`FlyWithWings` and `FlyNoWay`). We do the same for Quacking. 
- We go on to define an abstract class `Duck` that pulls all the work we've done earlier into one class. The APIs for getting and setting the `Duck`'s behaviors should be implemented here.
- To extend this example, you could create more behaviors for the interfaces. For example, you could define a `LoudQuack` and `SoftQuack` classes to get even more detailed duck descriptions.

### text-editor-settings.ts
- In this practical example, we imagine the complexity and variety of settings in a text editing app (or any app for that matter). 
- We define 3 interfacecs. These interfaces are common among many text editors.
- Next, we define the specific behaviors these interfaces can have. 
- We move on to pooling all that we've defined previously into a `TextEditor` class. Any text editor you can name should be able to use the APIs you'll develop in this class to work on manipulating those interfaces from above.
- To extend this example, go berserk and come up with more common text editing features. 
