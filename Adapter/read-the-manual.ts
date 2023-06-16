/*
In this scenario, our company's website needs a payment system. Instead of reinventing the wheel, we're going to use some third party payment system. However, we hit a roadblock.

Our company cheaped out and acquired services from a third party company that don't have the best engineers. These incompetent engineers didn't read the manual, and thus didn't follow the interface contract that your company laid out. To make things worse, because of their incompetence, they wrote some fragile and highly coupled code, and modifying even 1 character in the code causes a massive system crash. Getting them to redo the task now will be a nightmarish task, and their company wants us to take it or leave it; no refund though. It's annoying, because its not your fault they couldn't follow the API contract laid out during the planning phase of the project, yet it now falls upon you to come up with a solution to their incompetence.

Too late, your company has already moved forward with using the API names previously agreed upon in their front end code. So, it would be highly inefficient to ask the front end team to rename all their methods now. Living under this constraint, only one thing left to do, your job is to adapt the lousy third party code into your API. In other words, bridge the bad third party interface to the one that your front end team is expecting. Sucks to be the middleman. 
*/

interface OurCompany {
    executePayment(): void;
    generateReceipt(): void;
    sendConfirmationEmail(): void;
}

//As you can see, these method names are clearly not what we agreed upon.
interface ThirdParty {
    imRollingInMoneyLetsGoo(): void;
    receiptsAreLame(): void;
    whatsAnEmail(): void;
}

class ThirdPartyAdapter implements OurCompany {
    private bad: ThirdParty;
    constructor(bad: ThirdParty) {
        this.bad = bad;
    }
    //Lets work some adapter magic. Take their bad code and wrap it in what we previously agreed upon.
    executePayment(): void {
        this.bad.imRollingInMoneyLetsGoo();
    }
    generateReceipt(): void {
        this.bad.receiptsAreLame();
    }
    sendConfirmationEmail(): void {
        this.bad.whatsAnEmail();
    }
}

class ConcreteThirdParty implements ThirdParty {
    imRollingInMoneyLetsGoo(): void {
        console.log("Ca-ching");
    }
    receiptsAreLame(): void {
        console.log("Printing letters and numbers...");
    }
    whatsAnEmail(): void {
        console.log("Sending a letter over the internet");
    }
}

const endResult: OurCompany = new ThirdPartyAdapter(new ConcreteThirdParty());
//We were able to use the agreed upon API in the end. 
endResult.executePayment();
endResult.generateReceipt();
endResult.sendConfirmationEmail();
