# Overview

In this section, we focus on the `Abstract Factory pattern`. Note that there is also the ("regular") `Factory Pattern` which we won't cover in this section. While these patterns are different, they fundamentally contain the same underlying lesson, so interested parties should not have a hard time picking up the regular Factory Pattern should the desire be present.

Simply speaking, the abstract factory pattern wants you to define all possible "actions" in an **abstract factory** or interface. Then, within **concrete factories**, define exactly what those "actions" do. The entire shpiel of the factory way of thinking comes down to knowing what can be considered as (in my language) an action. An action is like a lego piece - an individual piece. There are many of varieties of it, some you might use, some you might not. The point is, you need to define the properties these pieces have. Then, allow the client (like a factory assembly line), assemble what they need given those pieces you defined earlier.

So, the client relies on the abstract factory to provide the appropriate concrete factory for creating the products it needs. This allows for flexibility and loose coupling because you can swap out concrete factories without changing the client code, as long as they all implement the abstract factory interface.

The Abstract Factory design pattern is useful in situations where you need to create families of related objects or products without specifying their concrete classes. One interesting example is to use this pattern for creating software that needs to go into different Operating Systems. We can maintain a consistent interface of functionality, then for each platform, implement the interface defined.

The obvious pitfall of this pattern is its scalability. Since we are implementing to an interface, should the interface change, or requirements for specific concrete factories change, a lot of effort might be needed to update the interface and the affected concrete factories.

# Examples

### head-first-pizza-example.ts

-   At the heart of our pizza place, we have the blueprint for what every pizza should look like, our `Pizza` class. Every pizza, regardless of its topping, has some common steps in its lifecycle - it gets prepared, baked, cut into slices, and boxed. These steps are the same for all pizzas, right? But the 'preparation' varies depending on the type of pizza (like cheese or veggie), so that's why it's left abstract.
-   Now, let's get into the specifics of our pizzas - the `CheesePizza` and `VeggiePizza`. These classes define what it means to 'prepare' a cheese or veggie pizza specifically.
-   Now, where do our pizzas get their ingredients from? That's where `PizzaIngredientFactory` comes into the picture. It's a blueprint for creating the key ingredients for our pizzas - dough and sauce. But it doesn't define what kind of dough or sauce.
-   Okay, so we've got a generic `PizzaIngredientFactory`. But we know that New York and Chicago pizzas are pretty different, right? That's where `NYIngredientFactory` and `ChicagoIngredientFactory` come in. They decide what kind of dough and sauce we're using. Thin crust and marinara for New York, thick crust and plum tomato for Chicago.
-   Now, think of our `NYStylePizzaStore` and `ChicagoStylePizzaStore` as the pizza kitchens where all the magic happens. When you order a pizza, it gets created in these stores.
-   So, you step into our `NYStylePizzaStore` and order a cheese pizza. What happens? The store creates a `CheesePizza`, prepares it (meaning it prints out a statement about what goes into a cheese pizza), and then tells you that it's using thin crust dough and marinara sauce, cause that's the New York style. Same process in the `ChicagoStylePizzaStore`, but with the Chicago style of thick crust and plum tomato sauce.
-   If you try to order a pizza type that doesn't exist (like a 'pepperoni' in this case), the store will tell you that it can't make that kind of pizza.
-   And that's how you get a delicious New York or Chicago style pizza, right from ordering to preparation, in our pizza place code! The beauty here is, if we want to add another pizza type or ingredient, we can easily do so without changing how pizzas are made. It's like a well-oiled pizza-making machine!

### point-of-sale.ts

-   Imagine we're building a system to handle checkouts at supermarkets. We have different supermarket brands, like Walmart and Target, and they all sell similar items but at different prices. So first, we create a general blueprint for all supermarkets, called `Supermarket`. This blueprint lists what kind of items any supermarket should have (like apples, bananas, etc.) without specifying the price - because prices can differ per store.
-   Next, we have our actual supermarkets, `Walmart` and `Target`. Think of these as real-world stores built using our Supermarket blueprint. But now, we're filling in the specifics - the prices for each item in these stores.
-   Both `Walmart` and `Target` come with a special 'price list', which we call `methodMap` in the code. This is like a dictionary where you can look up any item and find out its price.
-   Now let's bring in the cash register - that's our `PointOfSale` class. When a customer wants to buy something, they go to the cash register, right? The `PointOfSale` class handles that. It uses the `Supermarket` you're in to check the price of an item and add it to the receipt.
-   If a customer picks up an item and brings it to the cash register, that's like calling the `addItem` method. We specify the item and its quantity, the cash register (i.e., `PointOfSale`) checks the price from the supermarket's 'price list', calculates the total cost, and adds this to the receipt.
-   Oops! A customer changed their mind and want to put something back? That's what the `removeItem` function is for. It works like `addItem`, but in reverse - it subtracts the cost of the removed item from the receipt.
-   Finally, once all items are added and removed, we can print the receipt with `printReceipt`. This shows the customer each item they're buying, the quantity, and the total price, along with the grand total for all items.
-   So, when we run the system, we set up the cash register at a specific supermarket (say, a `Walmart`), add items to the checkout, maybe remove a few, and finally, print out the receipt.
