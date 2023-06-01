// Beverage interface
interface Beverage {
    getDescription(): string;
    cost(): number;
}

// Concrete beverage class
class Espresso implements Beverage {
    getDescription() {
        return "Espresso";
    }

    cost() {
        return 1.99;
    }
}

// Abstract decorator class
abstract class CondimentDecorator implements Beverage {
    protected beverage: Beverage;

    constructor(beverage: Beverage) {
        this.beverage = beverage;
    }

    getDescription(): string {
        return "spam"; //this method gets overriden by the child classes anyway.
    }

    cost(): number {
        return 69420; //this method gets overriden by the child classes anyway.
    }
}

// Concrete decorator classes
class Milk extends CondimentDecorator {
    getDescription(): string {
        return this.beverage.getDescription() + ", Milk";
    }

    cost(): number {
        return this.beverage.cost() + 0.5;
    }
}

class Mocha extends CondimentDecorator {
    getDescription(): string {
        return this.beverage.getDescription() + ", Mocha";
    }

    cost(): number {
        return this.beverage.cost() + 0.75;
    }
}

// Usage
const beverage: Beverage = new Espresso();
console.log(beverage.getDescription(), "$" + beverage.cost());

const beverageWithMilk: Beverage = new Milk(beverage);
console.log(beverageWithMilk.getDescription(), "$" + beverageWithMilk.cost());

const beverageWithMilkAndMocha: Beverage = new Mocha(beverageWithMilk);
console.log(
    beverageWithMilkAndMocha.getDescription(),
    "$" + beverageWithMilkAndMocha.cost()
);
