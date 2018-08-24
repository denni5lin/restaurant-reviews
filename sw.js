var cacheName = 'v1';
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
	console.log('[ServiceWorker] Installed');

	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log("[ServiceWorker] Caching cacheFiles");
			return cache.addAll(cacheFiles);
		})
	)
})

self.addEventListener('activate', function(e) {
	console.log('[ServiceWorker] Activated');
})

self.addEventListener('fetch', function(e) {
	console.log('[ServiceWorker] Fetching', e.request.url);
})