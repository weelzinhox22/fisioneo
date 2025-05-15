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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_supabase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/supabase */ \"(rsc)/./lib/supabase.ts\");\n\n\n\n\n// Log das variáveis de ambiente (remova em produção)\nconsole.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);\nconsole.log('GOOGLE_CLIENT_SECRET length:', process.env.GOOGLE_CLIENT_SECRET?.length);\nconsole.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);\nif (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {\n    throw new Error('Please define GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables');\n}\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET\n        }),\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n            name: 'Credentials',\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"text\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    console.log('Credenciais ausentes');\n                    return null;\n                }\n                try {\n                    // Autenticação com Supabase\n                    const { data: { user }, error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_3__.supabase.auth.signInWithPassword({\n                        email: credentials.email,\n                        password: credentials.password\n                    });\n                    if (error) {\n                        console.log('Erro Supabase:', error.message);\n                        return null;\n                    }\n                    if (!user) {\n                        console.log('Usuário não encontrado');\n                        return null;\n                    }\n                    // Retorna um objeto de usuário no mesmo formato que o Google\n                    return {\n                        id: user.id,\n                        name: user.email?.split('@')[0] || user.email,\n                        email: user.email,\n                        image: null,\n                        provider: 'credentials',\n                        accessToken: user.access_token,\n                        refreshToken: user.refresh_token\n                    };\n                } catch (error) {\n                    console.error('Erro de autenticação:', error);\n                    return null;\n                }\n            }\n        })\n    ],\n    pages: {\n        signIn: '/login',\n        error: '/login'\n    },\n    debug: \"development\" === 'development',\n    callbacks: {\n        async redirect ({ url, baseUrl }) {\n            console.log('Redirecionando para:', url);\n            // Permite redirecionamento para URLs do mesmo site\n            if (url.startsWith(baseUrl)) return url;\n            // Permite redirecionamento para URLs relativas\n            if (url.startsWith(\"/\")) return new URL(url, baseUrl).toString();\n            // Por padrão, redireciona para a página inicial\n            return baseUrl;\n        },\n        async session ({ session, token }) {\n            console.log('Gerando sessão com token:', token);\n            if (session.user) {\n                session.user.id = token.id;\n                // Adiciona informações adicionais à sessão\n                session.user.provider = token.provider;\n                session.accessToken = token.accessToken;\n                session.refreshToken = token.refreshToken;\n            }\n            return session;\n        },\n        async jwt ({ token, user, account }) {\n            console.log('Gerando JWT para usuário:', user?.email);\n            if (user) {\n                token.id = user.id;\n                // Preserva informações importantes no token\n                token.provider = user.provider || account?.provider;\n                token.accessToken = user.accessToken || account?.access_token;\n                token.refreshToken = user.refreshToken || account?.refresh_token;\n            }\n            return token;\n        }\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    }\n});\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXlEO0FBQ0Y7QUFDVTtBQUN4QjtBQW9CekMscURBQXFEO0FBQ3JESSxRQUFRQyxHQUFHLENBQUMscUJBQXFCQyxRQUFRQyxHQUFHLENBQUNDLGdCQUFnQjtBQUM3REosUUFBUUMsR0FBRyxDQUFDLGdDQUFnQ0MsUUFBUUMsR0FBRyxDQUFDRSxvQkFBb0IsRUFBRUM7QUFDOUVOLFFBQVFDLEdBQUcsQ0FBQyxpQkFBaUJDLFFBQVFDLEdBQUcsQ0FBQ0ksWUFBWTtBQUVyRCxJQUFJLENBQUNMLFFBQVFDLEdBQUcsQ0FBQ0MsZ0JBQWdCLElBQUksQ0FBQ0YsUUFBUUMsR0FBRyxDQUFDRSxvQkFBb0IsRUFBRTtJQUN0RSxNQUFNLElBQUlHLE1BQU07QUFDbEI7QUFFQSxNQUFNQyxVQUFVYixnREFBUUEsQ0FBQztJQUN2QmMsV0FBVztRQUNUYixzRUFBY0EsQ0FBQztZQUNiYyxVQUFVVCxRQUFRQyxHQUFHLENBQUNDLGdCQUFnQjtZQUN0Q1EsY0FBY1YsUUFBUUMsR0FBRyxDQUFDRSxvQkFBb0I7UUFDaEQ7UUFDQVAsMkVBQW1CQSxDQUFDO1lBQ2xCZSxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQU87Z0JBQ3RDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7b0JBQ2pEbEIsUUFBUUMsR0FBRyxDQUFDO29CQUNaLE9BQU87Z0JBQ1Q7Z0JBRUEsSUFBSTtvQkFDRiw0QkFBNEI7b0JBQzVCLE1BQU0sRUFBRW1CLE1BQU0sRUFBRUMsSUFBSSxFQUFFLEVBQUVDLEtBQUssRUFBRSxHQUFHLE1BQU12QixtREFBUUEsQ0FBQ3dCLElBQUksQ0FBQ0Msa0JBQWtCLENBQUM7d0JBQ3ZFVCxPQUFPRCxZQUFZQyxLQUFLO3dCQUN4QkcsVUFBVUosWUFBWUksUUFBUTtvQkFDaEM7b0JBRUEsSUFBSUksT0FBTzt3QkFDVHRCLFFBQVFDLEdBQUcsQ0FBQyxrQkFBa0JxQixNQUFNRyxPQUFPO3dCQUMzQyxPQUFPO29CQUNUO29CQUVBLElBQUksQ0FBQ0osTUFBTTt3QkFDVHJCLFFBQVFDLEdBQUcsQ0FBQzt3QkFDWixPQUFPO29CQUNUO29CQUVBLDZEQUE2RDtvQkFDN0QsT0FBTzt3QkFDTHlCLElBQUlMLEtBQUtLLEVBQUU7d0JBQ1hiLE1BQU1RLEtBQUtOLEtBQUssRUFBRVksTUFBTSxJQUFJLENBQUMsRUFBRSxJQUFJTixLQUFLTixLQUFLO3dCQUM3Q0EsT0FBT00sS0FBS04sS0FBSzt3QkFDakJhLE9BQU87d0JBQ1BDLFVBQVU7d0JBQ1ZDLGFBQWFULEtBQUtVLFlBQVk7d0JBQzlCQyxjQUFjWCxLQUFLWSxhQUFhO29CQUNsQztnQkFDRixFQUFFLE9BQU9YLE9BQU87b0JBQ2R0QixRQUFRc0IsS0FBSyxDQUFDLHlCQUF5QkE7b0JBQ3ZDLE9BQU87Z0JBQ1Q7WUFDRjtRQUNGO0tBQ0Q7SUFDRFksT0FBTztRQUNMQyxRQUFRO1FBQ1JiLE9BQU87SUFDVDtJQUNBYyxPQUFPbEMsa0JBQXlCO0lBQ2hDbUMsV0FBVztRQUNULE1BQU1DLFVBQVMsRUFBRUMsR0FBRyxFQUFFQyxPQUFPLEVBQUU7WUFDN0J4QyxRQUFRQyxHQUFHLENBQUMsd0JBQXdCc0M7WUFDcEMsbURBQW1EO1lBQ25ELElBQUlBLElBQUlFLFVBQVUsQ0FBQ0QsVUFBVSxPQUFPRDtZQUNwQywrQ0FBK0M7WUFDL0MsSUFBSUEsSUFBSUUsVUFBVSxDQUFDLE1BQU0sT0FBTyxJQUFJQyxJQUFJSCxLQUFLQyxTQUFTRyxRQUFRO1lBQzlELGdEQUFnRDtZQUNoRCxPQUFPSDtRQUNUO1FBQ0EsTUFBTUksU0FBUSxFQUFFQSxPQUFPLEVBQUVDLEtBQUssRUFBRTtZQUM5QjdDLFFBQVFDLEdBQUcsQ0FBQyw2QkFBNkI0QztZQUN6QyxJQUFJRCxRQUFRdkIsSUFBSSxFQUFFO2dCQUNoQnVCLFFBQVF2QixJQUFJLENBQUNLLEVBQUUsR0FBR21CLE1BQU1uQixFQUFFO2dCQUMxQiwyQ0FBMkM7Z0JBQzNDa0IsUUFBUXZCLElBQUksQ0FBQ1EsUUFBUSxHQUFHZ0IsTUFBTWhCLFFBQVE7Z0JBQ3RDZSxRQUFRZCxXQUFXLEdBQUdlLE1BQU1mLFdBQVc7Z0JBQ3ZDYyxRQUFRWixZQUFZLEdBQUdhLE1BQU1iLFlBQVk7WUFDM0M7WUFDQSxPQUFPWTtRQUNUO1FBQ0EsTUFBTUUsS0FBSSxFQUFFRCxLQUFLLEVBQUV4QixJQUFJLEVBQUUwQixPQUFPLEVBQUU7WUFDaEMvQyxRQUFRQyxHQUFHLENBQUMsNkJBQTZCb0IsTUFBTU47WUFDL0MsSUFBSU0sTUFBTTtnQkFDUndCLE1BQU1uQixFQUFFLEdBQUdMLEtBQUtLLEVBQUU7Z0JBQ2xCLDRDQUE0QztnQkFDNUNtQixNQUFNaEIsUUFBUSxHQUFHUixLQUFLUSxRQUFRLElBQUlrQixTQUFTbEI7Z0JBQzNDZ0IsTUFBTWYsV0FBVyxHQUFHVCxLQUFLUyxXQUFXLElBQUlpQixTQUFTaEI7Z0JBQ2pEYyxNQUFNYixZQUFZLEdBQUdYLEtBQUtXLFlBQVksSUFBSWUsU0FBU2Q7WUFDckQ7WUFDQSxPQUFPWTtRQUNUO0lBQ0Y7SUFDQUQsU0FBUztRQUNQSSxVQUFVO1FBQ1ZDLFFBQVEsS0FBSyxLQUFLLEtBQUs7SUFDekI7QUFDRjtBQUUwQyIsInNvdXJjZXMiOlsiRDpcXGZpc2lvbmVvLW1haW5cXGZpc2lvbmVvLW1haW5cXGFwcFxcYXBpXFxhdXRoXFxbLi4ubmV4dGF1dGhdXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGgsIHsgdHlwZSBEZWZhdWx0U2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGhcIlxyXG5pbXBvcnQgR29vZ2xlUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvZ29vZ2xlXCJcclxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIlxyXG5pbXBvcnQgeyBzdXBhYmFzZSB9IGZyb20gXCJAL2xpYi9zdXBhYmFzZVwiXHJcblxyXG4vLyBFeHRlbmQgdGhlIHNlc3Npb24gdHlwZSB0byBpbmNsdWRlIHVzZXIgSUQgYW5kIGFkZGl0aW9uYWwgZmllbGRzXHJcbmRlY2xhcmUgbW9kdWxlIFwibmV4dC1hdXRoXCIge1xyXG4gIGludGVyZmFjZSBTZXNzaW9uIHtcclxuICAgIHVzZXI6IHtcclxuICAgICAgaWQ6IHN0cmluZ1xyXG4gICAgICBwcm92aWRlcjogc3RyaW5nXHJcbiAgICB9ICYgRGVmYXVsdFNlc3Npb25bXCJ1c2VyXCJdXHJcbiAgICBhY2Nlc3NUb2tlbj86IHN0cmluZ1xyXG4gICAgcmVmcmVzaFRva2VuPzogc3RyaW5nXHJcbiAgfVxyXG4gIGludGVyZmFjZSBVc2VyIHtcclxuICAgIGlkOiBzdHJpbmdcclxuICAgIHByb3ZpZGVyPzogc3RyaW5nXHJcbiAgICBhY2Nlc3NUb2tlbj86IHN0cmluZ1xyXG4gICAgcmVmcmVzaFRva2VuPzogc3RyaW5nXHJcbiAgfVxyXG59XHJcblxyXG4vLyBMb2cgZGFzIHZhcmnDoXZlaXMgZGUgYW1iaWVudGUgKHJlbW92YSBlbSBwcm9kdcOnw6NvKVxyXG5jb25zb2xlLmxvZygnR09PR0xFX0NMSUVOVF9JRDonLCBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lEKVxyXG5jb25zb2xlLmxvZygnR09PR0xFX0NMSUVOVF9TRUNSRVQgbGVuZ3RoOicsIHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVUPy5sZW5ndGgpXHJcbmNvbnNvbGUubG9nKCdORVhUQVVUSF9VUkw6JywgcHJvY2Vzcy5lbnYuTkVYVEFVVEhfVVJMKVxyXG5cclxuaWYgKCFwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lEIHx8ICFwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCkge1xyXG4gIHRocm93IG5ldyBFcnJvcignUGxlYXNlIGRlZmluZSBHT09HTEVfQ0xJRU5UX0lEIGFuZCBHT09HTEVfQ0xJRU5UX1NFQ1JFVCBlbnZpcm9ubWVudCB2YXJpYWJsZXMnKVxyXG59XHJcblxyXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoe1xyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xyXG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCEsXHJcbiAgICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVQhLFxyXG4gICAgfSksXHJcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcclxuICAgICAgbmFtZTogJ0NyZWRlbnRpYWxzJyxcclxuICAgICAgY3JlZGVudGlhbHM6IHtcclxuICAgICAgICBlbWFpbDogeyBsYWJlbDogXCJFbWFpbFwiLCB0eXBlOiBcInRleHRcIiB9LFxyXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xyXG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdDcmVkZW5jaWFpcyBhdXNlbnRlcycpXHJcbiAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gQXV0ZW50aWNhw6fDo28gY29tIFN1cGFiYXNlXHJcbiAgICAgICAgICBjb25zdCB7IGRhdGE6IHsgdXNlciB9LCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5zaWduSW5XaXRoUGFzc3dvcmQoe1xyXG4gICAgICAgICAgICBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBjcmVkZW50aWFscy5wYXNzd29yZCxcclxuICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvIFN1cGFiYXNlOicsIGVycm9yLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGlmICghdXNlcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVXN1w6FyaW8gbsOjbyBlbmNvbnRyYWRvJylcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gUmV0b3JuYSB1bSBvYmpldG8gZGUgdXN1w6FyaW8gbm8gbWVzbW8gZm9ybWF0byBxdWUgbyBHb29nbGVcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlkOiB1c2VyLmlkLFxyXG4gICAgICAgICAgICBuYW1lOiB1c2VyLmVtYWlsPy5zcGxpdCgnQCcpWzBdIHx8IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICBpbWFnZTogbnVsbCxcclxuICAgICAgICAgICAgcHJvdmlkZXI6ICdjcmVkZW50aWFscycsXHJcbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuOiB1c2VyLmFjY2Vzc190b2tlbixcclxuICAgICAgICAgICAgcmVmcmVzaFRva2VuOiB1c2VyLnJlZnJlc2hfdG9rZW5cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJybyBkZSBhdXRlbnRpY2HDp8OjbzonLCBlcnJvcilcclxuICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIF0sXHJcbiAgcGFnZXM6IHtcclxuICAgIHNpZ25JbjogJy9sb2dpbicsXHJcbiAgICBlcnJvcjogJy9sb2dpbicsXHJcbiAgfSxcclxuICBkZWJ1ZzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcsXHJcbiAgY2FsbGJhY2tzOiB7XHJcbiAgICBhc3luYyByZWRpcmVjdCh7IHVybCwgYmFzZVVybCB9KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdSZWRpcmVjaW9uYW5kbyBwYXJhOicsIHVybClcclxuICAgICAgLy8gUGVybWl0ZSByZWRpcmVjaW9uYW1lbnRvIHBhcmEgVVJMcyBkbyBtZXNtbyBzaXRlXHJcbiAgICAgIGlmICh1cmwuc3RhcnRzV2l0aChiYXNlVXJsKSkgcmV0dXJuIHVybFxyXG4gICAgICAvLyBQZXJtaXRlIHJlZGlyZWNpb25hbWVudG8gcGFyYSBVUkxzIHJlbGF0aXZhc1xyXG4gICAgICBpZiAodXJsLnN0YXJ0c1dpdGgoXCIvXCIpKSByZXR1cm4gbmV3IFVSTCh1cmwsIGJhc2VVcmwpLnRvU3RyaW5nKClcclxuICAgICAgLy8gUG9yIHBhZHLDo28sIHJlZGlyZWNpb25hIHBhcmEgYSBww6FnaW5hIGluaWNpYWxcclxuICAgICAgcmV0dXJuIGJhc2VVcmxcclxuICAgIH0sXHJcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnR2VyYW5kbyBzZXNzw6NvIGNvbSB0b2tlbjonLCB0b2tlbilcclxuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xyXG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLmlkIGFzIHN0cmluZ1xyXG4gICAgICAgIC8vIEFkaWNpb25hIGluZm9ybWHDp8O1ZXMgYWRpY2lvbmFpcyDDoCBzZXNzw6NvXHJcbiAgICAgICAgc2Vzc2lvbi51c2VyLnByb3ZpZGVyID0gdG9rZW4ucHJvdmlkZXIgYXMgc3RyaW5nXHJcbiAgICAgICAgc2Vzc2lvbi5hY2Nlc3NUb2tlbiA9IHRva2VuLmFjY2Vzc1Rva2VuIGFzIHN0cmluZ1xyXG4gICAgICAgIHNlc3Npb24ucmVmcmVzaFRva2VuID0gdG9rZW4ucmVmcmVzaFRva2VuIGFzIHN0cmluZ1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzZXNzaW9uXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIsIGFjY291bnQgfSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnR2VyYW5kbyBKV1QgcGFyYSB1c3XDoXJpbzonLCB1c2VyPy5lbWFpbClcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWRcclxuICAgICAgICAvLyBQcmVzZXJ2YSBpbmZvcm1hw6fDtWVzIGltcG9ydGFudGVzIG5vIHRva2VuXHJcbiAgICAgICAgdG9rZW4ucHJvdmlkZXIgPSB1c2VyLnByb3ZpZGVyIHx8IGFjY291bnQ/LnByb3ZpZGVyXHJcbiAgICAgICAgdG9rZW4uYWNjZXNzVG9rZW4gPSB1c2VyLmFjY2Vzc1Rva2VuIHx8IGFjY291bnQ/LmFjY2Vzc190b2tlblxyXG4gICAgICAgIHRva2VuLnJlZnJlc2hUb2tlbiA9IHVzZXIucmVmcmVzaFRva2VuIHx8IGFjY291bnQ/LnJlZnJlc2hfdG9rZW5cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG9rZW5cclxuICAgIH0sXHJcbiAgfSxcclxuICBzZXNzaW9uOiB7XHJcbiAgICBzdHJhdGVneTogXCJqd3RcIixcclxuICAgIG1heEFnZTogMzAgKiAyNCAqIDYwICogNjAsIC8vIDMwIGRpYXNcclxuICB9LFxyXG59KVxyXG5cclxuZXhwb3J0IHsgaGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVCB9ICJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsIkdvb2dsZVByb3ZpZGVyIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsInN1cGFiYXNlIiwiY29uc29sZSIsImxvZyIsInByb2Nlc3MiLCJlbnYiLCJHT09HTEVfQ0xJRU5UX0lEIiwiR09PR0xFX0NMSUVOVF9TRUNSRVQiLCJsZW5ndGgiLCJORVhUQVVUSF9VUkwiLCJFcnJvciIsImhhbmRsZXIiLCJwcm92aWRlcnMiLCJjbGllbnRJZCIsImNsaWVudFNlY3JldCIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJkYXRhIiwidXNlciIsImVycm9yIiwiYXV0aCIsInNpZ25JbldpdGhQYXNzd29yZCIsIm1lc3NhZ2UiLCJpZCIsInNwbGl0IiwiaW1hZ2UiLCJwcm92aWRlciIsImFjY2Vzc1Rva2VuIiwiYWNjZXNzX3Rva2VuIiwicmVmcmVzaFRva2VuIiwicmVmcmVzaF90b2tlbiIsInBhZ2VzIiwic2lnbkluIiwiZGVidWciLCJjYWxsYmFja3MiLCJyZWRpcmVjdCIsInVybCIsImJhc2VVcmwiLCJzdGFydHNXaXRoIiwiVVJMIiwidG9TdHJpbmciLCJzZXNzaW9uIiwidG9rZW4iLCJqd3QiLCJhY2NvdW50Iiwic3RyYXRlZ3kiLCJtYXhBZ2UiLCJHRVQiLCJQT1NUIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

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