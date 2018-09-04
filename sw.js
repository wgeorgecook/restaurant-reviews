// Service worker file

var staticCacheName = 'restaurant-static-v1';


self.addEventListener('install', function(event) {

  event.waitUntil(
    caches.open('restaurant-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/offline.html',
        '/restaurant.html',
        'js/dbhelper.js',
        'js/main.js',
        'js/restaurant_info.js',
        '/css/styles.css',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg',
      ]);
    })
  );
});

// Thanks to the Google Developers Tutorials for helping me understand cache.put!
// https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
// Code modified to use the recommended cache.add, as well as to return
// offline.html if no cached asset found.

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('restaurant-cache').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.add(event.request);
          return response
        }).catch(function() {return cache.match('/offline.html')});
      });
    })
  );
});