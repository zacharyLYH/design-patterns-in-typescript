/*
Imagine a cache system in a very memory limited computer. We only want one cache to save on memory cost, so everybody that needs the cache should use the same instance. 

Enter the problem: 
- The system periodically destroys this cache because of the limited memory space. 
- On the computer's start up, there is no cache created yet (because the computer was just turned on), so an instance of a cache needs to be fired up. But, apps have no knowledge of whether an instance of a cache has been initialized by some other app or not, so the manufacturer's recommendation is to call getInstance() before using the cache any way, just in case you are the first one to be using the cache.

The solution is a cache system that is created if uncreated and in either case received using getInstance(). And, the Singleton pattern to assure we're only using one single instance of a cache for all applications to save memory.  

Note: The obvious down side to this cache is that since everyone shares a single instance of cacheData, apps can retrieve data other apps cached. We also don't handle synchronization problem here (2 apps might write at the same time, and could lead to undesirable behavior). 
*/
class MockSystemCache {
    private static instance: MockSystemCache;
    private cacheData = new Map<string, string>();
    private constructor() {
        // Private constructor to prevent instantiation from outside the class
    }
    public static getInstance(): MockSystemCache {
        if (!MockSystemCache.instance) {
            MockSystemCache.instance = new MockSystemCache();
        }
        return MockSystemCache.instance;
    }
    public writeToCache(key: string, value: string): void {
        this.cacheData.set(key, value);
    }
    public readCache(key: string): string {
        if (this.cacheData.has(key)) {
            return this.cacheData.get(key)!;
        } else {
            return "";
        }
    }
    private purgeCache() {
        // Timed destruction of this cache
    }
}

// 3 apps need the cache. Each app has no idea if the cache has been initialized yet or not. So, they all call it any way.
const webBrowser = MockSystemCache.getInstance();
const vsCode = MockSystemCache.getInstance();
const firewallApp = MockSystemCache.getInstance();

// Every app will write to the same cache. Only one cache was created thanks to the Singleton Pattern.
webBrowser.writeToCache("loginInfo", "P@SSW0RD");
webBrowser.writeToCache("history", "facebook.com");
vsCode.writeToCache("theme", "contrast");
firewallApp.writeToCache("excludeList", "http");

//Use the cache!
console.log(webBrowser.readCache("history"));
console.log(firewallApp.readCache("excludeList"));
