/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/notifications/send/route";
exports.ids = ["app/api/notifications/send/route"];
exports.modules = {

/***/ "(rsc)/./app/api/notifications/send/route.ts":
/*!*********************************************!*\
  !*** ./app/api/notifications/send/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_supabase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/supabase */ \"(rsc)/./lib/supabase.ts\");\n/* harmony import */ var web_push__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! web-push */ \"(rsc)/./node_modules/web-push/src/index.js\");\n/* harmony import */ var web_push__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(web_push__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n// Chaves VAPID para identificar o remetente junto aos serviços de push\n// Em produção, estas chaves devem ser geradas e armazenadas como variáveis de ambiente\nconst VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || 'BLBx-hf2WrQ3CWn-wd5iB7tp1LS6UxL3xR3p_ZJM0buNPRdCQ7Yp0cCSnSB4slS7aFfLotGY7rdP6ClXTe1Gvgk';\nconst VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || 'sua-chave-privada-aqui';\nconst VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:contato@fisioneo.com.br';\n// Configurar o serviço web-push\ntry {\n    web_push__WEBPACK_IMPORTED_MODULE_2__.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);\n    console.log('Web-push configurado com sucesso');\n} catch (error) {\n    console.error('Erro ao configurar web-push:', error);\n}\n// API para enviar notificações push\nasync function POST(request) {\n    console.log('API de notificações chamada');\n    try {\n        // Verificar configurações do Supabase\n        if (false) {}\n        // Verificar body da requisição\n        let body;\n        try {\n            body = await request.json();\n            console.log('Body da requisição:', JSON.stringify(body));\n        } catch (error) {\n            console.error('Erro ao processar body da requisição:', error);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                error: 'Erro ao processar body da requisição'\n            }, {\n                status: 400\n            });\n        }\n        // Validar dados da notificação\n        if (!body.title || !body.body) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                error: 'Título e corpo da notificação são obrigatórios'\n            }, {\n                status: 400\n            });\n        }\n        // Preparar o payload da notificação\n        const notificationPayload = {\n            title: body.title,\n            body: body.body,\n            url: body.url || '/prova-geral',\n            icon: body.icon || '/icons/baby-boy.png',\n            badge: body.badge || '/icons/baby-icon-192.png',\n            vibrate: body.vibrate || [\n                100,\n                50,\n                100\n            ],\n            actions: body.actions || [\n                {\n                    action: 'explore',\n                    title: 'Ver agora',\n                    icon: '/icons/baby-icon-192.png'\n                },\n                {\n                    action: 'close',\n                    title: 'Depois',\n                    icon: '/icons/baby-icon-192.png'\n                }\n            ],\n            data: {\n                url: body.url || '/prova-geral',\n                dateOfArrival: Date.now(),\n                primaryKey: Date.now()\n            }\n        };\n        // Para ambiente de desenvolvimento, podemos usar notificações locais\n        // Como alternativa à API Web Push que requer configuração completa\n        if (true) {\n            console.log('Ambiente de desenvolvimento detectado, retornando sucesso simulado');\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: true,\n                sent: 1,\n                failed: 0,\n                total: 1,\n                message: 'Notificação simulada enviada com sucesso. Use componente local para testes em desenvolvimento.'\n            });\n        }\n        // Registrar a notificação no histórico\n        console.log('Registrando notificação no histórico');\n        const notificationRecord = {\n            title: body.title,\n            body: body.body,\n            url: body.url,\n            icon: body.icon,\n            metadata: {\n                tags: body.tags,\n                actions: notificationPayload.actions\n            }\n        };\n        const { data: historyRecord, error: historyError } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_1__.supabase.from('push_notification_history').insert([\n            notificationRecord\n        ]).select().single();\n        if (historyError) {\n            console.error('Erro ao registrar histórico de notificação:', historyError);\n        } else {\n            console.log('Notificação registrada com ID:', historyRecord.id);\n        }\n        const notificationId = historyRecord?.id;\n        // Buscar todas as assinaturas ativas\n        console.log('Buscando assinaturas ativas');\n        const subscriptions = await _lib_supabase__WEBPACK_IMPORTED_MODULE_1__.pushNotificationService.getActiveSubscriptions();\n        if (subscriptions.length === 0) {\n            console.log('Nenhuma assinatura ativa encontrada');\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                error: 'Nenhuma assinatura ativa encontrada'\n            });\n        }\n        console.log(`Encontradas ${subscriptions.length} assinaturas ativas`);\n        // Contadores para sucesso e falha\n        let successCount = 0;\n        let failureCount = 0;\n        // Enviar notificações para cada assinatura\n        console.log('Iniciando envio de notificações');\n        const sendPromises = subscriptions.map(async (subscription)=>{\n            try {\n                // Configurar a assinatura no formato esperado pelo web-push\n                const pushSubscription = {\n                    endpoint: subscription.endpoint,\n                    keys: {\n                        p256dh: subscription.p256dh,\n                        auth: subscription.auth\n                    }\n                };\n                // Enviar a notificação\n                await web_push__WEBPACK_IMPORTED_MODULE_2__.sendNotification(pushSubscription, JSON.stringify(notificationPayload));\n                // Atualizar o timestamp de última notificação\n                await _lib_supabase__WEBPACK_IMPORTED_MODULE_1__.pushNotificationService.updateLastNotified(subscription.endpoint);\n                successCount++;\n            } catch (error) {\n                console.error(`Erro ao enviar para ${subscription.endpoint}:`, error);\n                failureCount++;\n                // Se o erro for devido a endpoint expirado, desativar a assinatura\n                if (error instanceof Error && (error.message.includes('410') || error.message.includes('404'))) {\n                    await _lib_supabase__WEBPACK_IMPORTED_MODULE_1__.pushNotificationService.deactivateSubscription(subscription.endpoint);\n                }\n            }\n        });\n        // Aguardar o término de todos os envios\n        await Promise.all(sendPromises);\n        console.log(`Envio concluído. Sucesso: ${successCount}, Falhas: ${failureCount}`);\n        // Atualizar as estatísticas de envio\n        if (notificationId) {\n            await _lib_supabase__WEBPACK_IMPORTED_MODULE_1__.pushNotificationService.updateSendCounts(notificationId, successCount, failureCount);\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            sent: successCount,\n            failed: failureCount,\n            total: subscriptions.length\n        });\n    } catch (error) {\n        console.error('Erro ao processar envio de notificações:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: error instanceof Error ? error.message : 'Erro interno do servidor'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL25vdGlmaWNhdGlvbnMvc2VuZC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEyQztBQUNzRDtBQUM3RDtBQUVwQyx1RUFBdUU7QUFDdkUsdUZBQXVGO0FBQ3ZGLE1BQU1JLG1CQUFtQkMsUUFBUUMsR0FBRyxDQUFDRixnQkFBZ0IsSUFBSTtBQUN6RCxNQUFNRyxvQkFBb0JGLFFBQVFDLEdBQUcsQ0FBQ0MsaUJBQWlCLElBQUk7QUFDM0QsTUFBTUMsZ0JBQWdCSCxRQUFRQyxHQUFHLENBQUNFLGFBQWEsSUFBSTtBQUVuRCxnQ0FBZ0M7QUFDaEMsSUFBSTtJQUNGTCxxREFBdUIsQ0FDckJLLGVBQ0FKLGtCQUNBRztJQUVGRyxRQUFRQyxHQUFHLENBQUM7QUFDZCxFQUFFLE9BQU9DLE9BQU87SUFDZEYsUUFBUUUsS0FBSyxDQUFDLGdDQUFnQ0E7QUFDaEQ7QUFFQSxvQ0FBb0M7QUFDN0IsZUFBZUMsS0FBS0MsT0FBZ0I7SUFDekNKLFFBQVFDLEdBQUcsQ0FBQztJQUVaLElBQUk7UUFDRixzQ0FBc0M7UUFDdEMsSUFBSSxLQUFtRixFQUFFLEVBTXhGO1FBRUQsK0JBQStCO1FBQy9CLElBQUlTO1FBQ0osSUFBSTtZQUNGQSxPQUFPLE1BQU1OLFFBQVFHLElBQUk7WUFDekJQLFFBQVFDLEdBQUcsQ0FBQyx1QkFBdUJVLEtBQUtDLFNBQVMsQ0FBQ0Y7UUFDcEQsRUFBRSxPQUFPUixPQUFPO1lBQ2RGLFFBQVFFLEtBQUssQ0FBQyx5Q0FBeUNBO1lBQ3ZELE9BQU9aLHFEQUFZQSxDQUFDaUIsSUFBSSxDQUN0QjtnQkFBRUMsU0FBUztnQkFBT04sT0FBTztZQUF1QyxHQUNoRTtnQkFBRU8sUUFBUTtZQUFJO1FBRWxCO1FBRUEsK0JBQStCO1FBQy9CLElBQUksQ0FBQ0MsS0FBS0csS0FBSyxJQUFJLENBQUNILEtBQUtBLElBQUksRUFBRTtZQUM3QixPQUFPcEIscURBQVlBLENBQUNpQixJQUFJLENBQ3RCO2dCQUFFQyxTQUFTO2dCQUFP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NGIwODc4MTBhNDljXFxmaXNpb25lby1iNmNjM2U1NDMwYWI5YjAyM2U1NDE1ZjRhMzAwNGIwODc4MTBhNDljXFxhcHBcXGFwaVxcbm90aWZpY2F0aW9uc1xcc2VuZFxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5pbXBvcnQgeyBwdXNoTm90aWZpY2F0aW9uU2VydmljZSwgdHlwZSBQdXNoTm90aWZpY2F0aW9uSGlzdG9yeSwgc3VwYWJhc2UgfSBmcm9tICdAL2xpYi9zdXBhYmFzZSc7XHJcbmltcG9ydCAqIGFzIHdlYnB1c2ggZnJvbSAnd2ViLXB1c2gnO1xyXG5cclxuLy8gQ2hhdmVzIFZBUElEIHBhcmEgaWRlbnRpZmljYXIgbyByZW1ldGVudGUganVudG8gYW9zIHNlcnZpw6dvcyBkZSBwdXNoXHJcbi8vIEVtIHByb2R1w6fDo28sIGVzdGFzIGNoYXZlcyBkZXZlbSBzZXIgZ2VyYWRhcyBlIGFybWF6ZW5hZGFzIGNvbW8gdmFyacOhdmVpcyBkZSBhbWJpZW50ZVxyXG5jb25zdCBWQVBJRF9QVUJMSUNfS0VZID0gcHJvY2Vzcy5lbnYuVkFQSURfUFVCTElDX0tFWSB8fCAnQkxCeC1oZjJXclEzQ1duLXdkNWlCN3RwMUxTNlV4TDN4UjNwX1pKTTBidU5QUmRDUTdZcDBjQ1NuU0I0c2xTN2FGZkxvdEdZN3JkUDZDbFhUZTFHdmdrJztcclxuY29uc3QgVkFQSURfUFJJVkFURV9LRVkgPSBwcm9jZXNzLmVudi5WQVBJRF9QUklWQVRFX0tFWSB8fCAnc3VhLWNoYXZlLXByaXZhZGEtYXF1aSc7XHJcbmNvbnN0IFZBUElEX1NVQkpFQ1QgPSBwcm9jZXNzLmVudi5WQVBJRF9TVUJKRUNUIHx8ICdtYWlsdG86Y29udGF0b0BmaXNpb25lby5jb20uYnInO1xyXG5cclxuLy8gQ29uZmlndXJhciBvIHNlcnZpw6dvIHdlYi1wdXNoXHJcbnRyeSB7XHJcbiAgd2VicHVzaC5zZXRWYXBpZERldGFpbHMoXHJcbiAgICBWQVBJRF9TVUJKRUNULFxyXG4gICAgVkFQSURfUFVCTElDX0tFWSxcclxuICAgIFZBUElEX1BSSVZBVEVfS0VZXHJcbiAgKTtcclxuICBjb25zb2xlLmxvZygnV2ViLXB1c2ggY29uZmlndXJhZG8gY29tIHN1Y2Vzc28nKTtcclxufSBjYXRjaCAoZXJyb3IpIHtcclxuICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIGNvbmZpZ3VyYXIgd2ViLXB1c2g6JywgZXJyb3IpO1xyXG59XHJcblxyXG4vLyBBUEkgcGFyYSBlbnZpYXIgbm90aWZpY2HDp8O1ZXMgcHVzaFxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XHJcbiAgY29uc29sZS5sb2coJ0FQSSBkZSBub3RpZmljYcOnw7VlcyBjaGFtYWRhJyk7XHJcbiAgXHJcbiAgdHJ5IHtcclxuICAgIC8vIFZlcmlmaWNhciBjb25maWd1cmHDp8O1ZXMgZG8gU3VwYWJhc2VcclxuICAgIGlmICghcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIHx8ICFwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdDb25maWd1cmHDp8O1ZXMgZG8gU3VwYWJhc2UgbsOjbyBlbmNvbnRyYWRhcycpO1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDb25maWd1cmHDp8O1ZXMgZG8gU3VwYWJhc2UgbsOjbyBlbmNvbnRyYWRhcycgfSxcclxuICAgICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gVmVyaWZpY2FyIGJvZHkgZGEgcmVxdWlzacOnw6NvXHJcbiAgICBsZXQgYm9keTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcclxuICAgICAgY29uc29sZS5sb2coJ0JvZHkgZGEgcmVxdWlzacOnw6NvOicsIEpTT04uc3RyaW5naWZ5KGJvZHkpKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gcHJvY2Vzc2FyIGJvZHkgZGEgcmVxdWlzacOnw6NvOicsIGVycm9yKTtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRXJybyBhbyBwcm9jZXNzYXIgYm9keSBkYSByZXF1aXNpw6fDo28nIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIFZhbGlkYXIgZGFkb3MgZGEgbm90aWZpY2HDp8Ojb1xyXG4gICAgaWYgKCFib2R5LnRpdGxlIHx8ICFib2R5LmJvZHkpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVMOtdHVsbyBlIGNvcnBvIGRhIG5vdGlmaWNhw6fDo28gc8OjbyBvYnJpZ2F0w7NyaW9zJyB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBQcmVwYXJhciBvIHBheWxvYWQgZGEgbm90aWZpY2HDp8Ojb1xyXG4gICAgY29uc3Qgbm90aWZpY2F0aW9uUGF5bG9hZCA9IHtcclxuICAgICAgdGl0bGU6IGJvZHkudGl0bGUsXHJcbiAgICAgIGJvZHk6IGJvZHkuYm9keSxcclxuICAgICAgdXJsOiBib2R5LnVybCB8fCAnL3Byb3ZhLWdlcmFsJyxcclxuICAgICAgaWNvbjogYm9keS5pY29uIHx8ICcvaWNvbnMvYmFieS1ib3kucG5nJyxcclxuICAgICAgYmFkZ2U6IGJvZHkuYmFkZ2UgfHwgJy9pY29ucy9iYWJ5LWljb24tMTkyLnBuZycsXHJcbiAgICAgIHZpYnJhdGU6IGJvZHkudmlicmF0ZSB8fCBbMTAwLCA1MCwgMTAwXSxcclxuICAgICAgYWN0aW9uczogYm9keS5hY3Rpb25zIHx8IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBhY3Rpb246ICdleHBsb3JlJyxcclxuICAgICAgICAgIHRpdGxlOiAnVmVyIGFnb3JhJyxcclxuICAgICAgICAgIGljb246ICcvaWNvbnMvYmFieS1pY29uLTE5Mi5wbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBhY3Rpb246ICdjbG9zZScsXHJcbiAgICAgICAgICB0aXRsZTogJ0RlcG9pcycsXHJcbiAgICAgICAgICBpY29uOiAnL2ljb25zL2JhYnktaWNvbi0xOTIucG5nJ1xyXG4gICAgICAgIH1cclxuICAgICAgXSxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHVybDogYm9keS51cmwgfHwgJy9wcm92YS1nZXJhbCcsXHJcbiAgICAgICAgZGF0ZU9mQXJyaXZhbDogRGF0ZS5ub3coKSxcclxuICAgICAgICBwcmltYXJ5S2V5OiBEYXRlLm5vdygpXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBcclxuICAgIC8vIFBhcmEgYW1iaWVudGUgZGUgZGVzZW52b2x2aW1lbnRvLCBwb2RlbW9zIHVzYXIgbm90aWZpY2HDp8O1ZXMgbG9jYWlzXHJcbiAgICAvLyBDb21vIGFsdGVybmF0aXZhIMOgIEFQSSBXZWIgUHVzaCBxdWUgcmVxdWVyIGNvbmZpZ3VyYcOnw6NvIGNvbXBsZXRhXHJcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgfHwgIVZBUElEX1BSSVZBVEVfS0VZIHx8IFZBUElEX1BSSVZBVEVfS0VZID09PSAnc3VhLWNoYXZlLXByaXZhZGEtYXF1aScpIHtcclxuICAgICAgY29uc29sZS5sb2coJ0FtYmllbnRlIGRlIGRlc2Vudm9sdmltZW50byBkZXRlY3RhZG8sIHJldG9ybmFuZG8gc3VjZXNzbyBzaW11bGFkbycpO1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBcclxuICAgICAgICBzdWNjZXNzOiB0cnVlLCBcclxuICAgICAgICBzZW50OiAxLFxyXG4gICAgICAgIGZhaWxlZDogMCxcclxuICAgICAgICB0b3RhbDogMSxcclxuICAgICAgICBtZXNzYWdlOiAnTm90aWZpY2HDp8OjbyBzaW11bGFkYSBlbnZpYWRhIGNvbSBzdWNlc3NvLiBVc2UgY29tcG9uZW50ZSBsb2NhbCBwYXJhIHRlc3RlcyBlbSBkZXNlbnZvbHZpbWVudG8uJ1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gUmVnaXN0cmFyIGEgbm90aWZpY2HDp8OjbyBubyBoaXN0w7NyaWNvXHJcbiAgICBjb25zb2xlLmxvZygnUmVnaXN0cmFuZG8gbm90aWZpY2HDp8OjbyBubyBoaXN0w7NyaWNvJyk7XHJcbiAgICBjb25zdCBub3RpZmljYXRpb25SZWNvcmQ6IFB1c2hOb3RpZmljYXRpb25IaXN0b3J5ID0ge1xyXG4gICAgICB0aXRsZTogYm9keS50aXRsZSxcclxuICAgICAgYm9keTogYm9keS5ib2R5LFxyXG4gICAgICB1cmw6IGJvZHkudXJsLFxyXG4gICAgICBpY29uOiBib2R5Lmljb24sXHJcbiAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgdGFnczogYm9keS50YWdzLFxyXG4gICAgICAgIGFjdGlvbnM6IG5vdGlmaWNhdGlvblBheWxvYWQuYWN0aW9uc1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBjb25zdCB7IGRhdGE6IGhpc3RvcnlSZWNvcmQsIGVycm9yOiBoaXN0b3J5RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgIC5mcm9tKCdwdXNoX25vdGlmaWNhdGlvbl9oaXN0b3J5JylcclxuICAgICAgLmluc2VydChbbm90aWZpY2F0aW9uUmVjb3JkXSlcclxuICAgICAgLnNlbGVjdCgpXHJcbiAgICAgIC5zaW5nbGUoKTtcclxuICAgIFxyXG4gICAgaWYgKGhpc3RvcnlFcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIHJlZ2lzdHJhciBoaXN0w7NyaWNvIGRlIG5vdGlmaWNhw6fDo286JywgaGlzdG9yeUVycm9yKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdOb3RpZmljYcOnw6NvIHJlZ2lzdHJhZGEgY29tIElEOicsIGhpc3RvcnlSZWNvcmQuaWQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBub3RpZmljYXRpb25JZCA9IGhpc3RvcnlSZWNvcmQ/LmlkO1xyXG4gICAgXHJcbiAgICAvLyBCdXNjYXIgdG9kYXMgYXMgYXNzaW5hdHVyYXMgYXRpdmFzXHJcbiAgICBjb25zb2xlLmxvZygnQnVzY2FuZG8gYXNzaW5hdHVyYXMgYXRpdmFzJyk7XHJcbiAgICBjb25zdCBzdWJzY3JpcHRpb25zID0gYXdhaXQgcHVzaE5vdGlmaWNhdGlvblNlcnZpY2UuZ2V0QWN0aXZlU3Vic2NyaXB0aW9ucygpO1xyXG4gICAgXHJcbiAgICBpZiAoc3Vic2NyaXB0aW9ucy5sZW5ndGggPT09IDApIHtcclxuICAgICAgY29uc29sZS5sb2coJ05lbmh1bWEgYXNzaW5hdHVyYSBhdGl2YSBlbmNvbnRyYWRhJyk7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLCBcclxuICAgICAgICBlcnJvcjogJ05lbmh1bWEgYXNzaW5hdHVyYSBhdGl2YSBlbmNvbnRyYWRhJyBcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKGBFbmNvbnRyYWRhcyAke3N1YnNjcmlwdGlvbnMubGVuZ3RofSBhc3NpbmF0dXJhcyBhdGl2YXNgKTtcclxuICAgIFxyXG4gICAgLy8gQ29udGFkb3JlcyBwYXJhIHN1Y2Vzc28gZSBmYWxoYVxyXG4gICAgbGV0IHN1Y2Nlc3NDb3VudCA9IDA7XHJcbiAgICBsZXQgZmFpbHVyZUNvdW50ID0gMDtcclxuICAgIFxyXG4gICAgLy8gRW52aWFyIG5vdGlmaWNhw6fDtWVzIHBhcmEgY2FkYSBhc3NpbmF0dXJhXHJcbiAgICBjb25zb2xlLmxvZygnSW5pY2lhbmRvIGVudmlvIGRlIG5vdGlmaWNhw6fDtWVzJyk7XHJcbiAgICBjb25zdCBzZW5kUHJvbWlzZXMgPSBzdWJzY3JpcHRpb25zLm1hcChhc3luYyAoc3Vic2NyaXB0aW9uKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgLy8gQ29uZmlndXJhciBhIGFzc2luYXR1cmEgbm8gZm9ybWF0byBlc3BlcmFkbyBwZWxvIHdlYi1wdXNoXHJcbiAgICAgICAgY29uc3QgcHVzaFN1YnNjcmlwdGlvbiA9IHtcclxuICAgICAgICAgIGVuZHBvaW50OiBzdWJzY3JpcHRpb24uZW5kcG9pbnQsXHJcbiAgICAgICAgICBrZXlzOiB7XHJcbiAgICAgICAgICAgIHAyNTZkaDogc3Vic2NyaXB0aW9uLnAyNTZkaCxcclxuICAgICAgICAgICAgYXV0aDogc3Vic2NyaXB0aW9uLmF1dGhcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEVudmlhciBhIG5vdGlmaWNhw6fDo29cclxuICAgICAgICBhd2FpdCB3ZWJwdXNoLnNlbmROb3RpZmljYXRpb24oXHJcbiAgICAgICAgICBwdXNoU3Vic2NyaXB0aW9uLFxyXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkobm90aWZpY2F0aW9uUGF5bG9hZClcclxuICAgICAgICApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEF0dWFsaXphciBvIHRpbWVzdGFtcCBkZSDDumx0aW1hIG5vdGlmaWNhw6fDo29cclxuICAgICAgICBhd2FpdCBwdXNoTm90aWZpY2F0aW9uU2VydmljZS51cGRhdGVMYXN0Tm90aWZpZWQoc3Vic2NyaXB0aW9uLmVuZHBvaW50KTtcclxuICAgICAgICBcclxuICAgICAgICBzdWNjZXNzQ291bnQrKztcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIGFvIGVudmlhciBwYXJhICR7c3Vic2NyaXB0aW9uLmVuZHBvaW50fTpgLCBlcnJvcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZmFpbHVyZUNvdW50Kys7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2UgbyBlcnJvIGZvciBkZXZpZG8gYSBlbmRwb2ludCBleHBpcmFkbywgZGVzYXRpdmFyIGEgYXNzaW5hdHVyYVxyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIFxyXG4gICAgICAgICAgICAoZXJyb3IubWVzc2FnZS5pbmNsdWRlcygnNDEwJykgfHwgZXJyb3IubWVzc2FnZS5pbmNsdWRlcygnNDA0JykpKSB7XHJcbiAgICAgICAgICBhd2FpdCBwdXNoTm90aWZpY2F0aW9uU2VydmljZS5kZWFjdGl2YXRlU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbi5lbmRwb2ludCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLy8gQWd1YXJkYXIgbyB0w6lybWlubyBkZSB0b2RvcyBvcyBlbnZpb3NcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKHNlbmRQcm9taXNlcyk7XHJcbiAgICBjb25zb2xlLmxvZyhgRW52aW8gY29uY2x1w61kby4gU3VjZXNzbzogJHtzdWNjZXNzQ291bnR9LCBGYWxoYXM6ICR7ZmFpbHVyZUNvdW50fWApO1xyXG4gICAgXHJcbiAgICAvLyBBdHVhbGl6YXIgYXMgZXN0YXTDrXN0aWNhcyBkZSBlbnZpb1xyXG4gICAgaWYgKG5vdGlmaWNhdGlvbklkKSB7XHJcbiAgICAgIGF3YWl0IHB1c2hOb3RpZmljYXRpb25TZXJ2aWNlLnVwZGF0ZVNlbmRDb3VudHMoXHJcbiAgICAgICAgbm90aWZpY2F0aW9uSWQsXHJcbiAgICAgICAgc3VjY2Vzc0NvdW50LFxyXG4gICAgICAgIGZhaWx1cmVDb3VudFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBcclxuICAgICAgc3VjY2VzczogdHJ1ZSwgXHJcbiAgICAgIHNlbnQ6IHN1Y2Nlc3NDb3VudCwgXHJcbiAgICAgIGZhaWxlZDogZmFpbHVyZUNvdW50LCBcclxuICAgICAgdG90YWw6IHN1YnNjcmlwdGlvbnMubGVuZ3RoIFxyXG4gICAgfSk7XHJcbiAgICBcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignRXJybyBhbyBwcm9jZXNzYXIgZW52aW8gZGUgbm90aWZpY2HDp8O1ZXM6JywgZXJyb3IpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgXHJcbiAgICAgICAgc3VjY2VzczogZmFsc2UsIFxyXG4gICAgICAgIGVycm9yOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6ICdFcnJvIGludGVybm8gZG8gc2Vydmlkb3InIFxyXG4gICAgICB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59ICJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwdXNoTm90aWZpY2F0aW9uU2VydmljZSIsInN1cGFiYXNlIiwid2VicHVzaCIsIlZBUElEX1BVQkxJQ19LRVkiLCJwcm9jZXNzIiwiZW52IiwiVkFQSURfUFJJVkFURV9LRVkiLCJWQVBJRF9TVUJKRUNUIiwic2V0VmFwaWREZXRhaWxzIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiUE9TVCIsInJlcXVlc3QiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSIsImpzb24iLCJzdWNjZXNzIiwic3RhdHVzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aXRsZSIsIm5vdGlmaWNhdGlvblBheWxvYWQiLCJ1cmwiLCJpY29uIiwiYmFkZ2UiLCJ2aWJyYXRlIiwiYWN0aW9ucyIsImFjdGlvbiIsImRhdGEiLCJkYXRlT2ZBcnJpdmFsIiwiRGF0ZSIsIm5vdyIsInByaW1hcnlLZXkiLCJzZW50IiwiZmFpbGVkIiwidG90YWwiLCJtZXNzYWdlIiwibm90aWZpY2F0aW9uUmVjb3JkIiwibWV0YWRhdGEiLCJ0YWdzIiwiaGlzdG9yeVJlY29yZCIsImhpc3RvcnlFcnJvciIsImZyb20iLCJpbnNlcnQiLCJzZWxlY3QiLCJzaW5nbGUiLCJpZCIsIm5vdGlmaWNhdGlvbklkIiwic3Vic2NyaXB0aW9ucyIsImdldEFjdGl2ZVN1YnNjcmlwdGlvbnMiLCJsZW5ndGgiLCJzdWNjZXNzQ291bnQiLCJmYWlsdXJlQ291bnQiLCJzZW5kUHJvbWlzZXMiLCJtYXAiLCJzdWJzY3JpcHRpb24iLCJwdXNoU3Vic2NyaXB0aW9uIiwiZW5kcG9pbnQiLCJrZXlzIiwicDI1NmRoIiwiYXV0aCIsInNlbmROb3RpZmljYXRpb24iLCJ1cGRhdGVMYXN0Tm90aWZpZWQiLCJFcnJvciIsImluY2x1ZGVzIiwiZGVhY3RpdmF0ZVN1YnNjcmlwdGlvbiIsIlByb21pc2UiLCJhbGwiLCJ1cGRhdGVTZW5kQ291bnRzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/notifications/send/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabase.ts":
/*!*************************!*\
  !*** ./lib/supabase.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   pushNotificationService: () => (/* binding */ pushNotificationService),\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n\n// Estas variáveis de ambiente devem ser definidas no seu .env.local\nconst supabaseUrl = \"https://htmkhefvctwmbrgeejkh.supabase.co\" || 0;\nconst supabaseAnonKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bWtoZWZ2Y3R3bWJyZ2VlamtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MTAzOTUsImV4cCI6MjA1NjI4NjM5NX0.4jJxHP980GW_\" || 0;\n// Criando um cliente Supabase para o front-end\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);\n// Funções para gerenciar assinaturas de push\nconst pushNotificationService = {\n    // Salvar uma nova assinatura\n    async saveSubscription (subscription) {\n        try {\n            const { data, error } = await supabase.from('push_subscriptions').upsert({\n                endpoint: subscription.endpoint,\n                p256dh: subscription.p256dh,\n                auth: subscription.auth,\n                user_agent:  false ? 0 : undefined,\n                device_type:  false ? 0 : undefined,\n                is_active: true\n            }, {\n                onConflict: 'endpoint',\n                ignoreDuplicates: false\n            });\n            if (error) throw error;\n            return {\n                success: true\n            };\n        } catch (error) {\n            console.error('Erro ao salvar assinatura push:', error);\n            return {\n                success: false,\n                error: error instanceof Error ? error.message : 'Erro desconhecido'\n            };\n        }\n    },\n    // Atualizar o timestamp de última notificação\n    async updateLastNotified (endpoint) {\n        try {\n            await supabase.from('push_subscriptions').update({\n                last_notified: new Date().toISOString()\n            }).eq('endpoint', endpoint);\n        } catch (error) {\n            console.error('Erro ao atualizar timestamp de notificação:', error);\n        }\n    },\n    // Buscar todas as assinaturas ativas\n    async getActiveSubscriptions () {\n        try {\n            const { data, error } = await supabase.from('push_subscriptions').select('*').eq('is_active', true);\n            if (error) throw error;\n            return data || [];\n        } catch (error) {\n            console.error('Erro ao buscar assinaturas ativas:', error);\n            return [];\n        }\n    },\n    // Desativar uma assinatura\n    async deactivateSubscription (endpoint) {\n        try {\n            await supabase.from('push_subscriptions').update({\n                is_active: false\n            }).eq('endpoint', endpoint);\n        } catch (error) {\n            console.error('Erro ao desativar assinatura:', error);\n        }\n    },\n    // Registrar histórico de notificação enviada\n    async logNotificationSent (notification) {\n        try {\n            await supabase.from('push_notification_history').insert([\n                notification\n            ]);\n        } catch (error) {\n            console.error('Erro ao registrar histórico de notificação:', error);\n        }\n    },\n    // Atualizar contadores de envio\n    async updateSendCounts (notificationId, sentCount, failedCount) {\n        try {\n            await supabase.from('push_notification_history').update({\n                sent_count: sentCount,\n                failed_count: failedCount\n            }).eq('id', notificationId);\n        } catch (error) {\n            console.error('Erro ao atualizar contadores de envio:', error);\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU1RO1FBQ2QsRUFBRSxPQUFPakMsT0FBTztZQUNkaUIsUUFBUWpCLEtBQUssQ0FBQywwQ0FBMENBO1FBQzFEO0lBQ0Y7QUFDRixFQUFFIiwic291cmNlcyI6WyJEOlxcZmlzaW9uZW8tYjZjYzNlNTQzMGFiOWIwMjNlNTQxNWY0YTMwMDRiMDg3ODEwYTQ5Y1xcZmlzaW9uZW8tYjZjYzNlNTQzMGFiOWIwMjNlNTQxNWY0YTMwMDRiMDg3ODEwYTQ5Y1xcbGliXFxzdXBhYmFzZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAc3VwYWJhc2Uvc3VwYWJhc2UtanMnXG5cbi8vIEVzdGFzIHZhcmnDoXZlaXMgZGUgYW1iaWVudGUgZGV2ZW0gc2VyIGRlZmluaWRhcyBubyBzZXUgLmVudi5sb2NhbFxuY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwgfHwgJydcbmNvbnN0IHN1cGFiYXNlQW5vbktleSA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIHx8ICcnXG5cbi8vIENyaWFuZG8gdW0gY2xpZW50ZSBTdXBhYmFzZSBwYXJhIG8gZnJvbnQtZW5kXG5leHBvcnQgY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVDbGllbnQoc3VwYWJhc2VVcmwsIHN1cGFiYXNlQW5vbktleSlcblxuLy8gSW50ZXJmYWNlIHBhcmEgYSB0YWJlbGEgZGUgYXNzaW5hdHVyYXMgcHVzaFxuZXhwb3J0IGludGVyZmFjZSBQdXNoU3Vic2NyaXB0aW9uIHtcbiAgaWQ/OiBzdHJpbmdcbiAgZW5kcG9pbnQ6IHN0cmluZ1xuICBwMjU2ZGg6IHN0cmluZ1xuICBhdXRoOiBzdHJpbmdcbiAgdXNlcl9hZ2VudD86IHN0cmluZ1xuICBjcmVhdGVkX2F0Pzogc3RyaW5nXG4gIGxhc3Rfbm90aWZpZWQ/OiBzdHJpbmdcbiAgdGFncz86IHN0cmluZ1tdXG4gIGRldmljZV90eXBlPzogc3RyaW5nXG4gIGlzX2FjdGl2ZT86IGJvb2xlYW5cbn1cblxuLy8gSW50ZXJmYWNlIHBhcmEgbyBoaXN0w7NyaWNvIGRlIG5vdGlmaWNhw6fDtWVzXG5leHBvcnQgaW50ZXJmYWNlIFB1c2hOb3RpZmljYXRpb25IaXN0b3J5IHtcbiAgaWQ/OiBzdHJpbmdcbiAgdGl0bGU6IHN0cmluZ1xuICBib2R5OiBzdHJpbmdcbiAgdXJsPzogc3RyaW5nXG4gIGljb24/OiBzdHJpbmdcbiAgc2VudF9hdD86IHN0cmluZ1xuICBzZW50X2NvdW50PzogbnVtYmVyXG4gIGZhaWxlZF9jb3VudD86IG51bWJlclxuICBtZXRhZGF0YT86IFJlY29yZDxzdHJpbmcsIGFueT5cbn1cblxuLy8gRnVuw6fDtWVzIHBhcmEgZ2VyZW5jaWFyIGFzc2luYXR1cmFzIGRlIHB1c2hcbmV4cG9ydCBjb25zdCBwdXNoTm90aWZpY2F0aW9uU2VydmljZSA9IHtcbiAgLy8gU2FsdmFyIHVtYSBub3ZhIGFzc2luYXR1cmFcbiAgYXN5bmMgc2F2ZVN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb246IFB1c2hTdWJzY3JpcHRpb24pOiBQcm9taXNlPHsgc3VjY2VzczogYm9vbGVhbiwgZXJyb3I/OiBzdHJpbmcgfT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAuZnJvbSgncHVzaF9zdWJzY3JpcHRpb25zJylcbiAgICAgICAgLnVwc2VydCh7XG4gICAgICAgICAgZW5kcG9pbnQ6IHN1YnNjcmlwdGlvbi5lbmRwb2ludCxcbiAgICAgICAgICBwMjU2ZGg6IHN1YnNjcmlwdGlvbi5wMjU2ZGgsXG4gICAgICAgICAgYXV0aDogc3Vic2NyaXB0aW9uLmF1dGgsXG4gICAgICAgICAgdXNlcl9hZ2VudDogdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICBkZXZpY2VfdHlwZTogdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyAod2luZG93LmlubmVyV2lkdGggPD0gNzY4ID8gJ21vYmlsZScgOiAnZGVza3RvcCcpIDogdW5kZWZpbmVkLFxuICAgICAgICAgIGlzX2FjdGl2ZTogdHJ1ZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgb25Db25mbGljdDogJ2VuZHBvaW50JyxcbiAgICAgICAgICBpZ25vcmVEdXBsaWNhdGVzOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIFxuICAgICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcbiAgICAgIFxuICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIHNhbHZhciBhc3NpbmF0dXJhIHB1c2g6JywgZXJyb3IpO1xuICAgICAgcmV0dXJuIHsgXG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLCBcbiAgICAgICAgZXJyb3I6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ0Vycm8gZGVzY29uaGVjaWRvJyBcbiAgICAgIH07XG4gICAgfVxuICB9LFxuICBcbiAgLy8gQXR1YWxpemFyIG8gdGltZXN0YW1wIGRlIMO6bHRpbWEgbm90aWZpY2HDp8Ojb1xuICBhc3luYyB1cGRhdGVMYXN0Tm90aWZpZWQoZW5kcG9pbnQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAuZnJvbSgncHVzaF9zdWJzY3JpcHRpb25zJylcbiAgICAgICAgLnVwZGF0ZSh7IGxhc3Rfbm90aWZpZWQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSB9KVxuICAgICAgICAuZXEoJ2VuZHBvaW50JywgZW5kcG9pbnQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIGF0dWFsaXphciB0aW1lc3RhbXAgZGUgbm90aWZpY2HDp8OjbzonLCBlcnJvcik7XG4gICAgfVxuICB9LFxuICBcbiAgLy8gQnVzY2FyIHRvZGFzIGFzIGFzc2luYXR1cmFzIGF0aXZhc1xuICBhc3luYyBnZXRBY3RpdmVTdWJzY3JpcHRpb25zKCk6IFByb21pc2U8UHVzaFN1YnNjcmlwdGlvbltdPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKCdwdXNoX3N1YnNjcmlwdGlvbnMnKVxuICAgICAgICAuc2VsZWN0KCcqJylcbiAgICAgICAgLmVxKCdpc19hY3RpdmUnLCB0cnVlKTtcbiAgICAgIFxuICAgICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcbiAgICAgIFxuICAgICAgcmV0dXJuIGRhdGEgfHwgW107XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gYnVzY2FyIGFzc2luYXR1cmFzIGF0aXZhczonLCBlcnJvcik7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9LFxuICBcbiAgLy8gRGVzYXRpdmFyIHVtYSBhc3NpbmF0dXJhXG4gIGFzeW5jIGRlYWN0aXZhdGVTdWJzY3JpcHRpb24oZW5kcG9pbnQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAuZnJvbSgncHVzaF9zdWJzY3JpcHRpb25zJylcbiAgICAgICAgLnVwZGF0ZSh7IGlzX2FjdGl2ZTogZmFsc2UgfSlcbiAgICAgICAgLmVxKCdlbmRwb2ludCcsIGVuZHBvaW50KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJybyBhbyBkZXNhdGl2YXIgYXNzaW5hdHVyYTonLCBlcnJvcik7XG4gICAgfVxuICB9LFxuICBcbiAgLy8gUmVnaXN0cmFyIGhpc3TDs3JpY28gZGUgbm90aWZpY2HDp8OjbyBlbnZpYWRhXG4gIGFzeW5jIGxvZ05vdGlmaWNhdGlvblNlbnQobm90aWZpY2F0aW9uOiBQdXNoTm90aWZpY2F0aW9uSGlzdG9yeSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAuZnJvbSgncHVzaF9ub3RpZmljYXRpb25faGlzdG9yeScpXG4gICAgICAgIC5pbnNlcnQoW25vdGlmaWNhdGlvbl0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIHJlZ2lzdHJhciBoaXN0w7NyaWNvIGRlIG5vdGlmaWNhw6fDo286JywgZXJyb3IpO1xuICAgIH1cbiAgfSxcbiAgXG4gIC8vIEF0dWFsaXphciBjb250YWRvcmVzIGRlIGVudmlvXG4gIGFzeW5jIHVwZGF0ZVNlbmRDb3VudHMobm90aWZpY2F0aW9uSWQ6IHN0cmluZywgc2VudENvdW50OiBudW1iZXIsIGZhaWxlZENvdW50OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oJ3B1c2hfbm90aWZpY2F0aW9uX2hpc3RvcnknKVxuICAgICAgICAudXBkYXRlKHsgXG4gICAgICAgICAgc2VudF9jb3VudDogc2VudENvdW50LFxuICAgICAgICAgIGZhaWxlZF9jb3VudDogZmFpbGVkQ291bnRcbiAgICAgICAgfSlcbiAgICAgICAgLmVxKCdpZCcsIG5vdGlmaWNhdGlvbklkKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJybyBhbyBhdHVhbGl6YXIgY29udGFkb3JlcyBkZSBlbnZpbzonLCBlcnJvcik7XG4gICAgfVxuICB9XG59OyAiXSwibmFtZXMiOlsiY3JlYXRlQ2xpZW50Iiwic3VwYWJhc2VVcmwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwic3VwYWJhc2VBbm9uS2V5IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkiLCJzdXBhYmFzZSIsInB1c2hOb3RpZmljYXRpb25TZXJ2aWNlIiwic2F2ZVN1YnNjcmlwdGlvbiIsInN1YnNjcmlwdGlvbiIsImRhdGEiLCJlcnJvciIsImZyb20iLCJ1cHNlcnQiLCJlbmRwb2ludCIsInAyNTZkaCIsImF1dGgiLCJ1c2VyX2FnZW50Iiwid2luZG93IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidW5kZWZpbmVkIiwiZGV2aWNlX3R5cGUiLCJpbm5lcldpZHRoIiwiaXNfYWN0aXZlIiwib25Db25mbGljdCIsImlnbm9yZUR1cGxpY2F0ZXMiLCJzdWNjZXNzIiwiY29uc29sZSIsIkVycm9yIiwibWVzc2FnZSIsInVwZGF0ZUxhc3ROb3RpZmllZCIsInVwZGF0ZSIsImxhc3Rfbm90aWZpZWQiLCJEYXRlIiwidG9JU09TdHJpbmciLCJlcSIsImdldEFjdGl2ZVN1YnNjcmlwdGlvbnMiLCJzZWxlY3QiLCJkZWFjdGl2YXRlU3Vic2NyaXB0aW9uIiwibG9nTm90aWZpY2F0aW9uU2VudCIsIm5vdGlmaWNhdGlvbiIsImluc2VydCIsInVwZGF0ZVNlbmRDb3VudHMiLCJub3RpZmljYXRpb25JZCIsInNlbnRDb3VudCIsImZhaWxlZENvdW50Iiwic2VudF9jb3VudCIsImZhaWxlZF9jb3VudCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabase.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fnotifications%2Fsend%2Froute&page=%2Fapi%2Fnotifications%2Fsend%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnotifications%2Fsend%2Froute.ts&appDir=D%3A%5Cfisioneo-b6cc3e5430ab9b023e5415f4a3004b087810a49c%5Cfisioneo-b6cc3e5430ab9b023e5415f4a3004b087810a49c%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cfisioneo-b6cc3e5430ab9b023e5415f4a3004b087810a49c%5Cfisioneo-b6cc3e5430ab9b023e5415f4a3004b087810a49c&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fnotifications%2Fsend%2Froute&page=%2Fapi%2Fnotifications%2Fsend%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnotifications%2Fsend%2Froute.ts&appDir=D%3A%5Cfisioneo-b6cc3e5430ab9b023e5415f4a3004b087810a49c%5Cfisioneo-b6cc3e5430ab9b023e5415f4a3004b087810a49c%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cfisioneo-b6cc3e5430ab9b023e5415f4a3004b087810a49c%5Cfisioneo-b6cc3e5430ab9b023e5415f4a3004b087810a49c&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_fisioneo_b6cc3e5430ab9b023e5415f4a3004b087810a49c_fisioneo_b6cc3e5430ab9b023e5415f4a3004b087810a49c_app_api_notifications_send_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/notifications/send/route.ts */ \"(rsc)/./app/api/notifications/send/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/notifications/send/route\",\n        pathname: \"/api/notifications/send\",\n        filename: \"route\",\n        bundlePath: \"app/api/notifications/send/route\"\n    },\n    resolvedPagePath: \"D:\\\\fisioneo-b6cc3e5430ab9b023e5415f4a3004b087810a49c\\\\fisioneo-b6cc3e5430ab9b023e5415f4a3004b087810a49c\\\\app\\\\api\\\\notifications\\\\send\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_fisioneo_b6cc3e5430ab9b023e5415f4a3004b087810a49c_fisioneo_b6cc3e5430ab9b023e5415f4a3004b087810a49c_app_api_notifications_send_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZub3RpZmljYXRpb25zJTJGc2VuZCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbm90aWZpY2F0aW9ucyUyRnNlbmQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZub3RpZmljYXRpb25zJTJGc2VuZCUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDZmlzaW9uZW8tYjZjYzNlNTQzMGFiOWIwMjNlNTQxNWY0YTMwMDRiMDg3ODEwYTQ5YyU1Q2Zpc2lvbmVvLWI2Y2MzZTU0MzBhYjliMDIzZTU0MTVmNGEzMDA0YjA4NzgxMGE0OWMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUQlM0ElNUNmaXNpb25lby1iNmNjM2U1NDMwYWI5YjAyM2U1NDE1ZjRhMzAwNGIwODc4MTBhNDljJTVDZmlzaW9uZW8tYjZjYzNlNTQzMGFiOWIwMjNlNTQxNWY0YTMwMDRiMDg3ODEwYTQ5YyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDaUc7QUFDOUs7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkQ6XFxcXGZpc2lvbmVvLWI2Y2MzZTU0MzBhYjliMDIzZTU0MTVmNGEzMDA0YjA4NzgxMGE0OWNcXFxcZmlzaW9uZW8tYjZjYzNlNTQzMGFiOWIwMjNlNTQxNWY0YTMwMDRiMDg3ODEwYTQ5Y1xcXFxhcHBcXFxcYXBpXFxcXG5vdGlmaWNhdGlvbnNcXFxcc2VuZFxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvbm90aWZpY2F0aW9ucy9zZW5kL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvbm90aWZpY2F0aW9ucy9zZW5kXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9ub3RpZmljYXRpb25zL3NlbmQvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJEOlxcXFxmaXNpb25lby1iNmNjM2U1NDMwYWI5YjAyM2U1NDE1ZjRhMzAwNGIwODc4MTBhNDljXFxcXGZpc2lvbmVvLWI2Y2MzZTU0MzBhYjliMDIzZTU0MTVmNGEzMDA0YjA4NzgxMGE0OWNcXFxcYXBwXFxcXGFwaVxcXFxub3RpZmljYXRpb25zXFxcXHNlbmRcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fnotifications%2Fsend%2Froute&page=%2Fapi%2Fnotifications%2Fsend%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnotifications%2Fsend%2Froute.ts&appDir=D%3A%5Cfisioneo-b6cc3e5430ab9b023e5415f4a3004b087810a49c%5Cfisioneo-b6cc3e5430ab9b023e5415f4a3004b087810a49c%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cfisioneo-b6cc3e5430ab9b023e5415f4a3004b087810a49c%5Cfisioneo-b6cc3e5430ab9b023e5415f4a3004b087810a49c&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/asn1.js","vendor-chunks/web-push","vendor-chunks/whatwg-url","vendor-chunks/jws","vendor-chunks/debug","vendor-chunks/tr46","vendor-chunks/inherits","vendor-chunks/https-proxy-agent","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/agent-base","vendor-chunks/webidl-conversions","vendor-chunks/supports-color","vendor-chunks/safer-buffer","vendor-chunks/safe-buffer","vendor-chunks/ms","vendor-chunks/minimalistic-assert","vendor-chunks/jwa","vendor-chunks/http_ece","vendor-chunks/has-flag","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bn.js"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fnotifications%2Fsend%2Froute&page=%2Fapi%2Fnotifications%2Fsend%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnotifications%2Fsend%2Froute.ts&appDir=D%3A%5Cfisioneo-b6cc3e5430ab9b023e5415f4a3004b087810a49c%5Cfisioneo-b6cc3e5430ab9b023e5415f4a3004b087810a49c%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cfisioneo-b6cc3e5430ab9b023e5415f4a3004b087810a49c%5Cfisioneo-b6cc3e5430ab9b023e5415f4a3004b087810a49c&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();