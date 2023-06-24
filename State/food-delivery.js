"use strict";
/*
Lets imagine a food delivery system. Its noted that real world food delivery services may have more fluff that pertains to their own business logic, however here we'll explore an implementation of a bare bones food delivery system.

Food delivery systems need a few discrete states.
1) Select restaurant
2) Add items to basket
3) Checkout with payment
4) Track order

There are also a few obvious actions that will take place in the process of ordering food delivery.
1) Choosing a restaurant
2) Selecting items
3) Making payment
4) Viewing an order's status
*/
var SelectRestaurantPage = /** @class */ (function () {
    function SelectRestaurantPage(appRef) {
        this.app = appRef;
    }
    SelectRestaurantPage.prototype.chooseRestaurant = function () {
        console.log("A restaurant was chosen");
        this.app.setAppState(this.app.getSelectFood());
    };
    SelectRestaurantPage.prototype.selectFood = function () {
        console.log("You haven't selected a restaurant yet!");
    };
    SelectRestaurantPage.prototype.makePayment = function () {
        console.log("You haven't selected a restaurant yet!");
    };
    SelectRestaurantPage.prototype.viewOrderStatus = function () {
        console.log("You haven't selected a restaurant yet!");
    };
    return SelectRestaurantPage;
}());
var SelectFoodPage = /** @class */ (function () {
    function SelectFoodPage(appRef) {
        this.app = appRef;
    }
    SelectFoodPage.prototype.chooseRestaurant = function () {
        console.log("Going back to choosing restaurant from a restaurant's page");
        this.app.setAppState(this.app.getSelectRestaurant());
    };
    SelectFoodPage.prototype.selectFood = function () {
        console.log("This food item selected");
        this.app.setAppState(this.app.getMakePayment());
    };
    SelectFoodPage.prototype.makePayment = function () {
        console.log("Not yet, next page!");
    };
    SelectFoodPage.prototype.viewOrderStatus = function () {
        console.log("You haven't paid for food yet");
    };
    return SelectFoodPage;
}());
var MakePaymentPage = /** @class */ (function () {
    function MakePaymentPage(appRef) {
        this.app = appRef;
    }
    MakePaymentPage.prototype.chooseRestaurant = function () {
        console.log("Going back to choosing restaurant from payment page");
        this.app.setAppState(this.app.getSelectRestaurant());
    };
    MakePaymentPage.prototype.selectFood = function () {
        console.log("Going back to selection page");
        this.app.setAppState(this.app.getSelectFood());
    };
    MakePaymentPage.prototype.makePayment = function () {
        console.log("Paid!");
        this.app.setAppState(this.app.getViewOrder());
    };
    MakePaymentPage.prototype.viewOrderStatus = function () {
        console.log("Haven't paid yet!");
    };
    return MakePaymentPage;
}());
var ViewOrderPage = /** @class */ (function () {
    function ViewOrderPage(appRef) {
        this.app = appRef;
    }
    ViewOrderPage.prototype.chooseRestaurant = function () {
        console.log("Making a new order!");
        this.app.setAppState(this.app.getSelectRestaurant());
    };
    ViewOrderPage.prototype.selectFood = function () {
        console.log("Too late, can't change order anymore");
    };
    ViewOrderPage.prototype.makePayment = function () {
        console.log("Already paid!");
    };
    ViewOrderPage.prototype.viewOrderStatus = function () {
        console.log("Viewing order from View page");
    };
    return ViewOrderPage;
}());
var FoodDeliveryApp = /** @class */ (function () {
    function FoodDeliveryApp() {
        this.selectRestaurant = new SelectRestaurantPage(this);
        this.selectFood = new SelectFoodPage(this);
        this.makePayment = new MakePaymentPage(this);
        this.viewOrder = new ViewOrderPage(this);
        this.currentState = this.selectRestaurant;
    }
    FoodDeliveryApp.prototype.userChooseRestaurant = function () {
        this.currentState.chooseRestaurant();
    };
    FoodDeliveryApp.prototype.userSelectFoodItem = function () {
        this.currentState.selectFood();
    };
    FoodDeliveryApp.prototype.userMakePayment = function () {
        this.currentState.makePayment();
    };
    FoodDeliveryApp.prototype.userViewOrder = function () {
        this.currentState.viewOrderStatus();
    };
    FoodDeliveryApp.prototype.setAppState = function (newState) {
        this.currentState = newState;
    };
    FoodDeliveryApp.prototype.getSelectRestaurant = function () {
        return this.selectRestaurant;
    };
    FoodDeliveryApp.prototype.getSelectFood = function () {
        return this.selectFood;
    };
    FoodDeliveryApp.prototype.getMakePayment = function () {
        return this.makePayment;
    };
    FoodDeliveryApp.prototype.getViewOrder = function () {
        return this.viewOrder;
    };
    return FoodDeliveryApp;
}());
var foodDeliveryApp = new FoodDeliveryApp();
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
