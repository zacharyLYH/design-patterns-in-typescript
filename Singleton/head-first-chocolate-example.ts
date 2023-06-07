class ChocolateMachine {
    private static instance: ChocolateMachine;

    private constructor() {
        // Private constructor to prevent instantiation from outside the class
    }

    public static getInstance(): ChocolateMachine {
        if (!ChocolateMachine.instance) {
            ChocolateMachine.instance = new ChocolateMachine();
        }
        return ChocolateMachine.instance;
    }

    public createChocolate(): void {
        console.log("Creating delicious chocolate...");
    }
}

// Usage:
const worker1 = ChocolateMachine.getInstance();
const worker2 = ChocolateMachine.getInstance();

console.log(worker1 === worker2); // Output: true

worker1.createChocolate(); // Output: Creating delicious chocolate...

//Oops, another worker clicked the createChocolate() button. But thank goodness we're using the Singleton pattern and all chocolate creation references the same instance, otherwise we'll have double the needed chocolate on our hands.
worker2.createChocolate(); // Output: Creating delicious chocolate...
