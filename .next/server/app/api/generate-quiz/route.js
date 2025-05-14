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
exports.id = "app/api/generate-quiz/route";
exports.ids = ["app/api/generate-quiz/route"];
exports.modules = {

/***/ "(rsc)/./app/api/generate-quiz/route.ts":
/*!****************************************!*\
  !*** ./app/api/generate-quiz/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var groq_sdk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! groq-sdk */ \"(rsc)/./node_modules/groq-sdk/index.mjs\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst groq = new groq_sdk__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n// Extrair conteúdo relevante de um texto longo\nfunction extractRelevantContent(text, maxLength = 10000) {\n    if (text.length <= maxLength) return text;\n    // Dividir o texto em parágrafos\n    const paragraphs = text.split(/\\n\\n+/);\n    // Se tivermos poucos parágrafos ou parágrafos muito longos, dividimos por sentenças\n    if (paragraphs.length < 10) {\n        const sentences = text.split(/(?<=[.!?])\\s+/);\n        // Coletar algumas sentenças do início\n        const startSentences = sentences.slice(0, Math.min(10, sentences.length / 4));\n        // Coletar algumas sentenças do meio\n        const middleStart = Math.floor(sentences.length / 2) - 5;\n        const middleSentences = sentences.slice(Math.max(10, middleStart), Math.min(sentences.length, middleStart + 10));\n        // Coletar algumas sentenças do final\n        const endSentences = sentences.slice(Math.max(0, sentences.length - 10));\n        // Juntar tudo\n        return [\n            ...startSentences,\n            ...middleSentences,\n            ...endSentences\n        ].join(' ');\n    }\n    // Coletar parágrafos do início\n    const startParagraphs = paragraphs.slice(0, Math.min(5, paragraphs.length / 4));\n    // Coletar parágrafos do meio\n    const middleStart = Math.floor(paragraphs.length / 2) - 3;\n    const middleParagraphs = paragraphs.slice(Math.max(5, middleStart), Math.min(paragraphs.length, middleStart + 6));\n    // Coletar parágrafos do final\n    const endParagraphs = paragraphs.slice(Math.max(0, paragraphs.length - 5));\n    // Juntar tudo\n    const result = [\n        ...startParagraphs,\n        ...middleParagraphs,\n        ...endParagraphs\n    ].join('\\n\\n');\n    // Se ainda estiver muito longo, cortar\n    return result.length > maxLength ? result.slice(0, maxLength) : result;\n}\n// Geração de perguntas mock quando a API falha\nfunction generateFallbackQuestions(text, title) {\n    // Extrair algumas palavras chave do texto para usar nas perguntas\n    const keywords = text.split(/\\s+/).filter((word)=>word.length > 5).filter((word, index, self)=>self.indexOf(word) === index).slice(0, 50);\n    const questions = [\n        {\n            id: 1,\n            question: `Qual é o assunto principal abordado no documento \"${title}\"?`,\n            options: [\n                \"Fisioterapia neonatal\",\n                \"Pediatria geral\",\n                \"Neurologia adulta\",\n                \"Cirurgia pediátrica\"\n            ],\n            correctAnswer: 0\n        },\n        {\n            id: 2,\n            question: \"Quais são os principais benefícios da fisioterapia em recém-nascidos?\",\n            options: [\n                \"Apenas prevenção de complicações respiratórias\",\n                \"Somente ganho de peso acelerado\",\n                \"Desenvolvimento neuromotor e prevenção de complicações\",\n                \"Apenas melhoria na alimentação\"\n            ],\n            correctAnswer: 2\n        },\n        {\n            id: 3,\n            question: \"Qual é a importância da intervenção precoce em prematuros?\",\n            options: [\n                \"Não tem importância significativa\",\n                \"Apenas para tranquilizar os pais\",\n                \"Reduz problemas apenas na fase adulta\",\n                \"Melhora o prognóstico de desenvolvimento\"\n            ],\n            correctAnswer: 3\n        }\n    ];\n    // Gerar mais 7 perguntas com base nas palavras-chave\n    for(let i = 0; i < 7; i++){\n        if (keywords.length > i * 4 + 4) {\n            const randomKeyword1 = keywords[i * 4];\n            const randomKeyword2 = keywords[i * 4 + 1];\n            const randomKeyword3 = keywords[i * 4 + 2];\n            questions.push({\n                id: i + 4,\n                question: `Qual conceito está mais diretamente relacionado a \"${randomKeyword1}\" no contexto do documento?`,\n                options: [\n                    `${randomKeyword2}`,\n                    \"Um conceito não mencionado no documento\",\n                    `${randomKeyword3}`,\n                    \"Nenhuma das alternativas\"\n                ],\n                correctAnswer: 0\n            });\n        }\n    }\n    return questions;\n}\n// Armazenar perguntas anteriormente geradas para evitar repetição\nconst questionCache = new Map();\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const { text, title } = body;\n        if (!text) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Texto do documento não fornecido'\n            }, {\n                status: 400\n            });\n        }\n        // Criar um identificador único para este documento\n        const docId = crypto__WEBPACK_IMPORTED_MODULE_1___default().createHash('md5').update(title + text.slice(0, 200)).digest('hex');\n        // Pegar ou criar o conjunto de perguntas para este documento\n        if (!questionCache.has(docId)) {\n            questionCache.set(docId, new Set());\n        }\n        const existingQuestions = questionCache.get(docId);\n        // Extrair conteúdo relevante do texto\n        const relevantText = extractRelevantContent(text, 6000);\n        try {\n            // Crie o prompt com as perguntas existentes listadas\n            let previousQuestionsText = '';\n            if (existingQuestions.size > 0) {\n                previousQuestionsText = `IMPORTANTE: Evite gerar perguntas semelhantes a estas que já foram criadas anteriormente:\n        \n        ${Array.from(existingQuestions).join('\\n')}\n        \n        As novas perguntas devem ser COMPLETAMENTE DIFERENTES das listadas acima.`;\n            }\n            // Primeiro, vamos solicitar as perguntas em formato de texto simples\n            const prompt = `\n      Por favor, crie 10 perguntas de múltipla escolha totalmente novas sobre o seguinte texto médico:\n      \n      ${relevantText}\n      \n      ${previousQuestionsText}\n      \n      REGRAS IMPORTANTES:\n      1. Cada pergunta deve ser clara, específica e diretamente relacionada ao conteúdo\n      2. Para cada pergunta, forneça 4 opções de resposta onde apenas uma está correta\n      3. Evite questões genéricas ou superficiais\n      4. NÃO inclua introduções como \"Aqui estão 10 perguntas\" no início\n      5. Comece cada pergunta imediatamente com \"PERGUNTA:\" (sem numeração)\n      \n      Use EXATAMENTE este formato para cada pergunta:\n      \n      PERGUNTA: [texto da pergunta]\n      A) [opção A]\n      B) [opção B]\n      C) [opção C]\n      D) [opção D]\n      RESPOSTA: [letra da resposta correta: A, B, C ou D]\n      \n      `;\n            // Chamar a API para gerar as perguntas\n            const completion = await groq.chat.completions.create({\n                messages: [\n                    {\n                        role: 'user',\n                        content: prompt\n                    }\n                ],\n                model: 'llama3-8b-8192',\n                temperature: 0.8,\n                max_tokens: 4096,\n                top_p: 0.9\n            });\n            const response = completion.choices[0].message.content || '';\n            // Processar o texto para extrair perguntas e respostas\n            const questions = [];\n            // Usar regex para extrair cada bloco que começa com \"PERGUNTA:\"\n            const matches = response.match(/PERGUNTA:[\\s\\S]+?(?=PERGUNTA:|$)/g) || [];\n            // Para cada bloco extraído, processar a pergunta\n            matches.forEach((block, index)=>{\n                try {\n                    // Extrair a pergunta (primeira linha após \"PERGUNTA:\")\n                    const questionMatch = block.match(/PERGUNTA:\\s*([^\\n]+)/);\n                    if (!questionMatch) return;\n                    const question = questionMatch[1].trim();\n                    // Adicionar à cache para evitar duplicação futura\n                    existingQuestions.add(question);\n                    // Extrair as opções\n                    const optionA = block.match(/A\\)\\s*([^\\n]+)/)?.[1]?.trim() || \"Opção A\";\n                    const optionB = block.match(/B\\)\\s*([^\\n]+)/)?.[1]?.trim() || \"Opção B\";\n                    const optionC = block.match(/C\\)\\s*([^\\n]+)/)?.[1]?.trim() || \"Opção C\";\n                    const optionD = block.match(/D\\)\\s*([^\\n]+)/)?.[1]?.trim() || \"Opção D\";\n                    // Extrair a resposta correta\n                    const answerMatch = block.match(/RESPOSTA:\\s*([A-D])/i);\n                    let correctAnswer = 0;\n                    if (answerMatch) {\n                        const letter = answerMatch[1].toUpperCase();\n                        correctAnswer = letter === 'A' ? 0 : letter === 'B' ? 1 : letter === 'C' ? 2 : 3;\n                    }\n                    // Adicionar à lista de perguntas\n                    questions.push({\n                        id: index + 1,\n                        question,\n                        options: [\n                            optionA,\n                            optionB,\n                            optionC,\n                            optionD\n                        ],\n                        correctAnswer\n                    });\n                } catch (parseError) {\n                    console.error('Erro ao parsear bloco de pergunta:', parseError);\n                }\n            });\n            // Limitar o cache para não crescer demais (máximo de 100 perguntas por documento)\n            if (existingQuestions.size > 100) {\n                // Converter para array, remover os mais antigos e converter de volta para Set\n                const questionsArray = Array.from(existingQuestions);\n                const newQuestions = new Set(questionsArray.slice(-100));\n                questionCache.set(docId, newQuestions);\n            }\n            // Se conseguimos extrair pelo menos 3 perguntas, use-as\n            if (questions.length >= 3) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    questions\n                });\n            }\n            // Caso contrário, gere perguntas de fallback\n            const fallbackQuestions = generateFallbackQuestions(text, title);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                questions: fallbackQuestions\n            });\n        } catch (error) {\n            console.error('Erro ao gerar perguntas:', error);\n            // Gerar perguntas fallback em caso de erro\n            const fallbackQuestions = generateFallbackQuestions(text, title);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                questions: fallbackQuestions\n            });\n        }\n    } catch (error) {\n        console.error('Erro na API de geração de quiz:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Erro ao processar a solicitação'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1lBQzNCO1lBRUEsd0RBQXdEO1lBQ3hELElBQUloRSxVQUFVMUIsTUFBTSxJQUFJLEdBQUc7Z0JBQ3pCLE9BQU9QLHFEQUFZQSxDQUFDZ0QsSUFBSSxDQUFDO29CQUFFZjtnQkFBVTtZQUN2QztZQUVBLDZDQUE2QztZQUM3QyxNQUFNaUUsb0JBQW9CekUsMEJBQTBCcEIsTUFBTXFCO1lBQzFELE9BQU8xQixxREFBWUEsQ0FBQ2dELElBQUksQ0FBQztnQkFBRWYsV0FBV2lFO1lBQWtCO1FBRTFELEVBQUUsT0FBT2pELE9BQU87WUFDZDhDLFFBQVE5QyxLQUFLLENBQUMsNEJBQTRCQTtZQUUxQywyQ0FBMkM7WUFDM0MsTUFBTWlELG9CQUFvQnpFLDBCQUEwQnBCLE1BQU1xQjtZQUMxRCxPQUFPMUIscURBQVlBLENBQUNnRCxJQUFJLENBQUM7Z0JBQUVmLFdBQVdpRTtZQUFrQjtRQUMxRDtJQUNGLEVBQUUsT0FBT2pELE9BQU87UUFDZDhDLFFBQVE5QyxLQUFLLENBQUMsbUNBQW1DQTtRQUNqRCxPQUFPakQscURBQVlBLENBQUNnRCxJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBa0MsR0FDM0M7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIkQ6XFxmaXNpb25lby1tYWluXFxmaXNpb25lby1tYWluXFxhcHBcXGFwaVxcZ2VuZXJhdGUtcXVpelxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xyXG5pbXBvcnQgR3JvcUFQSSBmcm9tICdncm9xLXNkaydcclxuaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nXHJcblxyXG5jb25zdCBncm9xID0gbmV3IEdyb3FBUEkoKVxyXG5cclxuLy8gRXh0cmFpciBjb250ZcO6ZG8gcmVsZXZhbnRlIGRlIHVtIHRleHRvIGxvbmdvXHJcbmZ1bmN0aW9uIGV4dHJhY3RSZWxldmFudENvbnRlbnQodGV4dDogc3RyaW5nLCBtYXhMZW5ndGg6IG51bWJlciA9IDEwMDAwKTogc3RyaW5nIHtcclxuICBpZiAodGV4dC5sZW5ndGggPD0gbWF4TGVuZ3RoKSByZXR1cm4gdGV4dDtcclxuICBcclxuICAvLyBEaXZpZGlyIG8gdGV4dG8gZW0gcGFyw6FncmFmb3NcclxuICBjb25zdCBwYXJhZ3JhcGhzID0gdGV4dC5zcGxpdCgvXFxuXFxuKy8pO1xyXG4gIFxyXG4gIC8vIFNlIHRpdmVybW9zIHBvdWNvcyBwYXLDoWdyYWZvcyBvdSBwYXLDoWdyYWZvcyBtdWl0byBsb25nb3MsIGRpdmlkaW1vcyBwb3Igc2VudGVuw6dhc1xyXG4gIGlmIChwYXJhZ3JhcGhzLmxlbmd0aCA8IDEwKSB7XHJcbiAgICBjb25zdCBzZW50ZW5jZXMgPSB0ZXh0LnNwbGl0KC8oPzw9Wy4hP10pXFxzKy8pO1xyXG4gICAgXHJcbiAgICAvLyBDb2xldGFyIGFsZ3VtYXMgc2VudGVuw6dhcyBkbyBpbsOtY2lvXHJcbiAgICBjb25zdCBzdGFydFNlbnRlbmNlcyA9IHNlbnRlbmNlcy5zbGljZSgwLCBNYXRoLm1pbigxMCwgc2VudGVuY2VzLmxlbmd0aCAvIDQpKTtcclxuICAgIFxyXG4gICAgLy8gQ29sZXRhciBhbGd1bWFzIHNlbnRlbsOnYXMgZG8gbWVpb1xyXG4gICAgY29uc3QgbWlkZGxlU3RhcnQgPSBNYXRoLmZsb29yKHNlbnRlbmNlcy5sZW5ndGggLyAyKSAtIDU7XHJcbiAgICBjb25zdCBtaWRkbGVTZW50ZW5jZXMgPSBzZW50ZW5jZXMuc2xpY2UoXHJcbiAgICAgIE1hdGgubWF4KDEwLCBtaWRkbGVTdGFydCksXHJcbiAgICAgIE1hdGgubWluKHNlbnRlbmNlcy5sZW5ndGgsIG1pZGRsZVN0YXJ0ICsgMTApXHJcbiAgICApO1xyXG4gICAgXHJcbiAgICAvLyBDb2xldGFyIGFsZ3VtYXMgc2VudGVuw6dhcyBkbyBmaW5hbFxyXG4gICAgY29uc3QgZW5kU2VudGVuY2VzID0gc2VudGVuY2VzLnNsaWNlKE1hdGgubWF4KDAsIHNlbnRlbmNlcy5sZW5ndGggLSAxMCkpO1xyXG4gICAgXHJcbiAgICAvLyBKdW50YXIgdHVkb1xyXG4gICAgcmV0dXJuIFsuLi5zdGFydFNlbnRlbmNlcywgLi4ubWlkZGxlU2VudGVuY2VzLCAuLi5lbmRTZW50ZW5jZXNdLmpvaW4oJyAnKTtcclxuICB9XHJcbiAgXHJcbiAgLy8gQ29sZXRhciBwYXLDoWdyYWZvcyBkbyBpbsOtY2lvXHJcbiAgY29uc3Qgc3RhcnRQYXJhZ3JhcGhzID0gcGFyYWdyYXBocy5zbGljZSgwLCBNYXRoLm1pbig1LCBwYXJhZ3JhcGhzLmxlbmd0aCAvIDQpKTtcclxuICBcclxuICAvLyBDb2xldGFyIHBhcsOhZ3JhZm9zIGRvIG1laW9cclxuICBjb25zdCBtaWRkbGVTdGFydCA9IE1hdGguZmxvb3IocGFyYWdyYXBocy5sZW5ndGggLyAyKSAtIDM7XHJcbiAgY29uc3QgbWlkZGxlUGFyYWdyYXBocyA9IHBhcmFncmFwaHMuc2xpY2UoXHJcbiAgICBNYXRoLm1heCg1LCBtaWRkbGVTdGFydCksXHJcbiAgICBNYXRoLm1pbihwYXJhZ3JhcGhzLmxlbmd0aCwgbWlkZGxlU3RhcnQgKyA2KVxyXG4gICk7XHJcbiAgXHJcbiAgLy8gQ29sZXRhciBwYXLDoWdyYWZvcyBkbyBmaW5hbFxyXG4gIGNvbnN0IGVuZFBhcmFncmFwaHMgPSBwYXJhZ3JhcGhzLnNsaWNlKE1hdGgubWF4KDAsIHBhcmFncmFwaHMubGVuZ3RoIC0gNSkpO1xyXG4gIFxyXG4gIC8vIEp1bnRhciB0dWRvXHJcbiAgY29uc3QgcmVzdWx0ID0gWy4uLnN0YXJ0UGFyYWdyYXBocywgLi4ubWlkZGxlUGFyYWdyYXBocywgLi4uZW5kUGFyYWdyYXBoc10uam9pbignXFxuXFxuJyk7XHJcbiAgXHJcbiAgLy8gU2UgYWluZGEgZXN0aXZlciBtdWl0byBsb25nbywgY29ydGFyXHJcbiAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPiBtYXhMZW5ndGggPyByZXN1bHQuc2xpY2UoMCwgbWF4TGVuZ3RoKSA6IHJlc3VsdDtcclxufVxyXG5cclxuLy8gR2VyYcOnw6NvIGRlIHBlcmd1bnRhcyBtb2NrIHF1YW5kbyBhIEFQSSBmYWxoYVxyXG5mdW5jdGlvbiBnZW5lcmF0ZUZhbGxiYWNrUXVlc3Rpb25zKHRleHQ6IHN0cmluZywgdGl0bGU6IHN0cmluZyk6IGFueVtdIHtcclxuICAvLyBFeHRyYWlyIGFsZ3VtYXMgcGFsYXZyYXMgY2hhdmUgZG8gdGV4dG8gcGFyYSB1c2FyIG5hcyBwZXJndW50YXNcclxuICBjb25zdCBrZXl3b3JkcyA9IHRleHRcclxuICAgIC5zcGxpdCgvXFxzKy8pXHJcbiAgICAuZmlsdGVyKHdvcmQgPT4gd29yZC5sZW5ndGggPiA1KVxyXG4gICAgLmZpbHRlcigod29yZCwgaW5kZXgsIHNlbGYpID0+IHNlbGYuaW5kZXhPZih3b3JkKSA9PT0gaW5kZXgpXHJcbiAgICAuc2xpY2UoMCwgNTApXHJcbiAgXHJcbiAgY29uc3QgcXVlc3Rpb25zID0gW1xyXG4gICAge1xyXG4gICAgICBpZDogMSxcclxuICAgICAgcXVlc3Rpb246IGBRdWFsIMOpIG8gYXNzdW50byBwcmluY2lwYWwgYWJvcmRhZG8gbm8gZG9jdW1lbnRvIFwiJHt0aXRsZX1cIj9gLFxyXG4gICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgXCJGaXNpb3RlcmFwaWEgbmVvbmF0YWxcIixcclxuICAgICAgICBcIlBlZGlhdHJpYSBnZXJhbFwiLFxyXG4gICAgICAgIFwiTmV1cm9sb2dpYSBhZHVsdGFcIixcclxuICAgICAgICBcIkNpcnVyZ2lhIHBlZGnDoXRyaWNhXCJcclxuICAgICAgXSxcclxuICAgICAgY29ycmVjdEFuc3dlcjogMFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6IDIsXHJcbiAgICAgIHF1ZXN0aW9uOiBcIlF1YWlzIHPDo28gb3MgcHJpbmNpcGFpcyBiZW5lZsOtY2lvcyBkYSBmaXNpb3RlcmFwaWEgZW0gcmVjw6ltLW5hc2NpZG9zP1wiLFxyXG4gICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgXCJBcGVuYXMgcHJldmVuw6fDo28gZGUgY29tcGxpY2HDp8O1ZXMgcmVzcGlyYXTDs3JpYXNcIixcclxuICAgICAgICBcIlNvbWVudGUgZ2FuaG8gZGUgcGVzbyBhY2VsZXJhZG9cIixcclxuICAgICAgICBcIkRlc2Vudm9sdmltZW50byBuZXVyb21vdG9yIGUgcHJldmVuw6fDo28gZGUgY29tcGxpY2HDp8O1ZXNcIixcclxuICAgICAgICBcIkFwZW5hcyBtZWxob3JpYSBuYSBhbGltZW50YcOnw6NvXCJcclxuICAgICAgXSxcclxuICAgICAgY29ycmVjdEFuc3dlcjogMlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6IDMsXHJcbiAgICAgIHF1ZXN0aW9uOiBcIlF1YWwgw6kgYSBpbXBvcnTDom5jaWEgZGEgaW50ZXJ2ZW7Dp8OjbyBwcmVjb2NlIGVtIHByZW1hdHVyb3M/XCIsXHJcbiAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICBcIk7Do28gdGVtIGltcG9ydMOibmNpYSBzaWduaWZpY2F0aXZhXCIsXHJcbiAgICAgICAgXCJBcGVuYXMgcGFyYSB0cmFucXVpbGl6YXIgb3MgcGFpc1wiLFxyXG4gICAgICAgIFwiUmVkdXogcHJvYmxlbWFzIGFwZW5hcyBuYSBmYXNlIGFkdWx0YVwiLFxyXG4gICAgICAgIFwiTWVsaG9yYSBvIHByb2duw7NzdGljbyBkZSBkZXNlbnZvbHZpbWVudG9cIlxyXG4gICAgICBdLFxyXG4gICAgICBjb3JyZWN0QW5zd2VyOiAzXHJcbiAgICB9XHJcbiAgXVxyXG4gIFxyXG4gIC8vIEdlcmFyIG1haXMgNyBwZXJndW50YXMgY29tIGJhc2UgbmFzIHBhbGF2cmFzLWNoYXZlXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgIGlmIChrZXl3b3Jkcy5sZW5ndGggPiBpKjQgKyA0KSB7XHJcbiAgICAgIGNvbnN0IHJhbmRvbUtleXdvcmQxID0ga2V5d29yZHNbaSo0XVxyXG4gICAgICBjb25zdCByYW5kb21LZXl3b3JkMiA9IGtleXdvcmRzW2kqNCArIDFdXHJcbiAgICAgIGNvbnN0IHJhbmRvbUtleXdvcmQzID0ga2V5d29yZHNbaSo0ICsgMl1cclxuICAgICAgXHJcbiAgICAgIHF1ZXN0aW9ucy5wdXNoKHtcclxuICAgICAgICBpZDogaSArIDQsXHJcbiAgICAgICAgcXVlc3Rpb246IGBRdWFsIGNvbmNlaXRvIGVzdMOhIG1haXMgZGlyZXRhbWVudGUgcmVsYWNpb25hZG8gYSBcIiR7cmFuZG9tS2V5d29yZDF9XCIgbm8gY29udGV4dG8gZG8gZG9jdW1lbnRvP2AsXHJcbiAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgYCR7cmFuZG9tS2V5d29yZDJ9YCxcclxuICAgICAgICAgIFwiVW0gY29uY2VpdG8gbsOjbyBtZW5jaW9uYWRvIG5vIGRvY3VtZW50b1wiLFxyXG4gICAgICAgICAgYCR7cmFuZG9tS2V5d29yZDN9YCxcclxuICAgICAgICAgIFwiTmVuaHVtYSBkYXMgYWx0ZXJuYXRpdmFzXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIGNvcnJlY3RBbnN3ZXI6IDBcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgcmV0dXJuIHF1ZXN0aW9uc1xyXG59XHJcblxyXG4vLyBBcm1hemVuYXIgcGVyZ3VudGFzIGFudGVyaW9ybWVudGUgZ2VyYWRhcyBwYXJhIGV2aXRhciByZXBldGnDp8Ojb1xyXG5jb25zdCBxdWVzdGlvbkNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIFNldDxzdHJpbmc+PigpO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLmpzb24oKVxyXG4gICAgY29uc3QgeyB0ZXh0LCB0aXRsZSB9ID0gYm9keVxyXG4gICAgXHJcbiAgICBpZiAoIXRleHQpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6ICdUZXh0byBkbyBkb2N1bWVudG8gbsOjbyBmb3JuZWNpZG8nIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XHJcbiAgICAgIClcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gQ3JpYXIgdW0gaWRlbnRpZmljYWRvciDDum5pY28gcGFyYSBlc3RlIGRvY3VtZW50b1xyXG4gICAgY29uc3QgZG9jSWQgPSBjcnlwdG8uY3JlYXRlSGFzaCgnbWQ1JykudXBkYXRlKHRpdGxlICsgdGV4dC5zbGljZSgwLCAyMDApKS5kaWdlc3QoJ2hleCcpO1xyXG4gICAgXHJcbiAgICAvLyBQZWdhciBvdSBjcmlhciBvIGNvbmp1bnRvIGRlIHBlcmd1bnRhcyBwYXJhIGVzdGUgZG9jdW1lbnRvXHJcbiAgICBpZiAoIXF1ZXN0aW9uQ2FjaGUuaGFzKGRvY0lkKSkge1xyXG4gICAgICBxdWVzdGlvbkNhY2hlLnNldChkb2NJZCwgbmV3IFNldCgpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgZXhpc3RpbmdRdWVzdGlvbnMgPSBxdWVzdGlvbkNhY2hlLmdldChkb2NJZCkhO1xyXG4gICAgXHJcbiAgICAvLyBFeHRyYWlyIGNvbnRlw7pkbyByZWxldmFudGUgZG8gdGV4dG9cclxuICAgIGNvbnN0IHJlbGV2YW50VGV4dCA9IGV4dHJhY3RSZWxldmFudENvbnRlbnQodGV4dCwgNjAwMClcclxuICAgIFxyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gQ3JpZSBvIHByb21wdCBjb20gYXMgcGVyZ3VudGFzIGV4aXN0ZW50ZXMgbGlzdGFkYXNcclxuICAgICAgbGV0IHByZXZpb3VzUXVlc3Rpb25zVGV4dCA9ICcnO1xyXG4gICAgICBcclxuICAgICAgaWYgKGV4aXN0aW5nUXVlc3Rpb25zLnNpemUgPiAwKSB7XHJcbiAgICAgICAgcHJldmlvdXNRdWVzdGlvbnNUZXh0ID0gYElNUE9SVEFOVEU6IEV2aXRlIGdlcmFyIHBlcmd1bnRhcyBzZW1lbGhhbnRlcyBhIGVzdGFzIHF1ZSBqw6EgZm9yYW0gY3JpYWRhcyBhbnRlcmlvcm1lbnRlOlxyXG4gICAgICAgIFxyXG4gICAgICAgICR7QXJyYXkuZnJvbShleGlzdGluZ1F1ZXN0aW9ucykuam9pbignXFxuJyl9XHJcbiAgICAgICAgXHJcbiAgICAgICAgQXMgbm92YXMgcGVyZ3VudGFzIGRldmVtIHNlciBDT01QTEVUQU1FTlRFIERJRkVSRU5URVMgZGFzIGxpc3RhZGFzIGFjaW1hLmA7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIC8vIFByaW1laXJvLCB2YW1vcyBzb2xpY2l0YXIgYXMgcGVyZ3VudGFzIGVtIGZvcm1hdG8gZGUgdGV4dG8gc2ltcGxlc1xyXG4gICAgICBjb25zdCBwcm9tcHQgPSBgXHJcbiAgICAgIFBvciBmYXZvciwgY3JpZSAxMCBwZXJndW50YXMgZGUgbcO6bHRpcGxhIGVzY29saGEgdG90YWxtZW50ZSBub3ZhcyBzb2JyZSBvIHNlZ3VpbnRlIHRleHRvIG3DqWRpY286XHJcbiAgICAgIFxyXG4gICAgICAke3JlbGV2YW50VGV4dH1cclxuICAgICAgXHJcbiAgICAgICR7cHJldmlvdXNRdWVzdGlvbnNUZXh0fVxyXG4gICAgICBcclxuICAgICAgUkVHUkFTIElNUE9SVEFOVEVTOlxyXG4gICAgICAxLiBDYWRhIHBlcmd1bnRhIGRldmUgc2VyIGNsYXJhLCBlc3BlY8OtZmljYSBlIGRpcmV0YW1lbnRlIHJlbGFjaW9uYWRhIGFvIGNvbnRlw7pkb1xyXG4gICAgICAyLiBQYXJhIGNhZGEgcGVyZ3VudGEsIGZvcm5lw6dhIDQgb3DDp8O1ZXMgZGUgcmVzcG9zdGEgb25kZSBhcGVuYXMgdW1hIGVzdMOhIGNvcnJldGFcclxuICAgICAgMy4gRXZpdGUgcXVlc3TDtWVzIGdlbsOpcmljYXMgb3Ugc3VwZXJmaWNpYWlzXHJcbiAgICAgIDQuIE7Dg08gaW5jbHVhIGludHJvZHXDp8O1ZXMgY29tbyBcIkFxdWkgZXN0w6NvIDEwIHBlcmd1bnRhc1wiIG5vIGluw61jaW9cclxuICAgICAgNS4gQ29tZWNlIGNhZGEgcGVyZ3VudGEgaW1lZGlhdGFtZW50ZSBjb20gXCJQRVJHVU5UQTpcIiAoc2VtIG51bWVyYcOnw6NvKVxyXG4gICAgICBcclxuICAgICAgVXNlIEVYQVRBTUVOVEUgZXN0ZSBmb3JtYXRvIHBhcmEgY2FkYSBwZXJndW50YTpcclxuICAgICAgXHJcbiAgICAgIFBFUkdVTlRBOiBbdGV4dG8gZGEgcGVyZ3VudGFdXHJcbiAgICAgIEEpIFtvcMOnw6NvIEFdXHJcbiAgICAgIEIpIFtvcMOnw6NvIEJdXHJcbiAgICAgIEMpIFtvcMOnw6NvIENdXHJcbiAgICAgIEQpIFtvcMOnw6NvIERdXHJcbiAgICAgIFJFU1BPU1RBOiBbbGV0cmEgZGEgcmVzcG9zdGEgY29ycmV0YTogQSwgQiwgQyBvdSBEXVxyXG4gICAgICBcclxuICAgICAgYFxyXG4gICAgICBcclxuICAgICAgLy8gQ2hhbWFyIGEgQVBJIHBhcmEgZ2VyYXIgYXMgcGVyZ3VudGFzXHJcbiAgICAgIGNvbnN0IGNvbXBsZXRpb24gPSBhd2FpdCBncm9xLmNoYXQuY29tcGxldGlvbnMuY3JlYXRlKHtcclxuICAgICAgICBtZXNzYWdlczogW1xyXG4gICAgICAgICAgeyByb2xlOiAndXNlcicsIGNvbnRlbnQ6IHByb21wdCB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBtb2RlbDogJ2xsYW1hMy04Yi04MTkyJyxcclxuICAgICAgICB0ZW1wZXJhdHVyZTogMC44LFxyXG4gICAgICAgIG1heF90b2tlbnM6IDQwOTYsXHJcbiAgICAgICAgdG9wX3A6IDAuOVxyXG4gICAgICB9KVxyXG4gICAgICBcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBjb21wbGV0aW9uLmNob2ljZXNbMF0ubWVzc2FnZS5jb250ZW50IHx8ICcnXHJcbiAgICAgIFxyXG4gICAgICAvLyBQcm9jZXNzYXIgbyB0ZXh0byBwYXJhIGV4dHJhaXIgcGVyZ3VudGFzIGUgcmVzcG9zdGFzXHJcbiAgICAgIGNvbnN0IHF1ZXN0aW9uczogYW55W10gPSBbXVxyXG4gICAgICAvLyBVc2FyIHJlZ2V4IHBhcmEgZXh0cmFpciBjYWRhIGJsb2NvIHF1ZSBjb21lw6dhIGNvbSBcIlBFUkdVTlRBOlwiXHJcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSByZXNwb25zZS5tYXRjaCgvUEVSR1VOVEE6W1xcc1xcU10rPyg/PVBFUkdVTlRBOnwkKS9nKSB8fCBbXTtcclxuICAgICAgXHJcbiAgICAgIC8vIFBhcmEgY2FkYSBibG9jbyBleHRyYcOtZG8sIHByb2Nlc3NhciBhIHBlcmd1bnRhXHJcbiAgICAgIG1hdGNoZXMuZm9yRWFjaCgoYmxvY2ssIGluZGV4KSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIC8vIEV4dHJhaXIgYSBwZXJndW50YSAocHJpbWVpcmEgbGluaGEgYXDDs3MgXCJQRVJHVU5UQTpcIilcclxuICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uTWF0Y2ggPSBibG9jay5tYXRjaCgvUEVSR1VOVEE6XFxzKihbXlxcbl0rKS8pO1xyXG4gICAgICAgICAgaWYgKCFxdWVzdGlvbk1hdGNoKSByZXR1cm47XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uID0gcXVlc3Rpb25NYXRjaFsxXS50cmltKCk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIEFkaWNpb25hciDDoCBjYWNoZSBwYXJhIGV2aXRhciBkdXBsaWNhw6fDo28gZnV0dXJhXHJcbiAgICAgICAgICBleGlzdGluZ1F1ZXN0aW9ucy5hZGQocXVlc3Rpb24pO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBFeHRyYWlyIGFzIG9ww6fDtWVzXHJcbiAgICAgICAgICBjb25zdCBvcHRpb25BID0gYmxvY2subWF0Y2goL0FcXClcXHMqKFteXFxuXSspLyk/LlsxXT8udHJpbSgpIHx8IFwiT3DDp8OjbyBBXCI7XHJcbiAgICAgICAgICBjb25zdCBvcHRpb25CID0gYmxvY2subWF0Y2goL0JcXClcXHMqKFteXFxuXSspLyk/LlsxXT8udHJpbSgpIHx8IFwiT3DDp8OjbyBCXCI7XHJcbiAgICAgICAgICBjb25zdCBvcHRpb25DID0gYmxvY2subWF0Y2goL0NcXClcXHMqKFteXFxuXSspLyk/LlsxXT8udHJpbSgpIHx8IFwiT3DDp8OjbyBDXCI7XHJcbiAgICAgICAgICBjb25zdCBvcHRpb25EID0gYmxvY2subWF0Y2goL0RcXClcXHMqKFteXFxuXSspLyk/LlsxXT8udHJpbSgpIHx8IFwiT3DDp8OjbyBEXCI7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIEV4dHJhaXIgYSByZXNwb3N0YSBjb3JyZXRhXHJcbiAgICAgICAgICBjb25zdCBhbnN3ZXJNYXRjaCA9IGJsb2NrLm1hdGNoKC9SRVNQT1NUQTpcXHMqKFtBLURdKS9pKTtcclxuICAgICAgICAgIGxldCBjb3JyZWN0QW5zd2VyID0gMDtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgaWYgKGFuc3dlck1hdGNoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxldHRlciA9IGFuc3dlck1hdGNoWzFdLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGNvcnJlY3RBbnN3ZXIgPSBsZXR0ZXIgPT09ICdBJyA/IDAgOiBsZXR0ZXIgPT09ICdCJyA/IDEgOiBsZXR0ZXIgPT09ICdDJyA/IDIgOiAzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBBZGljaW9uYXIgw6AgbGlzdGEgZGUgcGVyZ3VudGFzXHJcbiAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiBpbmRleCArIDEsXHJcbiAgICAgICAgICAgIHF1ZXN0aW9uLFxyXG4gICAgICAgICAgICBvcHRpb25zOiBbb3B0aW9uQSwgb3B0aW9uQiwgb3B0aW9uQywgb3B0aW9uRF0sXHJcbiAgICAgICAgICAgIGNvcnJlY3RBbnN3ZXJcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKHBhcnNlRXJyb3IpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gcGFyc2VhciBibG9jbyBkZSBwZXJndW50YTonLCBwYXJzZUVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgLy8gTGltaXRhciBvIGNhY2hlIHBhcmEgbsOjbyBjcmVzY2VyIGRlbWFpcyAobcOheGltbyBkZSAxMDAgcGVyZ3VudGFzIHBvciBkb2N1bWVudG8pXHJcbiAgICAgIGlmIChleGlzdGluZ1F1ZXN0aW9ucy5zaXplID4gMTAwKSB7XHJcbiAgICAgICAgLy8gQ29udmVydGVyIHBhcmEgYXJyYXksIHJlbW92ZXIgb3MgbWFpcyBhbnRpZ29zIGUgY29udmVydGVyIGRlIHZvbHRhIHBhcmEgU2V0XHJcbiAgICAgICAgY29uc3QgcXVlc3Rpb25zQXJyYXkgPSBBcnJheS5mcm9tKGV4aXN0aW5nUXVlc3Rpb25zKTtcclxuICAgICAgICBjb25zdCBuZXdRdWVzdGlvbnMgPSBuZXcgU2V0KHF1ZXN0aW9uc0FycmF5LnNsaWNlKC0xMDApKTtcclxuICAgICAgICBxdWVzdGlvbkNhY2hlLnNldChkb2NJZCwgbmV3UXVlc3Rpb25zKTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgLy8gU2UgY29uc2VndWltb3MgZXh0cmFpciBwZWxvIG1lbm9zIDMgcGVyZ3VudGFzLCB1c2UtYXNcclxuICAgICAgaWYgKHF1ZXN0aW9ucy5sZW5ndGggPj0gMykge1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHF1ZXN0aW9ucyB9KVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAvLyBDYXNvIGNvbnRyw6FyaW8sIGdlcmUgcGVyZ3VudGFzIGRlIGZhbGxiYWNrXHJcbiAgICAgIGNvbnN0IGZhbGxiYWNrUXVlc3Rpb25zID0gZ2VuZXJhdGVGYWxsYmFja1F1ZXN0aW9ucyh0ZXh0LCB0aXRsZSlcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgcXVlc3Rpb25zOiBmYWxsYmFja1F1ZXN0aW9ucyB9KVxyXG4gICAgICBcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gZ2VyYXIgcGVyZ3VudGFzOicsIGVycm9yKVxyXG4gICAgICBcclxuICAgICAgLy8gR2VyYXIgcGVyZ3VudGFzIGZhbGxiYWNrIGVtIGNhc28gZGUgZXJyb1xyXG4gICAgICBjb25zdCBmYWxsYmFja1F1ZXN0aW9ucyA9IGdlbmVyYXRlRmFsbGJhY2tRdWVzdGlvbnModGV4dCwgdGl0bGUpXHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHF1ZXN0aW9uczogZmFsbGJhY2tRdWVzdGlvbnMgfSlcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignRXJybyBuYSBBUEkgZGUgZ2VyYcOnw6NvIGRlIHF1aXo6JywgZXJyb3IpXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgZXJyb3I6ICdFcnJvIGFvIHByb2Nlc3NhciBhIHNvbGljaXRhw6fDo28nIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKVxyXG4gIH1cclxufSAiXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiR3JvcUFQSSIsImNyeXB0byIsImdyb3EiLCJleHRyYWN0UmVsZXZhbnRDb250ZW50IiwidGV4dCIsIm1heExlbmd0aCIsImxlbmd0aCIsInBhcmFncmFwaHMiLCJzcGxpdCIsInNlbnRlbmNlcyIsInN0YXJ0U2VudGVuY2VzIiwic2xpY2UiLCJNYXRoIiwibWluIiwibWlkZGxlU3RhcnQiLCJmbG9vciIsIm1pZGRsZVNlbnRlbmNlcyIsIm1heCIsImVuZFNlbnRlbmNlcyIsImpvaW4iLCJzdGFydFBhcmFncmFwaHMiLCJtaWRkbGVQYXJhZ3JhcGhzIiwiZW5kUGFyYWdyYXBocyIsInJlc3VsdCIsImdlbmVyYXRlRmFsbGJhY2tRdWVzdGlvbnMiLCJ0aXRsZSIsImtleXdvcmRzIiwiZmlsdGVyIiwid29yZCIsImluZGV4Iiwic2VsZiIsImluZGV4T2YiLCJxdWVzdGlvbnMiLCJpZCIsInF1ZXN0aW9uIiwib3B0aW9ucyIsImNvcnJlY3RBbnN3ZXIiLCJpIiwicmFuZG9tS2V5d29yZDEiLCJyYW5kb21LZXl3b3JkMiIsInJhbmRvbUtleXdvcmQzIiwicHVzaCIsInF1ZXN0aW9uQ2FjaGUiLCJNYXAiLCJQT1NUIiwicmVxIiwiYm9keSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImRvY0lkIiwiY3JlYXRlSGFzaCIsInVwZGF0ZSIsImRpZ2VzdCIsImhhcyIsInNldCIsIlNldCIsImV4aXN0aW5nUXVlc3Rpb25zIiwiZ2V0IiwicmVsZXZhbnRUZXh0IiwicHJldmlvdXNRdWVzdGlvbnNUZXh0Iiwic2l6ZSIsIkFycmF5IiwiZnJvbSIsInByb21wdCIsImNvbXBsZXRpb24iLCJjaGF0IiwiY29tcGxldGlvbnMiLCJjcmVhdGUiLCJtZXNzYWdlcyIsInJvbGUiLCJjb250ZW50IiwibW9kZWwiLCJ0ZW1wZXJhdHVyZSIsIm1heF90b2tlbnMiLCJ0b3BfcCIsInJlc3BvbnNlIiwiY2hvaWNlcyIsIm1lc3NhZ2UiLCJtYXRjaGVzIiwibWF0Y2giLCJmb3JFYWNoIiwiYmxvY2siLCJxdWVzdGlvbk1hdGNoIiwidHJpbSIsImFkZCIsIm9wdGlvbkEiLCJvcHRpb25CIiwib3B0aW9uQyIsIm9wdGlvbkQiLCJhbnN3ZXJNYXRjaCIsImxldHRlciIsInRvVXBwZXJDYXNlIiwicGFyc2VFcnJvciIsImNvbnNvbGUiLCJxdWVzdGlvbnNBcnJheSIsIm5ld1F1ZXN0aW9ucyIsImZhbGxiYWNrUXVlc3Rpb25zIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/generate-quiz/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate-quiz%2Froute&page=%2Fapi%2Fgenerate-quiz%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate-quiz%2Froute.ts&appDir=D%3A%5Cfisioneo-main%5Cfisioneo-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cfisioneo-main%5Cfisioneo-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate-quiz%2Froute&page=%2Fapi%2Fgenerate-quiz%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate-quiz%2Froute.ts&appDir=D%3A%5Cfisioneo-main%5Cfisioneo-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cfisioneo-main%5Cfisioneo-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_fisioneo_main_fisioneo_main_app_api_generate_quiz_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/generate-quiz/route.ts */ \"(rsc)/./app/api/generate-quiz/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/generate-quiz/route\",\n        pathname: \"/api/generate-quiz\",\n        filename: \"route\",\n        bundlePath: \"app/api/generate-quiz/route\"\n    },\n    resolvedPagePath: \"D:\\\\fisioneo-main\\\\fisioneo-main\\\\app\\\\api\\\\generate-quiz\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_fisioneo_main_fisioneo_main_app_api_generate_quiz_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZnZW5lcmF0ZS1xdWl6JTJGcm91dGUmcGFnZT0lMkZhcGklMkZnZW5lcmF0ZS1xdWl6JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGZ2VuZXJhdGUtcXVpeiUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDZmlzaW9uZW8tbWFpbiU1Q2Zpc2lvbmVvLW1haW4lNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUQlM0ElNUNmaXNpb25lby1tYWluJTVDZmlzaW9uZW8tbWFpbiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDbUI7QUFDaEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkQ6XFxcXGZpc2lvbmVvLW1haW5cXFxcZmlzaW9uZW8tbWFpblxcXFxhcHBcXFxcYXBpXFxcXGdlbmVyYXRlLXF1aXpcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2dlbmVyYXRlLXF1aXovcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9nZW5lcmF0ZS1xdWl6XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9nZW5lcmF0ZS1xdWl6L3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRDpcXFxcZmlzaW9uZW8tbWFpblxcXFxmaXNpb25lby1tYWluXFxcXGFwcFxcXFxhcGlcXFxcZ2VuZXJhdGUtcXVpelxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate-quiz%2Froute&page=%2Fapi%2Fgenerate-quiz%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate-quiz%2Froute.ts&appDir=D%3A%5Cfisioneo-main%5Cfisioneo-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cfisioneo-main%5Cfisioneo-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

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

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "node:stream/web":
/*!**********************************!*\
  !*** external "node:stream/web" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream/web");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

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

/***/ "worker_threads":
/*!*********************************!*\
  !*** external "worker_threads" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("worker_threads");

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/formdata-node","vendor-chunks/ms","vendor-chunks/groq-sdk","vendor-chunks/form-data-encoder","vendor-chunks/whatwg-url","vendor-chunks/agentkeepalive","vendor-chunks/tr46","vendor-chunks/web-streams-polyfill","vendor-chunks/node-fetch","vendor-chunks/webidl-conversions","vendor-chunks/humanize-ms","vendor-chunks/event-target-shim","vendor-chunks/abort-controller"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate-quiz%2Froute&page=%2Fapi%2Fgenerate-quiz%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate-quiz%2Froute.ts&appDir=D%3A%5Cfisioneo-main%5Cfisioneo-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cfisioneo-main%5Cfisioneo-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();