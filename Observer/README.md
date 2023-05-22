# Overview

# Examples

### head-first-weather-with-getter-examples.ts

-   There is a weather forecasting station that receives forecasting data with their fancy in-house technology. Many other sites-such as news channel's weatherman-want to bring you this news live. The problem is that the weatherman doesn't know when new forecasting data is generated by the station. The weatherman needs to be an `Observer` to the `Subject` that is the forecasting station.
-   An interface `Observer` defines the method that **ALL** weathermen need to implement. Later, the station will broadcast news to any weatherman that implemented the `Observer` interface.
-   The `WeatherData` class (or in our case, the forecasting station or `Subject`) needs to (obviously) have ways of setting forecasts, and a list of _Observers_ that are subscribed to this forecast. The _Observers_ that subscribe to this forecast need to have implemented the `Observer` interface and will be stored as a reference within the forecast's broadcast manifest.
-   The forecaster (`WeatherData`) needs to provide registering and deregistering APIs too. They take a reference to the `Observer` (recall that this step is crucial, otherwise there is no way the forecaster knows who and where to send data to).
-   Each `Observer` will implement "what happens when the subject pushes data to them". This is business logic and maybe unique across different cases. All `Observer`s implement the `update()` method, it can be thought of as the edge of where `Observer`s receive data from the outside world (forecaster).
-   In the current implementation, `display()` is called immediately after an `update()` happens inside Observers, but this is business logic, and can be done however the business requires.

### auctions.ts

-   In this example, `Auction` is the broadcaster, and `Bidder`s are `Observers`. It should be noted this implementation is slightly more complicated because we use generics to enhance the robustness of this code.
-   The `Auction` can be used only if the type `T` has a base type of `Bidder`. This class implements several functions for registering, deregistering bidders, broadcasting the best bid so far, listening for bids, and also ending the auction.
-   Every `Bidder` must be able to do 3 things, listen for the most recent bid (`update()`), actually bid (`bid()`), and know if they've won (`alertWin()`).
-   `JeweleryBidding` is one such example of an implementation of `Bidder`. It should be noted that you may create your own auction (call it `MonalisaPaintingBid` or whatever) and implement almost the exact same API definitions.
-   In summary, this architecture is perfect for an auction system because the auctioneer will listen for bids coming from bidders and in real time notify every bidder participating. In the end of the auction, the auction will also notify the winner.