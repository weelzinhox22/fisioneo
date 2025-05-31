// Service Worker para Fisioneo PWA - Com suporte offline
const CACHE_NAME = 'fisioneo-cache-v1';

// Recursos que serão cacheados para acesso offline
const urlsToCache = [
  '/',
  '/icons/baby-boy.png',
  '/icons/baby-icon-192.png',
  '/icons/baby-icon-512.png',
  '/manifest.json',
  // Páginas principais
  '/temas',
  '/provas',
  '/prova-neo',
  '/prova-ped',
  '/documentos',
  // Arquivos estáticos (CSS, JS, imagens)
  '/_next/static/',
  // Fontes
  '/fonts/'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  self.skipWaiting();
  console.log('Service Worker instalado com sucesso');
  
  // Pré-cachear recursos importantes
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Erro ao cachear recursos:', error);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
  // Limpar caches antigos
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  self.clients.claim();
  console.log('Service Worker ativado');
});

// Estratégia de cache: Cache First, depois Network
self.addEventListener('fetch', event => {
  // Ignorar requisições não GET
  if (event.request.method !== 'GET') return;
  
  // Ignorar requisições de análise/analytics
  if (event.request.url.includes('/analytics') || 
      event.request.url.includes('/gtag') || 
      event.request.url.includes('/gtm')) {
    return;
  }

  // Estratégia de cache para páginas de provas - Cache First
  if (event.request.url.includes('/prova-') || 
      event.request.url.includes('/provas')) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Retorna do cache se existir
          if (response) {
            return response;
          }

          // Se não estiver no cache, busca da rede
          return fetch(event.request)
            .then(networkResponse => {
              // Salva uma cópia no cache
              if (networkResponse && networkResponse.status === 200) {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(event.request, responseToCache);
                  });
              }
              return networkResponse;
            })
            .catch(() => {
              // Se falhar a rede, tenta servir uma página offline
              return caches.match('/offline.html');
            });
        })
    );
    return;
  }
  
  // Para outros recursos, usa estratégia Stale-While-Revalidate
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            // Atualiza o cache com a nova resposta se for bem-sucedida
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(error => {
            console.log('Falha ao buscar recurso:', error);
            // Se falhar a rede e for uma página HTML, retorna a página offline
            if (event.request.headers.get('Accept').includes('text/html')) {
              return caches.match('/offline.html');
            }
            return null;
          });
          
        // Retorna o cache enquanto busca da rede em segundo plano
        return cachedResponse || fetchPromise;
      });
    })
  );
}); 