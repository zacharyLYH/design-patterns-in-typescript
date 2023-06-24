/*
Lets imagine a food delivery system. Its noted that real world food delivery services may have more fluff that pertains to their own business logic, however here we'll explore an implementation of a bare bones food delivery system.

Food delivery systems need a few discrete states. We'll think of this as pages of the app.
1) Select restaurant page 
2) Add items to basket page
3) Checkout with payment page
4) Track order page

There are also a few obvious actions that will take place in the process of ordering food delivery.
1) Choosing a restaurant
2) Selecting items
3) Making payment
4) Viewing an order's status
*/

interface FoodDeliveryStates {
    chooseRestaurant(): void;
    selectFood(): void;
    makePayment(): void;
    viewOrderStatus(): void;
}

class SelectRestaurantPage implements FoodDeliveryStates {
    private app: FoodDeliveryApp;
    constructor(appRef: FoodDeliveryApp) {
        this.app = appRef;
    }
    chooseRestaurant(): void {
        console.log("A restaurant was chosen");
        this.app.setAppState(this.app.getSelectFood());
    }
    selectFood(): void {
        console.log("You haven't selected a restaurant yet!");
    }
    makePayment(): void {
        console.log("You haven't selected a restaurant yet!");
    }
    viewOrderStatus(): void {
        console.log("You haven't selected a restaurant yet!");
    }
}

class SelectFoodPage implements FoodDeliveryStates {
    private app: FoodDeliveryApp;
    constructor(appRef: FoodDeliveryApp) {
        this.app = appRef;
    }
    chooseRestaurant(): void {
        console.log(
            "Going back to choosing restaurant from a restaurant's page"
        );
        this.app.setAppState(this.app.getSelectRestaurant());
    }
    selectFood(): void {
        console.log("This food item selected");
        this.app.setAppState(this.app.getMakePayment());
    }
    makePayment(): void {
        console.log("Not yet, next page!");
    }
    viewOrderStatus(): void {
        console.log("You haven't paid for food yet");
    }
}

class MakePaymentPage implements FoodDeliveryStates {
    private app: FoodDeliveryApp;
    constructor(appRef: FoodDeliveryApp) {
        this.app = appRef;
    }
    chooseRestaurant(): void {
        console.log("Going back to choosing restaurant from payment page");
        this.app.setAppState(this.app.getSelectRestaurant());
    }
    selectFood(): void {
        console.log("Going back to selection page");
        this.app.setAppState(this.app.getSelectFood());
    }
    makePayment(): void {
        console.log("Paid!");
        this.app.setAppState(this.app.getViewOrder());
    }
    viewOrderStatus(): void {
        console.log("Haven't paid yet!");
    }
}

class ViewOrderPage implements FoodDeliveryStates {
    private app: FoodDeliveryApp;
    constructor(appRef: FoodDeliveryApp) {
        this.app = appRef;
    }
    chooseRestaurant(): void {
        console.log("Making a new order!");
        this.app.setAppState(this.app.getSelectRestaurant());
    }
    selectFood(): void {
        console.log("Too late, can't change order anymore");
    }
    makePayment(): void {
        console.log("Already paid!");
    }
    viewOrderStatus(): void {
        console.log("Viewing order from View page");
    }
}

class FoodDeliveryApp {
    private selectRestaurant: FoodDeliveryStates;
    private selectFood: FoodDeliveryStates;
    private makePayment: FoodDeliveryStates;
    private viewOrder: FoodDeliveryStates;
    private currentState: FoodDeliveryStates;
    constructor() {
        this.selectRestaurant = new SelectRestaurantPage(this);
        this.selectFood = new SelectFoodPage(this);
        this.makePayment = new MakePaymentPage(this);
        this.viewOrder = new ViewOrderPage(this);
        this.currentState = this.selectRestaurant;
    }
    userChooseRestaurant(): void {
        this.currentState.chooseRestaurant();
    }
    userSelectFoodItem(): void {
        this.currentState.selectFood();
    }
    userMakePayment(): void {
        this.currentState.makePayment();
    }
    userViewOrder(): void {
        this.currentState.viewOrderStatus();
    }
    setAppState(newState: FoodDeliveryStates) {
        this.currentState = newState;
    }
    getSelectRestaurant(): FoodDeliveryStates {
        return this.selectRestaurant;
    }
    getSelectFood(): FoodDeliveryStates {
        return this.selectFood;
    }
    getMakePayment(): FoodDeliveryStates {
        return this.makePayment;
    }
    getViewOrder(): FoodDeliveryStates {
        return this.viewOrder;
    }
}

const foodDeliveryApp: FoodDeliveryApp = new FoodDeliveryApp();
// user starts ordering
foodDeliveryApp.userChooseRestaurant();
foodDeliveryApp.userSelectFoodItem();
// user changes their mind. they want to go back to choosing restaurants
foodDeliveryApp.userChooseRestaurant(); //this is to navigate back to the choose restaurant page
foodDeliveryApp.userChooseRestaurant(); //this is to actually choose a restaurant
foodDeliveryApp.userSelectFoodItem();
// okay, we're satisfied.
foodDeliveryApp.userMakePayment();
// payment made. lets view this order
foodDeliveryApp.userViewOrder();
// time to get desert
foodDeliveryApp.userChooseRestaurant();

/*
A restaurant was chosen
This food item selected
Going back to choosing restaurant from payment page
A restaurant was chosen
This food item selected
Paid!
Viewing order from View page
Making a new order!
*/
