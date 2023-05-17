// Roughly adapted from https://github.com/bethrobson/Head-First-Design-Patterns/tree/master/src/headfirst/designpatterns/strategy into Typescript.

// Fly behavior interface
interface FlyBehavior {
    fly(): void;
}

// Concrete fly behaviors
class FlyWithWings implements FlyBehavior {
    fly(): void {
        console.log("Flying with wings!");
    }
}

class FlyNoWay implements FlyBehavior {
    fly(): void {
        console.log("Unable to fly!");
    }
}

// Quack behavior interface
interface QuackBehavior {
    quack(): void;
}

// Concrete quack behaviors
class Quack implements QuackBehavior {
    quack(): void {
        console.log("Quack!");
    }
}

class Squeak implements QuackBehavior {
    quack(): void {
        console.log("Squeak!");
    }
}

class MuteQuack implements QuackBehavior {
    quack(): void {
        console.log("<< Silence >>");
    }
}

// Duck abstract class
abstract class Duck {
    protected flyBehavior: FlyBehavior;
    protected quackBehavior: QuackBehavior;

    constructor() {
        //Give it default behaviors otherwise it complains.
        this.flyBehavior = new FlyWithWings();
        this.quackBehavior = new MuteQuack();
    }

    setFlyBehavior(flyBehavior: FlyBehavior): void {
        this.flyBehavior = flyBehavior;
    }

    setQuackBehavior(quackBehavior: QuackBehavior): void {
        this.quackBehavior = quackBehavior;
    }

    performFly(): void {
        this.flyBehavior.fly();
    }

    performQuack(): void {
        this.quackBehavior.quack();
    }

    swim(): void {
        console.log("All ducks float, even decoys!");
    }

    abstract display(): void;
}

// Concrete Duck subclasses
class MallardDuck extends Duck {
    constructor() {
        super(); //calls the parent's (Duck) constructor to ensure initialization code in parent is done before it gets to children
        this.flyBehavior = new FlyWithWings();
        this.quackBehavior = new Quack();
    }

    display(): void {
        console.log("I'm a real Mallard duck!");
    }
}

class RubberDuck extends Duck {
    constructor() {
        super();
        this.flyBehavior = new FlyNoWay();
        this.quackBehavior = new Squeak();
    }

    display(): void {
        console.log("I'm a rubber duckie!");
    }
}

class DecoyDuck extends Duck {
    constructor() {
        super();
        this.flyBehavior = new FlyNoWay();
        this.quackBehavior = new MuteQuack();
    }

    display(): void {
        console.log("I'm a decoy duck!");
    }
}

// Usage
const mallard = new MallardDuck();
mallard.display(); // Output: I'm a real Mallard duck!
mallard.performFly(); // Output: Flying with wings!
mallard.performQuack(); // Output: Quack!
mallard.swim(); // Output: All ducks float, even decoys!

const rubberDuck = new RubberDuck();
rubberDuck.display(); // Output: I'm a rubber duckie!
rubberDuck.performFly(); // Output: Unable to fly!
rubberDuck.performQuack(); // Output: Squeak!
rubberDuck.swim(); // Output: All ducks float, even decoys!

const decoyDuck = new DecoyDuck();
decoyDuck.display(); // Output: I'm a decoy duck!
decoyDuck.performFly(); // Output: Unable to fly!
decoyDuck.performQuack(); // Output: << Silence >>
decoyDuck.swim(); // Output: All ducks float, even decoys!

// Changing behaviors at runtime
mallard.setFlyBehavior(new FlyNoWay());
mallard.setQuackBehavior(new Squeak());
mallard.performFly(); // Output: Unable to fly!
mallard.performQuack(); // Output: Squeak!
