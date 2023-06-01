/*
Imagine an auction house. In the spirit of generality, we use typescript generics in this implementation. In our example, we auction Jewelery, and so, we'll name our observer's actions JeweleryBidding. Our Observer shall be called Observer.
*/

// Allows registering and deregistering bidders. Receiving bids. Broadcasting when a new higher bid comes in. End the auction and alert the winner.
class Auction<T extends Bidder> {
    private bidders: T[];
    private highestBidder: T | undefined;
    private bestBidSoFar: number;
    constructor() {
        this.bidders = [];
        this.highestBidder = undefined;
        this.bestBidSoFar = 0;
    }
    addBidder(bidder: T) {
        this.bidders.push(bidder);
    }
    removeBidder(bidder: T) {
        this.bidders.filter((b) => b !== bidder);
    }
    broadcastBidState(): void {
        for (const b of this.bidders) {
            b.update(this.bestBidSoFar);
        }
    }
    receiveBids(bidder: T, amountBidded: number): void {
        if (amountBidded > this.bestBidSoFar) {
            this.highestBidder = bidder;
            this.bestBidSoFar = amountBidded;
        }
        this.broadcastBidState();
    }
    auctionEnd(): void {
        for (const b of this.bidders) {
            if (b === this.highestBidder) {
                b.alertCloseAuction(true, this.bestBidSoFar);
            } else {
                b.alertCloseAuction(false, this.bestBidSoFar);
            }
        }
    }
}

interface Bidder {
    update(bestBidSoFar: number): void;
    bid(amountBid: number): void;
    alertCloseAuction(win: boolean, amount: number): void;
}

//All participants (observers) will have these methods to use.
class JewelryBidding implements Bidder {
    private auctionAPI: Auction<JewelryBidding>;
    private name: string;
    constructor(auctionJoined: Auction<JewelryBidding>, name: string) {
        this.auctionAPI = auctionJoined;
        this.name = name;
    }
    bid(amountBid: number): void {
        this.auctionAPI.receiveBids(this, amountBid);
    }
    update(bestBidSoFar: number): void {
        console.log(`Dear ${this.name}, best bid so far: ${bestBidSoFar}`);
    }
    alertCloseAuction(win: boolean, amount: number): void {
        if (win) {
            console.log(
                `Congratulations ${this.name}, you won the bid with ${amount}`
            );
        } else {
            console.log(`Sorry ${this.name}, you lost the bet`);
        }
    }
}

const auction = new Auction<JewelryBidding>();

const bidder1 = new JewelryBidding(auction, "bidder1");
const bidder2 = new JewelryBidding(auction, "bidder2");

auction.addBidder(bidder1);
auction.addBidder(bidder2);

bidder1.bid(100);
bidder2.bid(200);
bidder1.bid(350);
bidder2.bid(351);
bidder1.bid(400);
auction.auctionEnd();

/*
Dear bidder1, best bid so far: 100
Dear bidder2, best bid so far: 100
Dear bidder1, best bid so far: 200
Dear bidder2, best bid so far: 200
Dear bidder1, best bid so far: 350
Dear bidder2, best bid so far: 350
Dear bidder1, best bid so far: 351
Dear bidder2, best bid so far: 351
Dear bidder1, best bid so far: 400
Dear bidder2, best bid so far: 400
Congratulations bidder1, you won the bid with 400
Sorry bidder2, you lost the bet
*/
