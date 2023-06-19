abstract class CaffeineBeverage {
    prepareRecipe(): void {
        this.boilWater();
        this.brew();
        this.pourInCup();
        if (this.customerWantsCondiments()) {
            this.addCondiments();
        }
    }

    abstract brew(): void;

    abstract addCondiments(): void;

    boilWater(): void {
        console.log("Boiling water");
    }

    pourInCup(): void {
        console.log("Pouring into cup");
    }

    // Hook method to be overridden by subclasses
    customerWantsCondiments(): boolean {
        return true;
    }
}

class Coffee extends CaffeineBeverage {
    brew(): void {
        console.log("Dripping coffee through filter");
    }

    addCondiments(): void {
        console.log("Adding sugar and milk");
    }

    // Override the hook method
    customerWantsCondiments(): boolean {
        // Implement the condition for coffee
        return false;
    }
}

class Tea extends CaffeineBeverage {
    brew(): void {
        console.log("Steeping the tea");
    }

    addCondiments(): void {
        console.log("Adding lemon");
    }

    // Override the hook method
    customerWantsCondiments(): boolean {
        // Implement the condition for tea
        return true;
    }
}

// Usage
const coffee: CaffeineBeverage = new Coffee();
coffee.prepareRecipe();

console.log("------------------------------------");

const tea: CaffeineBeverage = new Tea();
tea.prepareRecipe();

/*
Boiling water
Dripping coffee through filter      
Pouring into cup
------------------------------------
Boiling water
Steeping the tea
Pouring into cup
Adding lemon
*/
