var staticCacheName = 'v1';
var cacheFiles = [
	'/',
	'/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/registerSW.js',
    '/js/restaurant_info.js'
];

self.addEventListener('install', function(e) {
	// console.log('[ServiceWorker] Installed');

	e.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			console.log("[ServiceWorker] Caching cacheFiles");
			return cache.addAll(cacheFiles);
		})
		.catch(error => {
			console.log(error);
		})
	);
});

self.addEventListener('activate', function(e) {
	// console.log('[ServiceWorker] Activated');
  	
	e.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {
				if (thisCacheName !== staticCacheName) {
					console.log('[ServiceWorker] Removing cached files from ', thisCacheName);
					return caches.delete(thisCacheName);
				};
			}));
		})
	);

});

self.addEventListener('fetch', function(e) {
	// console.log('[ServiceWorker] Fetching', e.request.url);

	e.respondWith(
		caches.match(e.request).then(function(response) {
			if (response !== undefined) {
				return response;
			} else {
				return fetch(e.request).then(function(response) {
					let responseClone = response.clone();
					caches.open(staticCacheName).then(function(cache) {
						cache.put(e.request, responseClone);
					});
					return response;
				});
			};
		})
	);
});
