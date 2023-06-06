// Abstract Product: Pizza
abstract class Pizza {
    protected name!: string;

    abstract prepare(): void;

    bake(): void {
        console.log(`Baking ${this.name} pizza.`);
    }

    cut(): void {
        console.log(`Cutting ${this.name} pizza into slices.`);
    }

    box(): void {
        console.log(`Packing ${this.name} pizza in a box.`);
    }

    getName(): string {
        return this.name;
    }
}

// Concrete Products: Cheese Pizza and Veggie Pizza
class CheesePizza extends Pizza {
    constructor() {
        super();
        this.name = "Cheese Pizza";
    }

    prepare(): void {
        console.log("Preparing cheese pizza with cheese and tomato sauce.");
    }
}

class VeggiePizza extends Pizza {
    constructor() {
        super();
        this.name = "Veggie Pizza";
    }

    prepare(): void {
        console.log(
            "Preparing veggie pizza with various veggies and tomato sauce."
        );
    }
}

// Abstract Factory: PizzaIngredientFactory
abstract class PizzaIngredientFactory {
    abstract createDough(): string;
    abstract createSauce(): string;
}

// Concrete Factories: NYIngredientFactory and ChicagoIngredientFactory
class NYIngredientFactory extends PizzaIngredientFactory {
    createDough(): string {
        return "Thin crust dough";
    }

    createSauce(): string {
        return "Marinara sauce";
    }
}

class ChicagoIngredientFactory extends PizzaIngredientFactory {
    createDough(): string {
        return "Thick crust dough";
    }

    createSauce(): string {
        return "Plum tomato sauce";
    }
}

// Concrete Pizza Stores: NYStylePizzaStore and ChicagoStylePizzaStore
class NYStylePizzaStore {
    createPizza(pizzaType: string): Pizza {
        let pizza: Pizza;

        if (pizzaType === "cheese") {
            pizza = new CheesePizza();
        } else if (pizzaType === "veggie") {
            pizza = new VeggiePizza();
        } else {
            throw new Error(`Invalid pizza type: ${pizzaType}`);
        }

        const ingredientFactory: PizzaIngredientFactory =
            new NYIngredientFactory();
        pizza.prepare();
        console.log(
            `Using ${ingredientFactory.createDough()} and ${ingredientFactory.createSauce()} for ${pizza.getName()}`
        );

        return pizza;
    }
}

class ChicagoStylePizzaStore {
    createPizza(pizzaType: string): Pizza {
        let pizza: Pizza;

        if (pizzaType === "cheese") {
            pizza = new CheesePizza();
        } else if (pizzaType === "veggie") {
            pizza = new VeggiePizza();
        } else {
            throw new Error(`Invalid pizza type: ${pizzaType}`);
        }

        const ingredientFactory: PizzaIngredientFactory =
            new ChicagoIngredientFactory();
        pizza.prepare();
        console.log(
            `Using ${ingredientFactory.createDough()} and ${ingredientFactory.createSauce()} for ${pizza.getName()}`
        );

        return pizza;
    }
}

// Usage
const nyStylePizzaStore = new NYStylePizzaStore();
const chicagoStylePizzaStore = new ChicagoStylePizzaStore();

const nyCheesePizza = nyStylePizzaStore.createPizza("cheese");
console.log("\n");
const chicagoVeggiePizza = chicagoStylePizzaStore.createPizza("veggie");

/*
Preparing cheese pizza with cheese and tomato sauce.
Using Thin crust dough and Marinara sauce for Cheese Pizza


Preparing veggie pizza with various veggies and tomato sauce.
Using Thick crust dough and Plum tomato sauce for Veggie Pizza
  */
