// Service Worker para Fisioneo PWA - Com suporte offline
const CACHE_NAME = 'fisioneo-cache-v2';

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
    }).then(() => {
      return self.clients.claim();
    })
  );
  
  console.log('Service Worker ativado');
});

// Estratégia de cache: Network First para a maioria, Cache First para provas
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
            // Atualiza o cache em segundo plano
            fetch(event.request)
              .then(networkResponse => {
                if (networkResponse && networkResponse.status === 200) {
                  caches.open(CACHE_NAME)
                    .then(cache => {
                      cache.put(event.request, networkResponse.clone());
                    });
                }
              })
              .catch(() => {
                console.log('Falha ao atualizar cache, usando versão existente');
              });
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
            .catch(error => {
              console.log('Falha ao buscar recurso:', error);
              // Se falhar a rede e for uma página HTML, retorna a página offline
              if (event.request.headers.get('Accept')?.includes('text/html')) {
                return caches.match('/offline.html');
              }
              return new Response('Recurso não disponível offline', {
                status: 503,
                statusText: 'Serviço indisponível'
              });
            });
        })
    );
    return;
  }
  
  // Para outros recursos, usa estratégia Network First
  event.respondWith(
    fetch(event.request)
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
      .catch(error => {
        console.log('Falha ao buscar recurso da rede, tentando cache:', error);
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // Se não estiver no cache e for uma página HTML, retorna a página offline
            if (event.request.headers.get('Accept')?.includes('text/html')) {
              return caches.match('/offline.html');
            }
            
            // Para outros recursos (imagens, scripts, etc.), retorna um erro
            return new Response('Recurso não disponível offline', {
              status: 503,
              statusText: 'Serviço indisponível'
            });
          });
      })
  );
}); 