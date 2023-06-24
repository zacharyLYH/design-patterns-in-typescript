// State interface
interface State {
    insertQuarter(): void;
    ejectQuarter(): void;
    turnCrank(): void;
    dispense(): void;
}

// Concrete state classes
class HasQuarterState implements State {
    private gumballMachine: GumballMachine;

    constructor(gumballMachine: GumballMachine) {
        this.gumballMachine = gumballMachine;
    }

    insertQuarter(): void {
        console.log("You can't insert another quarter");
    }

    ejectQuarter(): void {
        console.log("Quarter returned");
        this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
    }

    turnCrank(): void {
        console.log("You turned the crank...");
        this.gumballMachine.setState(this.gumballMachine.getSoldState());
    }

    dispense(): void {
        console.log("No gumball dispensed");
    }
}

class NoQuarterState implements State {
    private gumballMachine: GumballMachine;

    constructor(gumballMachine: GumballMachine) {
        this.gumballMachine = gumballMachine;
    }

    insertQuarter(): void {
        console.log("You inserted a quarter");
        this.gumballMachine.setState(this.gumballMachine.getHasQuarterState());
    }

    ejectQuarter(): void {
        console.log("You haven't inserted a quarter");
    }

    turnCrank(): void {
        console.log("You turned, but there's no quarter");
    }

    dispense(): void {
        console.log("You need to pay first");
    }
}

class SoldState implements State {
    private gumballMachine: GumballMachine;

    constructor(gumballMachine: GumballMachine) {
        this.gumballMachine = gumballMachine;
    }

    insertQuarter(): void {
        console.log("Please wait, we're already giving you a gumball");
    }

    ejectQuarter(): void {
        console.log("Sorry, you already turned the crank");
    }

    turnCrank(): void {
        console.log("Turning twice doesn't get you another gumball");
    }

    dispense(): void {
        this.gumballMachine.releaseBall();
        if (this.gumballMachine.getCount() > 0) {
            this.gumballMachine.setState(
                this.gumballMachine.getNoQuarterState()
            );
        } else {
            console.log("Oops, out of gumballs");
            this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
        }
    }
}

class SoldOutState implements State {
    private gumballMachine: GumballMachine;

    constructor(gumballMachine: GumballMachine) {
        this.gumballMachine = gumballMachine;
    }

    insertQuarter(): void {
        console.log("Sorry, the machine is sold out");
    }

    ejectQuarter(): void {
        console.log("You can't eject, you haven't inserted a quarter yet");
    }

    turnCrank(): void {
        console.log("You turned, but there are no gumballs");
    }

    dispense(): void {
        console.log("No gumball dispensed");
    }
}

// GumballMachine class
class GumballMachine {
    private soldOutState: State;
    private noQuarterState: State;
    private hasQuarterState: State;
    private soldState: State;

    private state: State;
    private count: number;

    constructor(count: number) {
        this.soldOutState = new SoldOutState(this);
        this.noQuarterState = new NoQuarterState(this);
        this.hasQuarterState = new HasQuarterState(this);
        this.soldState = new SoldState(this);

        this.count = count;
        if (count > 0) {
            this.state = this.noQuarterState;
        } else {
            this.state = this.soldOutState;
        }
    }

    insertQuarter(): void {
        this.state.insertQuarter();
    }

    ejectQuarter(): void {
        this.state.ejectQuarter();
    }

    turnCrank(): void {
        this.state.turnCrank();
        this.state.dispense();
    }

    releaseBall(): void {
        console.log("A gumball comes rolling out the slot");
        if (this.count !== 0) {
            this.count--;
        }
    }

    refill(count: number): void {
        this.count += count;
        console.log(
            `The gumball machine was refilled; new count: ${this.count}`
        );
        this.state = this.noQuarterState;
    }

    setState(state: State): void {
        this.state = state;
    }

    getSoldOutState(): State {
        return this.soldOutState;
    }

    getNoQuarterState(): State {
        return this.noQuarterState;
    }

    getHasQuarterState(): State {
        return this.hasQuarterState;
    }

    getSoldState(): State {
        return this.soldState;
    }

    getCount(): number {
        return this.count;
    }

    getState(): State {
        return this.state;
    }
}

// Usage example
const gumballMachine = new GumballMachine(5);

gumballMachine.insertQuarter();
gumballMachine.turnCrank();

gumballMachine.insertQuarter();
gumballMachine.ejectQuarter();
gumballMachine.turnCrank();

gumballMachine.insertQuarter();
gumballMachine.turnCrank();
gumballMachine.insertQuarter();
gumballMachine.turnCrank();
gumballMachine.ejectQuarter();

gumballMachine.refill(10);
gumballMachine.insertQuarter();
gumballMachine.turnCrank();

/*
You inserted a quarter
You turned the crank...
A gumball comes rolling out the slot
You inserted a quarter
Quarter returned
You turned, but there's no quarter
You need to pay first
You inserted a quarter
You turned the crank...
A gumball comes rolling out the slot
You inserted a quarter
You turned the crank...
A gumball comes rolling out the slot
You haven't inserted a quarter
The gumball machine was refilled; new count: 12
You inserted a quarter
You turned the crank...
A gumball comes rolling out the slot
  */
