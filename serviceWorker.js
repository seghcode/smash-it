const staticDevCoffee = "dev-coffee-site-v1"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/icons/tmosphere.svg",
"/images/icons/rain.svg",
"/images/icons/storm.svg",
"/images/icons/clear.svg",
"/images/icons/rise.svg",
"/images/icons/clouds.svg",
"/images/icons/set.svg",
"/images/icons/drizzle.svg",
"/images/icons/snow.svg"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })