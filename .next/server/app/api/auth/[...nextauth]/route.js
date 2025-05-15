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
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_supabase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/supabase */ \"(rsc)/./lib/supabase.ts\");\n\n\n\n\n// Log das variáveis de ambiente (remova em produção)\nconsole.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);\nconsole.log('GOOGLE_CLIENT_SECRET length:', process.env.GOOGLE_CLIENT_SECRET?.length);\nconsole.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);\nif (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {\n    throw new Error('Please define GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables');\n}\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET\n        }),\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n            name: 'Credentials',\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"text\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    console.log('Credenciais ausentes');\n                    return null;\n                }\n                try {\n                    const { data: { user }, error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_3__.supabase.auth.signInWithPassword({\n                        email: credentials.email,\n                        password: credentials.password\n                    });\n                    if (error) {\n                        console.log('Erro Supabase:', error.message);\n                        return null;\n                    }\n                    if (!user) {\n                        console.log('Usuário não encontrado');\n                        return null;\n                    }\n                    return {\n                        id: user.id,\n                        name: user.email?.split('@')[0] || user.email,\n                        email: user.email,\n                        image: null\n                    };\n                } catch (error) {\n                    console.error('Erro de autenticação:', error);\n                    return null;\n                }\n            }\n        })\n    ],\n    pages: {\n        signIn: '/login',\n        error: '/login'\n    },\n    debug: \"development\" === 'development',\n    callbacks: {\n        async redirect ({ url, baseUrl }) {\n            console.log('Redirecionando para:', url);\n            // Permite redirecionamento para URLs do mesmo site\n            if (url.startsWith(baseUrl)) return url;\n            // Permite redirecionamento para URLs relativas\n            if (url.startsWith(\"/\")) return new URL(url, baseUrl).toString();\n            // Por padrão, redireciona para a página inicial\n            return baseUrl;\n        },\n        async session ({ session, token }) {\n            console.log('Gerando sessão com token:', token);\n            if (session.user) {\n                session.user.id = token.id;\n            }\n            return session;\n        },\n        async jwt ({ token, user, account }) {\n            console.log('Gerando JWT para usuário:', user?.email);\n            if (user) {\n                token.id = user.id;\n            }\n            if (account) {\n                token.provider = account.provider;\n            }\n            return token;\n        }\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    }\n});\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXlEO0FBQ0Y7QUFDVTtBQUN4QjtBQWN6QyxxREFBcUQ7QUFDckRJLFFBQVFDLEdBQUcsQ0FBQyxxQkFBcUJDLFFBQVFDLEdBQUcsQ0FBQ0MsZ0JBQWdCO0FBQzdESixRQUFRQyxHQUFHLENBQUMsZ0NBQWdDQyxRQUFRQyxHQUFHLENBQUNFLG9CQUFvQixFQUFFQztBQUM5RU4sUUFBUUMsR0FBRyxDQUFDLGlCQUFpQkMsUUFBUUMsR0FBRyxDQUFDSSxZQUFZO0FBRXJELElBQUksQ0FBQ0wsUUFBUUMsR0FBRyxDQUFDQyxnQkFBZ0IsSUFBSSxDQUFDRixRQUFRQyxHQUFHLENBQUNFLG9CQUFvQixFQUFFO0lBQ3RFLE1BQU0sSUFBSUcsTUFBTTtBQUNsQjtBQUVBLE1BQU1DLFVBQVViLGdEQUFRQSxDQUFDO0lBQ3ZCYyxXQUFXO1FBQ1RiLHNFQUFjQSxDQUFDO1lBQ2JjLFVBQVVULFFBQVFDLEdBQUcsQ0FBQ0MsZ0JBQWdCO1lBQ3RDUSxjQUFjVixRQUFRQyxHQUFHLENBQUNFLG9CQUFvQjtRQUNoRDtRQUNBUCwyRUFBbUJBLENBQUM7WUFDbEJlLE1BQU07WUFDTkMsYUFBYTtnQkFDWEMsT0FBTztvQkFBRUMsT0FBTztvQkFBU0MsTUFBTTtnQkFBTztnQkFDdENDLFVBQVU7b0JBQUVGLE9BQU87b0JBQVlDLE1BQU07Z0JBQVc7WUFDbEQ7WUFDQSxNQUFNRSxXQUFVTCxXQUFXO2dCQUN6QixJQUFJLENBQUNBLGFBQWFDLFNBQVMsQ0FBQ0QsYUFBYUksVUFBVTtvQkFDakRsQixRQUFRQyxHQUFHLENBQUM7b0JBQ1osT0FBTztnQkFDVDtnQkFFQSxJQUFJO29CQUNGLE1BQU0sRUFBRW1CLE1BQU0sRUFBRUMsSUFBSSxFQUFFLEVBQUVDLEtBQUssRUFBRSxHQUFHLE1BQU12QixtREFBUUEsQ0FBQ3dCLElBQUksQ0FBQ0Msa0JBQWtCLENBQUM7d0JBQ3ZFVCxPQUFPRCxZQUFZQyxLQUFLO3dCQUN4QkcsVUFBVUosWUFBWUksUUFBUTtvQkFDaEM7b0JBRUEsSUFBSUksT0FBTzt3QkFDVHRCLFFBQVFDLEdBQUcsQ0FBQyxrQkFBa0JxQixNQUFNRyxPQUFPO3dCQUMzQyxPQUFPO29CQUNUO29CQUVBLElBQUksQ0FBQ0osTUFBTTt3QkFDVHJCLFFBQVFDLEdBQUcsQ0FBQzt3QkFDWixPQUFPO29CQUNUO29CQUVBLE9BQU87d0JBQ0x5QixJQUFJTCxLQUFLSyxFQUFFO3dCQUNYYixNQUFNUSxLQUFLTixLQUFLLEVBQUVZLE1BQU0sSUFBSSxDQUFDLEVBQUUsSUFBSU4sS0FBS04sS0FBSzt3QkFDN0NBLE9BQU9NLEtBQUtOLEtBQUs7d0JBQ2pCYSxPQUFPO29CQUNUO2dCQUNGLEVBQUUsT0FBT04sT0FBTztvQkFDZHRCLFFBQVFzQixLQUFLLENBQUMseUJBQXlCQTtvQkFDdkMsT0FBTztnQkFDVDtZQUNGO1FBQ0Y7S0FDRDtJQUNETyxPQUFPO1FBQ0xDLFFBQVE7UUFDUlIsT0FBTztJQUNUO0lBQ0FTLE9BQU83QixrQkFBeUI7SUFDaEM4QixXQUFXO1FBQ1QsTUFBTUMsVUFBUyxFQUFFQyxHQUFHLEVBQUVDLE9BQU8sRUFBRTtZQUM3Qm5DLFFBQVFDLEdBQUcsQ0FBQyx3QkFBd0JpQztZQUNwQyxtREFBbUQ7WUFDbkQsSUFBSUEsSUFBSUUsVUFBVSxDQUFDRCxVQUFVLE9BQU9EO1lBQ3BDLCtDQUErQztZQUMvQyxJQUFJQSxJQUFJRSxVQUFVLENBQUMsTUFBTSxPQUFPLElBQUlDLElBQUlILEtBQUtDLFNBQVNHLFFBQVE7WUFDOUQsZ0RBQWdEO1lBQ2hELE9BQU9IO1FBQ1Q7UUFDQSxNQUFNSSxTQUFRLEVBQUVBLE9BQU8sRUFBRUMsS0FBSyxFQUFFO1lBQzlCeEMsUUFBUUMsR0FBRyxDQUFDLDZCQUE2QnVDO1lBQ3pDLElBQUlELFFBQVFsQixJQUFJLEVBQUU7Z0JBQ2hCa0IsUUFBUWxCLElBQUksQ0FBQ0ssRUFBRSxHQUFHYyxNQUFNZCxFQUFFO1lBQzVCO1lBQ0EsT0FBT2E7UUFDVDtRQUNBLE1BQU1FLEtBQUksRUFBRUQsS0FBSyxFQUFFbkIsSUFBSSxFQUFFcUIsT0FBTyxFQUFFO1lBQ2hDMUMsUUFBUUMsR0FBRyxDQUFDLDZCQUE2Qm9CLE1BQU1OO1lBQy9DLElBQUlNLE1BQU07Z0JBQ1JtQixNQUFNZCxFQUFFLEdBQUdMLEtBQUtLLEVBQUU7WUFDcEI7WUFDQSxJQUFJZ0IsU0FBUztnQkFDWEYsTUFBTUcsUUFBUSxHQUFHRCxRQUFRQyxRQUFRO1lBQ25DO1lBQ0EsT0FBT0g7UUFDVDtJQUNGO0lBQ0FELFNBQVM7UUFDUEssVUFBVTtRQUNWQyxRQUFRLEtBQUssS0FBSyxLQUFLO0lBQ3pCO0FBQ0Y7QUFFMEMiLCJzb3VyY2VzIjpbIkQ6XFxmaXNpb25lby1tYWluXFxmaXNpb25lby1tYWluXFxhcHBcXGFwaVxcYXV0aFxcWy4uLm5leHRhdXRoXVxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoLCB7IHR5cGUgRGVmYXVsdFNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoXCJcclxuaW1wb3J0IEdvb2dsZVByb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZVwiXHJcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCJcclxuaW1wb3J0IHsgc3VwYWJhc2UgfSBmcm9tIFwiQC9saWIvc3VwYWJhc2VcIlxyXG5cclxuLy8gRXh0ZW5kIHRoZSBzZXNzaW9uIHR5cGUgdG8gaW5jbHVkZSB1c2VyIElEXHJcbmRlY2xhcmUgbW9kdWxlIFwibmV4dC1hdXRoXCIge1xyXG4gIGludGVyZmFjZSBTZXNzaW9uIHtcclxuICAgIHVzZXI6IHtcclxuICAgICAgaWQ6IHN0cmluZ1xyXG4gICAgfSAmIERlZmF1bHRTZXNzaW9uW1widXNlclwiXVxyXG4gIH1cclxuICBpbnRlcmZhY2UgVXNlciB7XHJcbiAgICBpZDogc3RyaW5nXHJcbiAgfVxyXG59XHJcblxyXG4vLyBMb2cgZGFzIHZhcmnDoXZlaXMgZGUgYW1iaWVudGUgKHJlbW92YSBlbSBwcm9kdcOnw6NvKVxyXG5jb25zb2xlLmxvZygnR09PR0xFX0NMSUVOVF9JRDonLCBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lEKVxyXG5jb25zb2xlLmxvZygnR09PR0xFX0NMSUVOVF9TRUNSRVQgbGVuZ3RoOicsIHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVUPy5sZW5ndGgpXHJcbmNvbnNvbGUubG9nKCdORVhUQVVUSF9VUkw6JywgcHJvY2Vzcy5lbnYuTkVYVEFVVEhfVVJMKVxyXG5cclxuaWYgKCFwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lEIHx8ICFwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCkge1xyXG4gIHRocm93IG5ldyBFcnJvcignUGxlYXNlIGRlZmluZSBHT09HTEVfQ0xJRU5UX0lEIGFuZCBHT09HTEVfQ0xJRU5UX1NFQ1JFVCBlbnZpcm9ubWVudCB2YXJpYWJsZXMnKVxyXG59XHJcblxyXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoe1xyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xyXG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCEsXHJcbiAgICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVQhLFxyXG4gICAgfSksXHJcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcclxuICAgICAgbmFtZTogJ0NyZWRlbnRpYWxzJyxcclxuICAgICAgY3JlZGVudGlhbHM6IHtcclxuICAgICAgICBlbWFpbDogeyBsYWJlbDogXCJFbWFpbFwiLCB0eXBlOiBcInRleHRcIiB9LFxyXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xyXG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdDcmVkZW5jaWFpcyBhdXNlbnRlcycpXHJcbiAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgeyBkYXRhOiB7IHVzZXIgfSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguc2lnbkluV2l0aFBhc3N3b3JkKHtcclxuICAgICAgICAgICAgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogY3JlZGVudGlhbHMucGFzc3dvcmQsXHJcbiAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJybyBTdXBhYmFzZTonLCBlcnJvci5tZXNzYWdlKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1VzdcOhcmlvIG7Do28gZW5jb250cmFkbycpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlkOiB1c2VyLmlkLFxyXG4gICAgICAgICAgICBuYW1lOiB1c2VyLmVtYWlsPy5zcGxpdCgnQCcpWzBdIHx8IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICBpbWFnZTogbnVsbFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvIGRlIGF1dGVudGljYcOnw6NvOicsIGVycm9yKVxyXG4gICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgXSxcclxuICBwYWdlczoge1xyXG4gICAgc2lnbkluOiAnL2xvZ2luJyxcclxuICAgIGVycm9yOiAnL2xvZ2luJyxcclxuICB9LFxyXG4gIGRlYnVnOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyxcclxuICBjYWxsYmFja3M6IHtcclxuICAgIGFzeW5jIHJlZGlyZWN0KHsgdXJsLCBiYXNlVXJsIH0pIHtcclxuICAgICAgY29uc29sZS5sb2coJ1JlZGlyZWNpb25hbmRvIHBhcmE6JywgdXJsKVxyXG4gICAgICAvLyBQZXJtaXRlIHJlZGlyZWNpb25hbWVudG8gcGFyYSBVUkxzIGRvIG1lc21vIHNpdGVcclxuICAgICAgaWYgKHVybC5zdGFydHNXaXRoKGJhc2VVcmwpKSByZXR1cm4gdXJsXHJcbiAgICAgIC8vIFBlcm1pdGUgcmVkaXJlY2lvbmFtZW50byBwYXJhIFVSTHMgcmVsYXRpdmFzXHJcbiAgICAgIGlmICh1cmwuc3RhcnRzV2l0aChcIi9cIikpIHJldHVybiBuZXcgVVJMKHVybCwgYmFzZVVybCkudG9TdHJpbmcoKVxyXG4gICAgICAvLyBQb3IgcGFkcsOjbywgcmVkaXJlY2lvbmEgcGFyYSBhIHDDoWdpbmEgaW5pY2lhbFxyXG4gICAgICByZXR1cm4gYmFzZVVybFxyXG4gICAgfSxcclxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdHZXJhbmRvIHNlc3PDo28gY29tIHRva2VuOicsIHRva2VuKVxyXG4gICAgICBpZiAoc2Vzc2lvbi51c2VyKSB7XHJcbiAgICAgICAgc2Vzc2lvbi51c2VyLmlkID0gdG9rZW4uaWQgYXMgc3RyaW5nXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHNlc3Npb25cclxuICAgIH0sXHJcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciwgYWNjb3VudCB9KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdHZXJhbmRvIEpXVCBwYXJhIHVzdcOhcmlvOicsIHVzZXI/LmVtYWlsKVxyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZFxyXG4gICAgICB9XHJcbiAgICAgIGlmIChhY2NvdW50KSB7XHJcbiAgICAgICAgdG9rZW4ucHJvdmlkZXIgPSBhY2NvdW50LnByb3ZpZGVyXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRva2VuXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgc2Vzc2lvbjoge1xyXG4gICAgc3RyYXRlZ3k6IFwiand0XCIsXHJcbiAgICBtYXhBZ2U6IDMwICogMjQgKiA2MCAqIDYwLCAvLyAzMCBkaWFzXHJcbiAgfSxcclxufSlcclxuXHJcbmV4cG9ydCB7IGhhbmRsZXIgYXMgR0VULCBoYW5kbGVyIGFzIFBPU1QgfSAiXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJHb29nbGVQcm92aWRlciIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJzdXBhYmFzZSIsImNvbnNvbGUiLCJsb2ciLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX0NMSUVOVF9JRCIsIkdPT0dMRV9DTElFTlRfU0VDUkVUIiwibGVuZ3RoIiwiTkVYVEFVVEhfVVJMIiwiRXJyb3IiLCJoYW5kbGVyIiwicHJvdmlkZXJzIiwiY2xpZW50SWQiLCJjbGllbnRTZWNyZXQiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiZGF0YSIsInVzZXIiLCJlcnJvciIsImF1dGgiLCJzaWduSW5XaXRoUGFzc3dvcmQiLCJtZXNzYWdlIiwiaWQiLCJzcGxpdCIsImltYWdlIiwicGFnZXMiLCJzaWduSW4iLCJkZWJ1ZyIsImNhbGxiYWNrcyIsInJlZGlyZWN0IiwidXJsIiwiYmFzZVVybCIsInN0YXJ0c1dpdGgiLCJVUkwiLCJ0b1N0cmluZyIsInNlc3Npb24iLCJ0b2tlbiIsImp3dCIsImFjY291bnQiLCJwcm92aWRlciIsInN0cmF0ZWd5IiwibWF4QWdlIiwiR0VUIiwiUE9TVCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabase.ts":
/*!*************************!*\
  !*** ./lib/supabase.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n\nconst supabaseUrl = 'https://htmkhefvctwmbrgeejkh.supabase.co';\nconst supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bWtoZWZ2Y3R3bWJyZ2VlamtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MTAzOTUsImV4cCI6MjA1NjI4NjM5NX0.4jJxHP980GW_Err3qBaHwa9eO4rqwA-LYo8c9kPBwnA';\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey, {\n    auth: {\n        autoRefreshToken: true,\n        persistSession: true,\n        detectSessionInUrl: true\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBb0Q7QUFFcEQsTUFBTUMsY0FBYztBQUNwQixNQUFNQyxrQkFBa0I7QUFFakIsTUFBTUMsV0FBV0gsbUVBQVlBLENBQUNDLGFBQWFDLGlCQUFpQjtJQUNqRUUsTUFBTTtRQUNKQyxrQkFBa0I7UUFDbEJDLGdCQUFnQjtRQUNoQkMsb0JBQW9CO0lBQ3RCO0FBQ0YsR0FBRSIsInNvdXJjZXMiOlsiRDpcXGZpc2lvbmVvLW1haW5cXGZpc2lvbmVvLW1haW5cXGxpYlxcc3VwYWJhc2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJ1xyXG5cclxuY29uc3Qgc3VwYWJhc2VVcmwgPSAnaHR0cHM6Ly9odG1raGVmdmN0d21icmdlZWpraC5zdXBhYmFzZS5jbydcclxuY29uc3Qgc3VwYWJhc2VBbm9uS2V5ID0gJ2V5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwYzNNaU9pSnpkWEJoWW1GelpTSXNJbkpsWmlJNkltaDBiV3RvWldaMlkzUjNiV0p5WjJWbGFtdG9JaXdpY205c1pTSTZJbUZ1YjI0aUxDSnBZWFFpT2pFM05EQTNNVEF6T1RVc0ltVjRjQ0k2TWpBMU5qSTROak01TlgwLjRqSnhIUDk4MEdXX0VycjNxQmFId2E5ZU80cnF3QS1MWW84YzlrUEJ3bkEnXHJcblxyXG5leHBvcnQgY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVDbGllbnQoc3VwYWJhc2VVcmwsIHN1cGFiYXNlQW5vbktleSwge1xyXG4gIGF1dGg6IHtcclxuICAgIGF1dG9SZWZyZXNoVG9rZW46IHRydWUsXHJcbiAgICBwZXJzaXN0U2Vzc2lvbjogdHJ1ZSxcclxuICAgIGRldGVjdFNlc3Npb25JblVybDogdHJ1ZVxyXG4gIH1cclxufSkgIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsInN1cGFiYXNlVXJsIiwic3VwYWJhc2VBbm9uS2V5Iiwic3VwYWJhc2UiLCJhdXRoIiwiYXV0b1JlZnJlc2hUb2tlbiIsInBlcnNpc3RTZXNzaW9uIiwiZGV0ZWN0U2Vzc2lvbkluVXJsIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabase.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5Cfisioneo-main%5Cfisioneo-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cfisioneo-main%5Cfisioneo-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5Cfisioneo-main%5Cfisioneo-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cfisioneo-main%5Cfisioneo-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_fisioneo_main_fisioneo_main_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"D:\\\\fisioneo-main\\\\fisioneo-main\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_fisioneo_main_fisioneo_main_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDZmlzaW9uZW8tbWFpbiU1Q2Zpc2lvbmVvLW1haW4lNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUQlM0ElNUNmaXNpb25lby1tYWluJTVDZmlzaW9uZW8tbWFpbiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDeUI7QUFDdEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkQ6XFxcXGZpc2lvbmVvLW1haW5cXFxcZmlzaW9uZW8tbWFpblxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJEOlxcXFxmaXNpb25lby1tYWluXFxcXGZpc2lvbmVvLW1haW5cXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5Cfisioneo-main%5Cfisioneo-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cfisioneo-main%5Cfisioneo-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tr46","vendor-chunks/next-auth","vendor-chunks/whatwg-url","vendor-chunks/@babel","vendor-chunks/webidl-conversions","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/oidc-token-hash","vendor-chunks/preact","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5Cfisioneo-main%5Cfisioneo-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cfisioneo-main%5Cfisioneo-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();