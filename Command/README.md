# Overview

-   If you've come across another Behavioral pattern previously, this pattern might look very familiar.
-   The command pattern's core idea is to wrap the invocation of any class into a common interface method (usually called `execute()`). The pattern for that looks like:

```
class Task implements Command {
    private theTask: Task
    constructor(payroll: Task) {
        this.theTask = theTask;
    }
    execute(): void {
        this.theTask.invokeTask();
    }
}
```

-   An interface (usually just called `Command`) has a method called `execute()`, which is what all other classes will use as a wrapper around their own task executing functions.
-   This pattern means that we can have tasks that have different API method names and work in their own unique way, but if we wrap them all inside their own `Command` interface, then we can have a common API `execute()` to run every task (their method names forgotten).
-   This pattern has a strength: the fact that `execute()` is a method. In simple examples (like the ones below), the `execute()` method only make 1 function call. It doesn't have to stop there. It can compose itself with arbitrarily complex logic should some feature require it, thus making is super extensible.
-   Ultimately, since all our command classes implement the same base `Command` type, some container(s) can hold references to all the seperate commands we have created. If you think about it, the underlying task code (the receiver) of each command class can be widly different, and yet, through the power of interfaces, be allowed to be logically grouped together.

# Examples

### head-first-remote-example.ts

-   This is an application for a remote that can be used to control home appliances, for example turning on and turning off lights.
-   Every appliance has to implement an interface `Command`. This is because our `RemoteControl` class will expect ALL appliances to have the same `execute()` and `undo()` methods. So, the `RemoteControl` doesn't need to remember a bunch of different execution method names, it just needs to call `execute()` to execute an appliance (command it to do something).
-   This design essentially gives the `RemoteControl` a very simple interface to work with ALL possible appliances that implement the `Command` interface.
-   In our example, we only have one receiver class. A receiver class will define the code and implementation of some type of object (in our case, some appliance).
-   Next, we implement classes to command the receiver class previously, called concrete command classes. These classes will implement the `Command` interface. These classes will then take a reference to an object we created from the receiver class, then implements the specific methods defined inside the `Command` interface. Again, we're doing this to standardize all our appliances' APIs.

### job-queue.ts

-   A lengthy description and the motivation behind this project is commented at the top of the file.
-   If one understood this code, one might observe 2 things:
    -   Setting up a new department to use the company server's job queue takes only 1 additional class (the command class). We're assuming in this statement each department's already has their own code to begin with (receiver classes).
    -   To add a job to the queue, just create an instance of the command class with the actual job as a parameter, then throw it into `enqueueJobs()`!
