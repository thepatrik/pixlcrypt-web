"use strict";
const opts = {ignoreSearch: true};

self.addEventListener("fetch", function(event) {
    let url = event.request.url.toString();
    if (event.request.method === "GET" && !url.startsWith("http://localhost") && !url.startsWith("https://pixlcrypt.com")) {
        event.respondWith(
            caches.open("pixlcrypt-dynamic").then(function(cache) {
                return cache.match(event.request, opts).then(function (response) {
                    // if (response !== undefined) {
                    //     console.log("Content is cached", event.request.url);
                    // }
                    return response || fetch(event.request).then(function(response) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            })
        );
    }
});
