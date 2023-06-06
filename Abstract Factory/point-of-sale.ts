/*
This script models a Point of Sale (POS) system, designed for reuse across a variety of locations worldwide. It enables individual stores to define their own product prices, mirroring real-world operations.

Supermarkets like Walmart simply update their class - specifically, the prices associated with each product type. This minimizes the need to interact with the core underlying system. This pattern encourages encapsulation, limiting the scope of knowledge necessary to maintain and update the system.

Key Components:
1. Abstract Factory (Supermarket): Provides an interface for creating a family of related objects, without specifying their concrete classes.
2. Concrete Factory (Walmart, Target): Implements the operations declared in the Abstract Factory to create distinct products.
3. PointOfSale: Acts as the client, interfacing with the factories to assemble the final product - a customer's receipt.

Side Note:
This structure can also be seen as a Strategy Pattern. The PointOfSale class utilizes Supermarket as a strategy, allowing Walmart or Target to be passed in interchangeably.

Features:
- Addition and removal of items from a virtual basket.
- Calculation of total cost based on individual product prices and quantities.
- Generation and printing of a receipt.

To use, create an instance of PointOfSale, passing in a Supermarket (Walmart or Target), and call the addItem method. When all items have been added, call printReceipt to see the final cost.

The design provides a scalable, extensible solution for POS systems, with the potential to add more supermarket classes or product types as required.
*/

//Abstract factory
abstract class Supermarket {
    abstract apples(): number;
    abstract banana(): number;
    abstract coke(): number;
    abstract dill(): number;
    abstract egg(): number;
    abstract falafel(): number;
    abstract grape(): number;
    protected methodMap: { [key: string]: () => number } = {};
    getMethodMap() {
        return this.methodMap;
    }
}

// Concrete factory
class Walmart extends Supermarket {
    constructor() {
        super();
        this.methodMap["apples"] = this.apples;
        this.methodMap["banana"] = this.banana;
        this.methodMap["coke"] = this.coke;
        this.methodMap["dill"] = this.dill;
        this.methodMap["egg"] = this.egg;
        this.methodMap["falafel"] = this.falafel;
        this.methodMap["grape"] = this.grape;
    }
    apples(): number {
        return 1;
    }
    banana(): number {
        return 0.4;
    }
    coke(): number {
        return 3;
    }
    dill(): number {
        return 0.1;
    }
    egg(): number {
        return 2;
    }
    falafel(): number {
        return 1.4;
    }
    grape(): number {
        return 2.5;
    }
}

//Concrete factory
class Target extends Supermarket {
    constructor() {
        super();
        this.methodMap["apples"] = this.apples;
        this.methodMap["banana"] = this.banana;
        this.methodMap["coke"] = this.coke;
        this.methodMap["dill"] = this.dill;
        this.methodMap["egg"] = this.egg;
        this.methodMap["falafel"] = this.falafel;
        this.methodMap["grape"] = this.grape;
    }
    apples(): number {
        return 1.4;
    }
    banana(): number {
        return 0.6;
    }
    coke(): number {
        return 2;
    }
    dill(): number {
        return 0.16;
    }
    egg(): number {
        return 0.9;
    }
    falafel(): number {
        return 1;
    }
    grape(): number {
        return 2.1;
    }
}

class PointOfSale {
    protected receipt: [string, number, number][] = [];
    protected priceList: Supermarket;
    protected storeName: string;
    constructor(whichStore: Supermarket, storeName: string) {
        this.priceList = whichStore;
        this.storeName = storeName;
    }
    addItem(item: string, pounds: number): void {
        const methodMap = this.priceList.getMethodMap();
        const method = methodMap[item];
        if (method) {
            const pricePerPound = method.call(this.priceList);
            const totalPrice = pricePerPound * pounds;
            for (let i = 0; i < this.receipt.length; i++) {
                if (this.receipt[i][0] === item) {
                    this.receipt[i][1] += pounds;
                    this.receipt[i][2] += totalPrice;
                    return;
                }
            }
            this.receipt.push([item, pounds, totalPrice]);
        } else {
            throw new Error(`No method found for item: ${item}`);
        }
    }
    removeItem(item: string, pounds: number): void {
        const methodMap = this.priceList.getMethodMap();
        const method = methodMap[item];
        if (method) {
            const pricePerPound = method.call(this.priceList);
            const amountToRemove = pricePerPound * pounds;
            for (let i = 0; i < this.receipt.length; i++) {
                if (this.receipt[i][0] === item) {
                    if (this.receipt[i][1] < pounds) {
                        throw new Error(
                            `Cannot remove more pounds than exist for item: ${item}`
                        );
                    }
                    this.receipt[i][1] -= pounds;
                    this.receipt[i][2] -= amountToRemove;
                    if (this.receipt[i][1] === 0) {
                        // Remove item from receipt if no more pounds are left
                        this.receipt.splice(i, 1);
                    }
                    return;
                }
            }
            throw new Error(`Item not found: ${item}`);
        } else {
            throw new Error(`No method found for item: ${item}`);
        }
    }
    printReceipt(): void {
        let totalCost = 0;
        console.log("Receipt:");
        console.log("---------------------------------");
        for (const [item, pounds, totalPrice] of this.receipt) {
            console.log(`Item: ${item}`);
            console.log(`Quantity: ${pounds} lbs`);
            console.log(`Total Price: $${totalPrice.toFixed(2)}`);
            console.log("---------------------------------");
            totalCost += totalPrice;
        }
        console.log(`Total cost: $${totalCost.toFixed(2)}`);
        console.log("---------------------------------");
        console.log(`Thank you for shopping at ${this.storeName}!`);
    }
}

const checkout = new PointOfSale(new Walmart(), "Manhattan store");
checkout.addItem("apples", 2);
checkout.addItem("banana", 2);
checkout.addItem("dill", 4);
checkout.printReceipt();

/*
---------------------------------
Item: apples
Quantity: 2 lbs
Total Price: $2.00
---------------------------------
Item: banana
Quantity: 2 lbs
Total Price: $0.80
---------------------------------
Item: dill
Quantity: 4 lbs
Total Price: $0.40
---------------------------------
Total cost: $3.20
---------------------------------
Thank you for shopping at Manhattan store!
*/
