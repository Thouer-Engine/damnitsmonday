// Choose a cache name
const cacheName = "cache-v1";

// List the files to precache
const precacheResources = [
  "./",
  "./index.html",
  "./main.css",
  "./manifest.json",
  "./sw.js",
  "./js/axios.min.js",
  "./js/cena0.js",
  "./js/cena1.js",
  "./js/cena2.js",
  "./js/cena3.js",
  "./js/cena4.js",
  "./js/cenafinal.js",
  "./js/cenamapas.js",
  "./js/cenasala.js",
  "./js/cenastart.js",
  "./js/config.js",
  "./js/gameover.js",
  "./js/index.js",
  "./js/phaser.min.js",
  "./js/win.js",
  //assets//
  "./assets/botão/baixo.png",
  "./assets/botão/botoes.png",
  "./assets/botão/menubutton.png",
  "./assets/botão/no.png",
  "./assets/botão/telacheia.png",
  "./assets/botão/try_or_menu.png",
  "./assets/botão/trybutton.png",
  "./assets/botão/yes.png",
  "./assets/cenário/mapa/maparoxo1.json",
  "./assets/cenário/mapa/tiles.png",
  "./assets/cenário/quarta/png/quarta.png",
  "./assets/cenário/quarta/quarta.json",
  "./assets/cenário/quarta/quarta.tmj",

  "./assets/cenário/segunda/png/segunda.png",
  "./assets/cenário/segunda/tile/blocos.png",
  "./assets/cenário/segunda/tile/completo.png",
  "./assets/cenário/segunda/tile/fundo_final.png",
  "./assets/cenário/segunda/tile/New Piskel (1).png",
  "./assets/cenário/segunda/tile/Pointer1.png",
  "./assets/cenário/segunda/tile/segunda.json",
  "./assets/cenário/segunda/tile/tiles.png",
  "./assets/cenário/segunda/segunda.json",
  "./assets/cenário/segunda/segunda.tmj",
  "./assets/cenário/segunda/segunda.tmx",

  "./assets/cenário/terca/terca.json",
  "./assets/cenário/terca/terca.tmj",
  "./assets/cenário/terca/png/terca.png",
  "./assets/cenário/unico/tileset.png",
  "./assets/cenário/unico/unico.json",

  "./assets/cenário/gameover.png",
  "./assets/cenário/start.png",
  "./assets/cenário/tela_inicial_taptostart.png",
  "./assets/cenário/tela_salas.png",
  "./assets/cenário/win.png",

  "./assets/fases/botoes_comcadeado.png",
  "./assets/fases/botoes_sem_cadeado.png",
  "./assets/fases/fundo_fases.png",
  "./assets/fases/monday.png",
  "./assets/fases/thursday.png",
  "./assets/fases/tuesday.png",
  "./assets/fases/wednesday.png",
  "./assets/fases/weekend.png",

  "./assets/itens/acionarsom.png",
  "./assets/itens/explosao.png",
  "./assets/itens/mapa.png",
  "./assets/itens/poder_beto.png",
  "./assets/itens/poder_plinio.png",
  "./assets/itens/poder.png",
  "./assets/itens/portal1.png",
  "./assets/itens/portal2.png",

  "./assets/personagem/monster/monster_blackgold.png",
  "./assets/personagem/monster/monster_blueball.png",
  "./assets/personagem/monster/monster_dog.png",
  "./assets/personagem/monster/monster_green.png",
  "./assets/personagem/monster/monster_red.png",
  "./assets/personagem/monster/purple_monster.png",

  "./assets/personagem/plinio_sprite.png",
  "./assets/personagem/beto_sprite.png",

  "./assets/salas/salas.png",
  "./assets/salas/salasbotoes.png",
  "./assets/salas/texto.png",

  "./assets/som/background.mp3",
  "./assets/som/som.mp3",
  "./assets/som/somderobo.mp3",
  "./assets/som/somexplosao.mp3",
  "./assets/som/somgameover.mp3",
  "./assets/som/somportal.mp3",
  "./assets/som/somrobo.mp3",

  "./assets/logo/128.png",
  "./assets/logo/192.png",
  "./assets/logo/256.png",
  "./assets/logo/384.png",
  "./assets/logo/512.png",
];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener("install", (event) => {
  console.log("Service worker install event!");
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(precacheResources))
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activate event!");
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
