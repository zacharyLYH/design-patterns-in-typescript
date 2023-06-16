/*
Imagine working on a payment system. In this payment system, we take a 2 step approach to designing the final product. 
Step 1: Build out independent and self-containing features and functions that our payment system might need.
Step 2: Assemble them.

In other words, for step 2, you're going to abstract away small components of the payment system into larger components, then stick an "all-encompassing" label on it, and "facade the smaller components away" behind the larger component.
*/

//A lot of small components for payment systems.
interface Components {
    receivePayment(): void;
    verifySum(): void;
    calculateChange(): void;
    dispenseChange(): void;
    verifyUser(): void;
    itemizeReceipt(): void;
    printReceipt(): void;
    thankYouPage(): void;
}

//Contain the smaller components in this larger ones
interface ClientFacingUI {
    clientFacingPayment(): void;
    clientFacingReceipt(): void;
    clientFacingThankYou(): void;
}

class ClientFacingUIFacade implements ClientFacingUI {
    private comps: Components;
    constructor(comps: Components) {
        this.comps = comps;
    }
    clientFacingPayment(): void {
        //Condense 5 steps into 1.
        this.comps.verifyUser();
        this.comps.receivePayment();
        this.comps.verifySum();
        this.comps.calculateChange();
        this.comps.dispenseChange();
    }
    clientFacingReceipt(): void {
        this.comps.itemizeReceipt();
        this.comps.printReceipt();
    }
    clientFacingThankYou(): void {
        //nothing much to facade away here, but nonetheless, not illegal
        this.comps.thankYouPage();
    }
}

class ComponentImplementation implements Components {
    verifySum(): void {
        console.log("Verifying sum");
    }
    receivePayment(): void {
        console.log("Receiving payment");
    }
    verifyUser(): void {
        console.log("Verifying user");
    }
    calculateChange(): void {
        console.log("Calculating change");
    }
    dispenseChange(): void {
        console.log("Dispensing change");
    }
    itemizeReceipt(): void {
        console.log("Itemizing receipt");
    }
    printReceipt(): void {
        console.log("Printing receipt");
    }
    thankYouPage(): void {
        console.log("Thanks!");
    }
}

/*
//Example of not using the Facade pattern! Let's not do this!
const notFacaded = new ComponentImplementation();
notFacaded.verifyUser();
notFacaded.receivePayment();
notFacaded.verifySum();
notFacaded.calculateChange();
notFacaded.dispenseChange();
notFacaded.itemizeReceipt();
notFacaded.printReceipt();
notFacaded.thankYouPage();
*/

const paymentStation1 = new ClientFacingUIFacade(new ComponentImplementation());
//instead of 8 method calls, we only did 3.
paymentStation1.clientFacingPayment();
paymentStation1.clientFacingReceipt();
paymentStation1.clientFacingThankYou();

//Best part is, now that we've abstracted away small tedious operations, setting up another payment station is so easy!
const paymentStation2 = new ClientFacingUIFacade(new ComponentImplementation());
paymentStation2.clientFacingPayment();
paymentStation2.clientFacingReceipt();
paymentStation2.clientFacingThankYou();

/*
Verifying user
Receiving payment
Verifying sum
Calculating change
Dispensing change
Itemizing receipt
Printing receipt
Thanks!
*/
