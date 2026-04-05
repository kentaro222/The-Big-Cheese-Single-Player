const CACHE_NAME = 'big-cheese-v3';
const ASSETS_TO_CACHE = [
  'index.html',
  'manifest.json',
  // ゲーム内で使用されている画像資産
  'Card_2.png',
  'Card_4.png',
  'Card_6.png',
  'Card_8.png',
  'Card_10.png',
  'Card_12.png',
  'Card20.png',
  'Card_Veto.png',
  'Card_TheBigCheese.png',
  'Mouse_sheet.png'
];

// インストール時にキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// アクティベート：古いキャッシュを掃除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});
// フェッチ時にキャッシュがあればそれを返し、なければネットワークから取得
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
