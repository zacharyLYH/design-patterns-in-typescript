// Target interface that the client expects to work with
interface Duck {
    quack(): void;
    fly(): void;
}

// Adaptee interface that the client wants to use
interface Turkey {
    gobble(): void;
    fly(): void;
}

// Adapting the Turkey interface to the Duck interface using the Adapter pattern
class TurkeyAdapter implements Duck {
    private turkey: Turkey;

    constructor(turkey: Turkey) {
        this.turkey = turkey;
    }

    quack(): void {
        this.turkey.gobble();
    }

    fly(): void {
        for (let i = 0; i < 5; i++) {
            this.turkey.fly();
        }
    }
}

// Concrete implementation of the Duck interface
class MallardDuck implements Duck {
    quack(): void {
        console.log("Quack");
    }

    fly(): void {
        console.log("I'm flying");
    }
}

// Concrete implementation of the Turkey interface
class WildTurkey implements Turkey {
    gobble(): void {
        console.log("Gobble gobble");
    }

    fly(): void {
        console.log("I'm flying a short distance");
    }
}

// Usage
const mallardDuck: Duck = new MallardDuck();
const wildTurkey: Turkey = new WildTurkey();

// Using the Duck interface with a MallardDuck object
mallardDuck.quack(); // Output: Quack
mallardDuck.fly(); // Output: I'm flying

// Using the Duck interface with a TurkeyAdapter object
const turkeyAdapter: Duck = new TurkeyAdapter(wildTurkey);
turkeyAdapter.quack(); // Output: Gobble gobble
turkeyAdapter.fly(); // Output: I'm flying a short distance (printed 5 times due to the adapter)

/*
Quack
I'm flying   
Gobble gobble
I'm flying a short distance
I'm flying a short distance
I'm flying a short distance
I'm flying a short distance
I'm flying a short distance
*/
