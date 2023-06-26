# Overview

In the Head-First text, they present 3 scenarios/patterns for the proxy pattern. Unfortunately, some of the APIs used in demonstrating the pattern is not available in TypeScript, and a substitute is unavailable. The example you'll find below from the book is called the "Virtual proxy".

The proxy pattern at its core is a simple pattern. A `proxy` is an entity that sits infront of the `Subject`, whereby the `Subject` is who you're really interested in speaking with. An analogy would be, a `Subject` is a defendant in a court case and the `proxy` is their lawyer (loosely speaking). The lawyer represents the defendant, and can be seen as a proxy to the defendant for the outside world. When we speak of proxies in the context of tech, it usually means that this proxy is the interface between clients and the "real" resource that clients want to access. One reason for doing so is security; should an attack be launched at the resource, the resource stays safe while the replacable proxy takes the hit. Another reason proxy-ing is caching; the proxy can act as a cache to store previously invoked APIs (assuming the resource itself doesn't have a caching mechanism).

### head-first-album-cover-example.ts

-   This example is an example of the "virtual proxy" mentioned in the above section.
-   This example asks you to imagine a music player on your electronic device. Now, its common to have a cover image for every song. However, these images may take time to load, so ideally we want to cache these images so that on another fetch we don't have to go into the image repository to find the image again. It doesn't actually improve the fetching of the image, however it provides a more responsive experience!
-   The `RealAlbumCover` and `AlbumCoverProxy` both implement the `AlbumCover` interface. The idea is that the proxy will control when the `display()` function gets called. Now, to facilitate a good user experience, we want to cache the image inside `AlbumCoverProxy`. Note that caching functionality in `RealAlbumCover` is not set up, which is why we're doing it this way. Its worth mentioning that a caching implementation is nonetheless possible within `RealAlbumCover`.
-   At the call to `display()`, we hit the proxy's `display()` which will find out that `realAlbumCover` hasn't previously been fetched and will thus make the expensive 5 second call to establish a connection with `RealAlbumCover`. Now that a reference to it is established, from now on, the `display()` API call from `AlbumCoverProxy` can skip the fetching phase and go straight into displaying a cover image.
-   Note that this example isn't exactly "copying" images as I might've suggested - that would require more thorough implementation but that makes us digress from the point we're trying to make.

### load-balancer.ts

-   As usual, a good description and the motivation behind this idea is given at the top of the file.
-   In this scenario, the `LoadBalancer` class is a proxy for `CPU`. The key characteristic that makes this an example of the Proxy pattern is that the `LoadBalancer` class controls the access to `CPU` by using its Round Robin algorithm.
-   The `LoadBalancer` is thus a proxy to the `CPU`.
