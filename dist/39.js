(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[39],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/razor/razor.js":
/*!**************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/razor/razor.js ***!
  \**************************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\n *  Copyright (c) Microsoft Corporation. All rights reserved.\n *  Licensed under the MIT License. See License.txt in the project root for license information.\n *--------------------------------------------------------------------------------------------*/\n\n// Allow for running under nodejs/requirejs in tests\nvar _monaco = (typeof monaco === 'undefined' ? self.monaco : monaco);\nvar EMPTY_ELEMENTS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];\nvar conf = {\n    wordPattern: /(-?\\d*\\.\\d\\w*)|([^\\`\\~\\!\\@\\$\\^\\&\\*\\(\\)\\-\\=\\+\\[\\{\\]\\}\\\\\\|\\;\\:\\'\\\"\\,\\.\\<\\>\\/\\s]+)/g,\n    comments: {\n        blockComment: ['<!--', '-->']\n    },\n    brackets: [\n        ['<!--', '-->'],\n        ['<', '>'],\n        ['{', '}'],\n        ['(', ')']\n    ],\n    autoClosingPairs: [\n        { open: '{', close: '}' },\n        { open: '[', close: ']' },\n        { open: '(', close: ')' },\n        { open: '\"', close: '\"' },\n        { open: '\\'', close: '\\'' }\n    ],\n    surroundingPairs: [\n        { open: '\"', close: '\"' },\n        { open: '\\'', close: '\\'' },\n        { open: '<', close: '>' }\n    ],\n    onEnterRules: [\n        {\n            beforeText: new RegExp(\"<(?!(?:\" + EMPTY_ELEMENTS.join('|') + \"))(\\\\w[\\\\w\\\\d]*)([^/>]*(?!/)>)[^<]*$\", 'i'),\n            afterText: /^<\\/(\\w[\\w\\d]*)\\s*>$/i,\n            action: { indentAction: _monaco.languages.IndentAction.IndentOutdent }\n        },\n        {\n            beforeText: new RegExp(\"<(?!(?:\" + EMPTY_ELEMENTS.join('|') + \"))(\\\\w[\\\\w\\\\d]*)([^/>]*(?!/)>)[^<]*$\", 'i'),\n            action: { indentAction: _monaco.languages.IndentAction.Indent }\n        }\n    ],\n};\nvar language = {\n    defaultToken: '',\n    tokenPostfix: '',\n    // ignoreCase: true,\n    // The main tokenizer for our languages\n    tokenizer: {\n        root: [\n            [/@@/],\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.root' }],\n            [/<!DOCTYPE/, 'metatag.html', '@doctype'],\n            [/<!--/, 'comment.html', '@comment'],\n            [/(<)(\\w+)(\\/>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],\n            [/(<)(script)/, ['delimiter.html', { token: 'tag.html', next: '@script' }]],\n            [/(<)(style)/, ['delimiter.html', { token: 'tag.html', next: '@style' }]],\n            [/(<)([:\\w]+)/, ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]],\n            [/(<\\/)(\\w+)/, ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]],\n            [/</, 'delimiter.html'],\n            [/[ \\t\\r\\n]+/],\n            [/[^<@]+/],\n        ],\n        doctype: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.comment' }],\n            [/[^>]+/, 'metatag.content.html'],\n            [/>/, 'metatag.html', '@pop'],\n        ],\n        comment: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.comment' }],\n            [/-->/, 'comment.html', '@pop'],\n            [/[^-]+/, 'comment.content.html'],\n            [/./, 'comment.content.html']\n        ],\n        otherTag: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.otherTag' }],\n            [/\\/?>/, 'delimiter.html', '@pop'],\n            [/\"([^\"]*)\"/, 'attribute.value'],\n            [/'([^']*)'/, 'attribute.value'],\n            [/[\\w\\-]+/, 'attribute.name'],\n            [/=/, 'delimiter'],\n            [/[ \\t\\r\\n]+/],\n        ],\n        // -- BEGIN <script> tags handling\n        // After <script\n        script: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.script' }],\n            [/type/, 'attribute.name', '@scriptAfterType'],\n            [/\"([^\"]*)\"/, 'attribute.value'],\n            [/'([^']*)'/, 'attribute.value'],\n            [/[\\w\\-]+/, 'attribute.name'],\n            [/=/, 'delimiter'],\n            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.text/javascript', nextEmbedded: 'text/javascript' }],\n            [/[ \\t\\r\\n]+/],\n            [/(<\\/)(script\\s*)(>)/, ['delimiter.html', 'tag.html', { token: 'delimiter.html', next: '@pop' }]]\n        ],\n        // After <script ... type\n        scriptAfterType: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.scriptAfterType' }],\n            [/=/, 'delimiter', '@scriptAfterTypeEquals'],\n            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.text/javascript', nextEmbedded: 'text/javascript' }],\n            [/[ \\t\\r\\n]+/],\n            [/<\\/script\\s*>/, { token: '@rematch', next: '@pop' }]\n        ],\n        // After <script ... type =\n        scriptAfterTypeEquals: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.scriptAfterTypeEquals' }],\n            [/\"([^\"]*)\"/, { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }],\n            [/'([^']*)'/, { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }],\n            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.text/javascript', nextEmbedded: 'text/javascript' }],\n            [/[ \\t\\r\\n]+/],\n            [/<\\/script\\s*>/, { token: '@rematch', next: '@pop' }]\n        ],\n        // After <script ... type = $S2\n        scriptWithCustomType: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.scriptWithCustomType.$S2' }],\n            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.$S2', nextEmbedded: '$S2' }],\n            [/\"([^\"]*)\"/, 'attribute.value'],\n            [/'([^']*)'/, 'attribute.value'],\n            [/[\\w\\-]+/, 'attribute.name'],\n            [/=/, 'delimiter'],\n            [/[ \\t\\r\\n]+/],\n            [/<\\/script\\s*>/, { token: '@rematch', next: '@pop' }]\n        ],\n        scriptEmbedded: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInEmbeddedState.scriptEmbedded.$S2', nextEmbedded: '@pop' }],\n            [/<\\/script/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }]\n        ],\n        // -- END <script> tags handling\n        // -- BEGIN <style> tags handling\n        // After <style\n        style: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.style' }],\n            [/type/, 'attribute.name', '@styleAfterType'],\n            [/\"([^\"]*)\"/, 'attribute.value'],\n            [/'([^']*)'/, 'attribute.value'],\n            [/[\\w\\-]+/, 'attribute.name'],\n            [/=/, 'delimiter'],\n            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.text/css', nextEmbedded: 'text/css' }],\n            [/[ \\t\\r\\n]+/],\n            [/(<\\/)(style\\s*)(>)/, ['delimiter.html', 'tag.html', { token: 'delimiter.html', next: '@pop' }]]\n        ],\n        // After <style ... type\n        styleAfterType: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.styleAfterType' }],\n            [/=/, 'delimiter', '@styleAfterTypeEquals'],\n            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.text/css', nextEmbedded: 'text/css' }],\n            [/[ \\t\\r\\n]+/],\n            [/<\\/style\\s*>/, { token: '@rematch', next: '@pop' }]\n        ],\n        // After <style ... type =\n        styleAfterTypeEquals: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.styleAfterTypeEquals' }],\n            [/\"([^\"]*)\"/, { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' }],\n            [/'([^']*)'/, { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' }],\n            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.text/css', nextEmbedded: 'text/css' }],\n            [/[ \\t\\r\\n]+/],\n            [/<\\/style\\s*>/, { token: '@rematch', next: '@pop' }]\n        ],\n        // After <style ... type = $S2\n        styleWithCustomType: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.styleWithCustomType.$S2' }],\n            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.$S2', nextEmbedded: '$S2' }],\n            [/\"([^\"]*)\"/, 'attribute.value'],\n            [/'([^']*)'/, 'attribute.value'],\n            [/[\\w\\-]+/, 'attribute.name'],\n            [/=/, 'delimiter'],\n            [/[ \\t\\r\\n]+/],\n            [/<\\/style\\s*>/, { token: '@rematch', next: '@pop' }]\n        ],\n        styleEmbedded: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInEmbeddedState.styleEmbedded.$S2', nextEmbedded: '@pop' }],\n            [/<\\/style/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }]\n        ],\n        // -- END <style> tags handling\n        razorInSimpleState: [\n            [/@\\*/, 'comment.cs', '@razorBlockCommentTopLevel'],\n            [/@[{(]/, 'metatag.cs', '@razorRootTopLevel'],\n            [/(@)(\\s*[\\w]+)/, ['metatag.cs', { token: 'identifier.cs', switchTo: '@$S2.$S3' }]],\n            [/[})]/, { token: 'metatag.cs', switchTo: '@$S2.$S3' }],\n            [/\\*@/, { token: 'comment.cs', switchTo: '@$S2.$S3' }],\n        ],\n        razorInEmbeddedState: [\n            [/@\\*/, 'comment.cs', '@razorBlockCommentTopLevel'],\n            [/@[{(]/, 'metatag.cs', '@razorRootTopLevel'],\n            [/(@)(\\s*[\\w]+)/, ['metatag.cs', { token: 'identifier.cs', switchTo: '@$S2.$S3', nextEmbedded: '$S3' }]],\n            [/[})]/, { token: 'metatag.cs', switchTo: '@$S2.$S3', nextEmbedded: '$S3' }],\n            [/\\*@/, { token: 'comment.cs', switchTo: '@$S2.$S3', nextEmbedded: '$S3' }],\n        ],\n        razorBlockCommentTopLevel: [\n            [/\\*@/, '@rematch', '@pop'],\n            [/[^*]+/, 'comment.cs'],\n            [/./, 'comment.cs']\n        ],\n        razorBlockComment: [\n            [/\\*@/, 'comment.cs', '@pop'],\n            [/[^*]+/, 'comment.cs'],\n            [/./, 'comment.cs']\n        ],\n        razorRootTopLevel: [\n            [/\\{/, 'delimiter.bracket.cs', '@razorRoot'],\n            [/\\(/, 'delimiter.parenthesis.cs', '@razorRoot'],\n            [/[})]/, '@rematch', '@pop'],\n            { include: 'razorCommon' }\n        ],\n        razorRoot: [\n            [/\\{/, 'delimiter.bracket.cs', '@razorRoot'],\n            [/\\(/, 'delimiter.parenthesis.cs', '@razorRoot'],\n            [/\\}/, 'delimiter.bracket.cs', '@pop'],\n            [/\\)/, 'delimiter.parenthesis.cs', '@pop'],\n            { include: 'razorCommon' }\n        ],\n        razorCommon: [\n            [/[a-zA-Z_]\\w*/, {\n                    cases: {\n                        '@razorKeywords': { token: 'keyword.cs' },\n                        '@default': 'identifier.cs'\n                    }\n                }],\n            // brackets\n            [/[\\[\\]]/, 'delimiter.array.cs'],\n            // whitespace\n            [/[ \\t\\r\\n]+/],\n            // comments\n            [/\\/\\/.*$/, 'comment.cs'],\n            [/@\\*/, 'comment.cs', '@razorBlockComment'],\n            // strings\n            [/\"([^\"]*)\"/, 'string.cs'],\n            [/'([^']*)'/, 'string.cs'],\n            // simple html\n            [/(<)(\\w+)(\\/>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],\n            [/(<)(\\w+)(>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],\n            [/(<\\/)(\\w+)(>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],\n            // delimiters\n            [/[\\+\\-\\*\\%\\&\\|\\^\\~\\!\\=\\<\\>\\/\\?\\;\\:\\.\\,]/, 'delimiter.cs'],\n            // numbers\n            [/\\d*\\d+[eE]([\\-+]?\\d+)?/, 'number.float.cs'],\n            [/\\d*\\.\\d+([eE][\\-+]?\\d+)?/, 'number.float.cs'],\n            [/0[xX][0-9a-fA-F']*[0-9a-fA-F]/, 'number.hex.cs'],\n            [/0[0-7']*[0-7]/, 'number.octal.cs'],\n            [/0[bB][0-1']*[0-1]/, 'number.binary.cs'],\n            [/\\d[\\d']*/, 'number.cs'],\n            [/\\d/, 'number.cs'],\n        ]\n    },\n    razorKeywords: [\n        'abstract', 'as', 'async', 'await', 'base', 'bool',\n        'break', 'by', 'byte', 'case',\n        'catch', 'char', 'checked', 'class',\n        'const', 'continue', 'decimal', 'default',\n        'delegate', 'do', 'double', 'descending',\n        'explicit', 'event', 'extern', 'else',\n        'enum', 'false', 'finally', 'fixed',\n        'float', 'for', 'foreach', 'from',\n        'goto', 'group', 'if', 'implicit',\n        'in', 'int', 'interface', 'internal',\n        'into', 'is', 'lock', 'long', 'nameof',\n        'new', 'null', 'namespace', 'object',\n        'operator', 'out', 'override', 'orderby',\n        'params', 'private', 'protected', 'public',\n        'readonly', 'ref', 'return', 'switch',\n        'struct', 'sbyte', 'sealed', 'short',\n        'sizeof', 'stackalloc', 'static', 'string',\n        'select', 'this', 'throw', 'true',\n        'try', 'typeof', 'uint', 'ulong',\n        'unchecked', 'unsafe', 'ushort', 'using',\n        'var', 'virtual', 'volatile', 'void', 'when',\n        'while', 'where', 'yield',\n        'model', 'inject' // Razor specific\n    ],\n    escapes: /\\\\(?:[abfnrtv\\\\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3Jhem9yL3Jhem9yLmpzLmpzIiwic291cmNlcyI6WyIvaG9tZS9ub2RlL3dlYnZpei9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3Jhem9yL3Jhem9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuLy8gQWxsb3cgZm9yIHJ1bm5pbmcgdW5kZXIgbm9kZWpzL3JlcXVpcmVqcyBpbiB0ZXN0c1xudmFyIF9tb25hY28gPSAodHlwZW9mIG1vbmFjbyA9PT0gJ3VuZGVmaW5lZCcgPyBzZWxmLm1vbmFjbyA6IG1vbmFjbyk7XG52YXIgRU1QVFlfRUxFTUVOVFMgPSBbJ2FyZWEnLCAnYmFzZScsICdicicsICdjb2wnLCAnZW1iZWQnLCAnaHInLCAnaW1nJywgJ2lucHV0JywgJ2tleWdlbicsICdsaW5rJywgJ21lbnVpdGVtJywgJ21ldGEnLCAncGFyYW0nLCAnc291cmNlJywgJ3RyYWNrJywgJ3diciddO1xuZXhwb3J0IHZhciBjb25mID0ge1xuICAgIHdvcmRQYXR0ZXJuOiAvKC0/XFxkKlxcLlxcZFxcdyopfChbXlxcYFxcflxcIVxcQFxcJFxcXlxcJlxcKlxcKFxcKVxcLVxcPVxcK1xcW1xce1xcXVxcfVxcXFxcXHxcXDtcXDpcXCdcXFwiXFwsXFwuXFw8XFw+XFwvXFxzXSspL2csXG4gICAgY29tbWVudHM6IHtcbiAgICAgICAgYmxvY2tDb21tZW50OiBbJzwhLS0nLCAnLS0+J11cbiAgICB9LFxuICAgIGJyYWNrZXRzOiBbXG4gICAgICAgIFsnPCEtLScsICctLT4nXSxcbiAgICAgICAgWyc8JywgJz4nXSxcbiAgICAgICAgWyd7JywgJ30nXSxcbiAgICAgICAgWycoJywgJyknXVxuICAgIF0sXG4gICAgYXV0b0Nsb3NpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJyB9XG4gICAgXSxcbiAgICBzdXJyb3VuZGluZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicgfSxcbiAgICAgICAgeyBvcGVuOiAnXFwnJywgY2xvc2U6ICdcXCcnIH0sXG4gICAgICAgIHsgb3BlbjogJzwnLCBjbG9zZTogJz4nIH1cbiAgICBdLFxuICAgIG9uRW50ZXJSdWxlczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBiZWZvcmVUZXh0OiBuZXcgUmVnRXhwKFwiPCg/ISg/OlwiICsgRU1QVFlfRUxFTUVOVFMuam9pbignfCcpICsgXCIpKShcXFxcd1tcXFxcd1xcXFxkXSopKFteLz5dKig/IS8pPilbXjxdKiRcIiwgJ2knKSxcbiAgICAgICAgICAgIGFmdGVyVGV4dDogL148XFwvKFxcd1tcXHdcXGRdKilcXHMqPiQvaSxcbiAgICAgICAgICAgIGFjdGlvbjogeyBpbmRlbnRBY3Rpb246IF9tb25hY28ubGFuZ3VhZ2VzLkluZGVudEFjdGlvbi5JbmRlbnRPdXRkZW50IH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYmVmb3JlVGV4dDogbmV3IFJlZ0V4cChcIjwoPyEoPzpcIiArIEVNUFRZX0VMRU1FTlRTLmpvaW4oJ3wnKSArIFwiKSkoXFxcXHdbXFxcXHdcXFxcZF0qKShbXi8+XSooPyEvKT4pW148XSokXCIsICdpJyksXG4gICAgICAgICAgICBhY3Rpb246IHsgaW5kZW50QWN0aW9uOiBfbW9uYWNvLmxhbmd1YWdlcy5JbmRlbnRBY3Rpb24uSW5kZW50IH1cbiAgICAgICAgfVxuICAgIF0sXG59O1xuZXhwb3J0IHZhciBsYW5ndWFnZSA9IHtcbiAgICBkZWZhdWx0VG9rZW46ICcnLFxuICAgIHRva2VuUG9zdGZpeDogJycsXG4gICAgLy8gaWdub3JlQ2FzZTogdHJ1ZSxcbiAgICAvLyBUaGUgbWFpbiB0b2tlbml6ZXIgZm9yIG91ciBsYW5ndWFnZXNcbiAgICB0b2tlbml6ZXI6IHtcbiAgICAgICAgcm9vdDogW1xuICAgICAgICAgICAgWy9AQC9dLFxuICAgICAgICAgICAgWy9AW15AXS8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIHN3aXRjaFRvOiAnQHJhem9ySW5TaW1wbGVTdGF0ZS5yb290JyB9XSxcbiAgICAgICAgICAgIFsvPCFET0NUWVBFLywgJ21ldGF0YWcuaHRtbCcsICdAZG9jdHlwZSddLFxuICAgICAgICAgICAgWy88IS0tLywgJ2NvbW1lbnQuaHRtbCcsICdAY29tbWVudCddLFxuICAgICAgICAgICAgWy8oPCkoXFx3KykoXFwvPikvLCBbJ2RlbGltaXRlci5odG1sJywgJ3RhZy5odG1sJywgJ2RlbGltaXRlci5odG1sJ11dLFxuICAgICAgICAgICAgWy8oPCkoc2NyaXB0KS8sIFsnZGVsaW1pdGVyLmh0bWwnLCB7IHRva2VuOiAndGFnLmh0bWwnLCBuZXh0OiAnQHNjcmlwdCcgfV1dLFxuICAgICAgICAgICAgWy8oPCkoc3R5bGUpLywgWydkZWxpbWl0ZXIuaHRtbCcsIHsgdG9rZW46ICd0YWcuaHRtbCcsIG5leHQ6ICdAc3R5bGUnIH1dXSxcbiAgICAgICAgICAgIFsvKDwpKFs6XFx3XSspLywgWydkZWxpbWl0ZXIuaHRtbCcsIHsgdG9rZW46ICd0YWcuaHRtbCcsIG5leHQ6ICdAb3RoZXJUYWcnIH1dXSxcbiAgICAgICAgICAgIFsvKDxcXC8pKFxcdyspLywgWydkZWxpbWl0ZXIuaHRtbCcsIHsgdG9rZW46ICd0YWcuaHRtbCcsIG5leHQ6ICdAb3RoZXJUYWcnIH1dXSxcbiAgICAgICAgICAgIFsvPC8sICdkZWxpbWl0ZXIuaHRtbCddLFxuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rL10sXG4gICAgICAgICAgICBbL1tePEBdKy9dLFxuICAgICAgICBdLFxuICAgICAgICBkb2N0eXBlOiBbXG4gICAgICAgICAgICBbL0BbXkBdLywgeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcmF6b3JJblNpbXBsZVN0YXRlLmNvbW1lbnQnIH1dLFxuICAgICAgICAgICAgWy9bXj5dKy8sICdtZXRhdGFnLmNvbnRlbnQuaHRtbCddLFxuICAgICAgICAgICAgWy8+LywgJ21ldGF0YWcuaHRtbCcsICdAcG9wJ10sXG4gICAgICAgIF0sXG4gICAgICAgIGNvbW1lbnQ6IFtcbiAgICAgICAgICAgIFsvQFteQF0vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0ByYXpvckluU2ltcGxlU3RhdGUuY29tbWVudCcgfV0sXG4gICAgICAgICAgICBbLy0tPi8sICdjb21tZW50Lmh0bWwnLCAnQHBvcCddLFxuICAgICAgICAgICAgWy9bXi1dKy8sICdjb21tZW50LmNvbnRlbnQuaHRtbCddLFxuICAgICAgICAgICAgWy8uLywgJ2NvbW1lbnQuY29udGVudC5odG1sJ11cbiAgICAgICAgXSxcbiAgICAgICAgb3RoZXJUYWc6IFtcbiAgICAgICAgICAgIFsvQFteQF0vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0ByYXpvckluU2ltcGxlU3RhdGUub3RoZXJUYWcnIH1dLFxuICAgICAgICAgICAgWy9cXC8/Pi8sICdkZWxpbWl0ZXIuaHRtbCcsICdAcG9wJ10sXG4gICAgICAgICAgICBbL1wiKFteXCJdKilcIi8sICdhdHRyaWJ1dGUudmFsdWUnXSxcbiAgICAgICAgICAgIFsvJyhbXiddKiknLywgJ2F0dHJpYnV0ZS52YWx1ZSddLFxuICAgICAgICAgICAgWy9bXFx3XFwtXSsvLCAnYXR0cmlidXRlLm5hbWUnXSxcbiAgICAgICAgICAgIFsvPS8sICdkZWxpbWl0ZXInXSxcbiAgICAgICAgICAgIFsvWyBcXHRcXHJcXG5dKy9dLFxuICAgICAgICBdLFxuICAgICAgICAvLyAtLSBCRUdJTiA8c2NyaXB0PiB0YWdzIGhhbmRsaW5nXG4gICAgICAgIC8vIEFmdGVyIDxzY3JpcHRcbiAgICAgICAgc2NyaXB0OiBbXG4gICAgICAgICAgICBbL0BbXkBdLywgeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcmF6b3JJblNpbXBsZVN0YXRlLnNjcmlwdCcgfV0sXG4gICAgICAgICAgICBbL3R5cGUvLCAnYXR0cmlidXRlLm5hbWUnLCAnQHNjcmlwdEFmdGVyVHlwZSddLFxuICAgICAgICAgICAgWy9cIihbXlwiXSopXCIvLCAnYXR0cmlidXRlLnZhbHVlJ10sXG4gICAgICAgICAgICBbLycoW14nXSopJy8sICdhdHRyaWJ1dGUudmFsdWUnXSxcbiAgICAgICAgICAgIFsvW1xcd1xcLV0rLywgJ2F0dHJpYnV0ZS5uYW1lJ10sXG4gICAgICAgICAgICBbLz0vLCAnZGVsaW1pdGVyJ10sXG4gICAgICAgICAgICBbLz4vLCB7IHRva2VuOiAnZGVsaW1pdGVyLmh0bWwnLCBuZXh0OiAnQHNjcmlwdEVtYmVkZGVkLnRleHQvamF2YXNjcmlwdCcsIG5leHRFbWJlZGRlZDogJ3RleHQvamF2YXNjcmlwdCcgfV0sXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvXSxcbiAgICAgICAgICAgIFsvKDxcXC8pKHNjcmlwdFxccyopKD4pLywgWydkZWxpbWl0ZXIuaHRtbCcsICd0YWcuaHRtbCcsIHsgdG9rZW46ICdkZWxpbWl0ZXIuaHRtbCcsIG5leHQ6ICdAcG9wJyB9XV1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gQWZ0ZXIgPHNjcmlwdCAuLi4gdHlwZVxuICAgICAgICBzY3JpcHRBZnRlclR5cGU6IFtcbiAgICAgICAgICAgIFsvQFteQF0vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0ByYXpvckluU2ltcGxlU3RhdGUuc2NyaXB0QWZ0ZXJUeXBlJyB9XSxcbiAgICAgICAgICAgIFsvPS8sICdkZWxpbWl0ZXInLCAnQHNjcmlwdEFmdGVyVHlwZUVxdWFscyddLFxuICAgICAgICAgICAgWy8+LywgeyB0b2tlbjogJ2RlbGltaXRlci5odG1sJywgbmV4dDogJ0BzY3JpcHRFbWJlZGRlZC50ZXh0L2phdmFzY3JpcHQnLCBuZXh0RW1iZWRkZWQ6ICd0ZXh0L2phdmFzY3JpcHQnIH1dLFxuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rL10sXG4gICAgICAgICAgICBbLzxcXC9zY3JpcHRcXHMqPi8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIG5leHQ6ICdAcG9wJyB9XVxuICAgICAgICBdLFxuICAgICAgICAvLyBBZnRlciA8c2NyaXB0IC4uLiB0eXBlID1cbiAgICAgICAgc2NyaXB0QWZ0ZXJUeXBlRXF1YWxzOiBbXG4gICAgICAgICAgICBbL0BbXkBdLywgeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcmF6b3JJblNpbXBsZVN0YXRlLnNjcmlwdEFmdGVyVHlwZUVxdWFscycgfV0sXG4gICAgICAgICAgICBbL1wiKFteXCJdKilcIi8sIHsgdG9rZW46ICdhdHRyaWJ1dGUudmFsdWUnLCBzd2l0Y2hUbzogJ0BzY3JpcHRXaXRoQ3VzdG9tVHlwZS4kMScgfV0sXG4gICAgICAgICAgICBbLycoW14nXSopJy8sIHsgdG9rZW46ICdhdHRyaWJ1dGUudmFsdWUnLCBzd2l0Y2hUbzogJ0BzY3JpcHRXaXRoQ3VzdG9tVHlwZS4kMScgfV0sXG4gICAgICAgICAgICBbLz4vLCB7IHRva2VuOiAnZGVsaW1pdGVyLmh0bWwnLCBuZXh0OiAnQHNjcmlwdEVtYmVkZGVkLnRleHQvamF2YXNjcmlwdCcsIG5leHRFbWJlZGRlZDogJ3RleHQvamF2YXNjcmlwdCcgfV0sXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvXSxcbiAgICAgICAgICAgIFsvPFxcL3NjcmlwdFxccyo+LywgeyB0b2tlbjogJ0ByZW1hdGNoJywgbmV4dDogJ0Bwb3AnIH1dXG4gICAgICAgIF0sXG4gICAgICAgIC8vIEFmdGVyIDxzY3JpcHQgLi4uIHR5cGUgPSAkUzJcbiAgICAgICAgc2NyaXB0V2l0aEN1c3RvbVR5cGU6IFtcbiAgICAgICAgICAgIFsvQFteQF0vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0ByYXpvckluU2ltcGxlU3RhdGUuc2NyaXB0V2l0aEN1c3RvbVR5cGUuJFMyJyB9XSxcbiAgICAgICAgICAgIFsvPi8sIHsgdG9rZW46ICdkZWxpbWl0ZXIuaHRtbCcsIG5leHQ6ICdAc2NyaXB0RW1iZWRkZWQuJFMyJywgbmV4dEVtYmVkZGVkOiAnJFMyJyB9XSxcbiAgICAgICAgICAgIFsvXCIoW15cIl0qKVwiLywgJ2F0dHJpYnV0ZS52YWx1ZSddLFxuICAgICAgICAgICAgWy8nKFteJ10qKScvLCAnYXR0cmlidXRlLnZhbHVlJ10sXG4gICAgICAgICAgICBbL1tcXHdcXC1dKy8sICdhdHRyaWJ1dGUubmFtZSddLFxuICAgICAgICAgICAgWy89LywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rL10sXG4gICAgICAgICAgICBbLzxcXC9zY3JpcHRcXHMqPi8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIG5leHQ6ICdAcG9wJyB9XVxuICAgICAgICBdLFxuICAgICAgICBzY3JpcHRFbWJlZGRlZDogW1xuICAgICAgICAgICAgWy9AW15AXS8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIHN3aXRjaFRvOiAnQHJhem9ySW5FbWJlZGRlZFN0YXRlLnNjcmlwdEVtYmVkZGVkLiRTMicsIG5leHRFbWJlZGRlZDogJ0Bwb3AnIH1dLFxuICAgICAgICAgICAgWy88XFwvc2NyaXB0LywgeyB0b2tlbjogJ0ByZW1hdGNoJywgbmV4dDogJ0Bwb3AnLCBuZXh0RW1iZWRkZWQ6ICdAcG9wJyB9XVxuICAgICAgICBdLFxuICAgICAgICAvLyAtLSBFTkQgPHNjcmlwdD4gdGFncyBoYW5kbGluZ1xuICAgICAgICAvLyAtLSBCRUdJTiA8c3R5bGU+IHRhZ3MgaGFuZGxpbmdcbiAgICAgICAgLy8gQWZ0ZXIgPHN0eWxlXG4gICAgICAgIHN0eWxlOiBbXG4gICAgICAgICAgICBbL0BbXkBdLywgeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcmF6b3JJblNpbXBsZVN0YXRlLnN0eWxlJyB9XSxcbiAgICAgICAgICAgIFsvdHlwZS8sICdhdHRyaWJ1dGUubmFtZScsICdAc3R5bGVBZnRlclR5cGUnXSxcbiAgICAgICAgICAgIFsvXCIoW15cIl0qKVwiLywgJ2F0dHJpYnV0ZS52YWx1ZSddLFxuICAgICAgICAgICAgWy8nKFteJ10qKScvLCAnYXR0cmlidXRlLnZhbHVlJ10sXG4gICAgICAgICAgICBbL1tcXHdcXC1dKy8sICdhdHRyaWJ1dGUubmFtZSddLFxuICAgICAgICAgICAgWy89LywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgWy8+LywgeyB0b2tlbjogJ2RlbGltaXRlci5odG1sJywgbmV4dDogJ0BzdHlsZUVtYmVkZGVkLnRleHQvY3NzJywgbmV4dEVtYmVkZGVkOiAndGV4dC9jc3MnIH1dLFxuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rL10sXG4gICAgICAgICAgICBbLyg8XFwvKShzdHlsZVxccyopKD4pLywgWydkZWxpbWl0ZXIuaHRtbCcsICd0YWcuaHRtbCcsIHsgdG9rZW46ICdkZWxpbWl0ZXIuaHRtbCcsIG5leHQ6ICdAcG9wJyB9XV1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gQWZ0ZXIgPHN0eWxlIC4uLiB0eXBlXG4gICAgICAgIHN0eWxlQWZ0ZXJUeXBlOiBbXG4gICAgICAgICAgICBbL0BbXkBdLywgeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcmF6b3JJblNpbXBsZVN0YXRlLnN0eWxlQWZ0ZXJUeXBlJyB9XSxcbiAgICAgICAgICAgIFsvPS8sICdkZWxpbWl0ZXInLCAnQHN0eWxlQWZ0ZXJUeXBlRXF1YWxzJ10sXG4gICAgICAgICAgICBbLz4vLCB7IHRva2VuOiAnZGVsaW1pdGVyLmh0bWwnLCBuZXh0OiAnQHN0eWxlRW1iZWRkZWQudGV4dC9jc3MnLCBuZXh0RW1iZWRkZWQ6ICd0ZXh0L2NzcycgfV0sXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvXSxcbiAgICAgICAgICAgIFsvPFxcL3N0eWxlXFxzKj4vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBuZXh0OiAnQHBvcCcgfV1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gQWZ0ZXIgPHN0eWxlIC4uLiB0eXBlID1cbiAgICAgICAgc3R5bGVBZnRlclR5cGVFcXVhbHM6IFtcbiAgICAgICAgICAgIFsvQFteQF0vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0ByYXpvckluU2ltcGxlU3RhdGUuc3R5bGVBZnRlclR5cGVFcXVhbHMnIH1dLFxuICAgICAgICAgICAgWy9cIihbXlwiXSopXCIvLCB7IHRva2VuOiAnYXR0cmlidXRlLnZhbHVlJywgc3dpdGNoVG86ICdAc3R5bGVXaXRoQ3VzdG9tVHlwZS4kMScgfV0sXG4gICAgICAgICAgICBbLycoW14nXSopJy8sIHsgdG9rZW46ICdhdHRyaWJ1dGUudmFsdWUnLCBzd2l0Y2hUbzogJ0BzdHlsZVdpdGhDdXN0b21UeXBlLiQxJyB9XSxcbiAgICAgICAgICAgIFsvPi8sIHsgdG9rZW46ICdkZWxpbWl0ZXIuaHRtbCcsIG5leHQ6ICdAc3R5bGVFbWJlZGRlZC50ZXh0L2NzcycsIG5leHRFbWJlZGRlZDogJ3RleHQvY3NzJyB9XSxcbiAgICAgICAgICAgIFsvWyBcXHRcXHJcXG5dKy9dLFxuICAgICAgICAgICAgWy88XFwvc3R5bGVcXHMqPi8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIG5leHQ6ICdAcG9wJyB9XVxuICAgICAgICBdLFxuICAgICAgICAvLyBBZnRlciA8c3R5bGUgLi4uIHR5cGUgPSAkUzJcbiAgICAgICAgc3R5bGVXaXRoQ3VzdG9tVHlwZTogW1xuICAgICAgICAgICAgWy9AW15AXS8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIHN3aXRjaFRvOiAnQHJhem9ySW5TaW1wbGVTdGF0ZS5zdHlsZVdpdGhDdXN0b21UeXBlLiRTMicgfV0sXG4gICAgICAgICAgICBbLz4vLCB7IHRva2VuOiAnZGVsaW1pdGVyLmh0bWwnLCBuZXh0OiAnQHN0eWxlRW1iZWRkZWQuJFMyJywgbmV4dEVtYmVkZGVkOiAnJFMyJyB9XSxcbiAgICAgICAgICAgIFsvXCIoW15cIl0qKVwiLywgJ2F0dHJpYnV0ZS52YWx1ZSddLFxuICAgICAgICAgICAgWy8nKFteJ10qKScvLCAnYXR0cmlidXRlLnZhbHVlJ10sXG4gICAgICAgICAgICBbL1tcXHdcXC1dKy8sICdhdHRyaWJ1dGUubmFtZSddLFxuICAgICAgICAgICAgWy89LywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rL10sXG4gICAgICAgICAgICBbLzxcXC9zdHlsZVxccyo+LywgeyB0b2tlbjogJ0ByZW1hdGNoJywgbmV4dDogJ0Bwb3AnIH1dXG4gICAgICAgIF0sXG4gICAgICAgIHN0eWxlRW1iZWRkZWQ6IFtcbiAgICAgICAgICAgIFsvQFteQF0vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0ByYXpvckluRW1iZWRkZWRTdGF0ZS5zdHlsZUVtYmVkZGVkLiRTMicsIG5leHRFbWJlZGRlZDogJ0Bwb3AnIH1dLFxuICAgICAgICAgICAgWy88XFwvc3R5bGUvLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBuZXh0OiAnQHBvcCcsIG5leHRFbWJlZGRlZDogJ0Bwb3AnIH1dXG4gICAgICAgIF0sXG4gICAgICAgIC8vIC0tIEVORCA8c3R5bGU+IHRhZ3MgaGFuZGxpbmdcbiAgICAgICAgcmF6b3JJblNpbXBsZVN0YXRlOiBbXG4gICAgICAgICAgICBbL0BcXCovLCAnY29tbWVudC5jcycsICdAcmF6b3JCbG9ja0NvbW1lbnRUb3BMZXZlbCddLFxuICAgICAgICAgICAgWy9AW3soXS8sICdtZXRhdGFnLmNzJywgJ0ByYXpvclJvb3RUb3BMZXZlbCddLFxuICAgICAgICAgICAgWy8oQCkoXFxzKltcXHddKykvLCBbJ21ldGF0YWcuY3MnLCB7IHRva2VuOiAnaWRlbnRpZmllci5jcycsIHN3aXRjaFRvOiAnQCRTMi4kUzMnIH1dXSxcbiAgICAgICAgICAgIFsvW30pXS8sIHsgdG9rZW46ICdtZXRhdGFnLmNzJywgc3dpdGNoVG86ICdAJFMyLiRTMycgfV0sXG4gICAgICAgICAgICBbL1xcKkAvLCB7IHRva2VuOiAnY29tbWVudC5jcycsIHN3aXRjaFRvOiAnQCRTMi4kUzMnIH1dLFxuICAgICAgICBdLFxuICAgICAgICByYXpvckluRW1iZWRkZWRTdGF0ZTogW1xuICAgICAgICAgICAgWy9AXFwqLywgJ2NvbW1lbnQuY3MnLCAnQHJhem9yQmxvY2tDb21tZW50VG9wTGV2ZWwnXSxcbiAgICAgICAgICAgIFsvQFt7KF0vLCAnbWV0YXRhZy5jcycsICdAcmF6b3JSb290VG9wTGV2ZWwnXSxcbiAgICAgICAgICAgIFsvKEApKFxccypbXFx3XSspLywgWydtZXRhdGFnLmNzJywgeyB0b2tlbjogJ2lkZW50aWZpZXIuY3MnLCBzd2l0Y2hUbzogJ0AkUzIuJFMzJywgbmV4dEVtYmVkZGVkOiAnJFMzJyB9XV0sXG4gICAgICAgICAgICBbL1t9KV0vLCB7IHRva2VuOiAnbWV0YXRhZy5jcycsIHN3aXRjaFRvOiAnQCRTMi4kUzMnLCBuZXh0RW1iZWRkZWQ6ICckUzMnIH1dLFxuICAgICAgICAgICAgWy9cXCpALywgeyB0b2tlbjogJ2NvbW1lbnQuY3MnLCBzd2l0Y2hUbzogJ0AkUzIuJFMzJywgbmV4dEVtYmVkZGVkOiAnJFMzJyB9XSxcbiAgICAgICAgXSxcbiAgICAgICAgcmF6b3JCbG9ja0NvbW1lbnRUb3BMZXZlbDogW1xuICAgICAgICAgICAgWy9cXCpALywgJ0ByZW1hdGNoJywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvW14qXSsvLCAnY29tbWVudC5jcyddLFxuICAgICAgICAgICAgWy8uLywgJ2NvbW1lbnQuY3MnXVxuICAgICAgICBdLFxuICAgICAgICByYXpvckJsb2NrQ29tbWVudDogW1xuICAgICAgICAgICAgWy9cXCpALywgJ2NvbW1lbnQuY3MnLCAnQHBvcCddLFxuICAgICAgICAgICAgWy9bXipdKy8sICdjb21tZW50LmNzJ10sXG4gICAgICAgICAgICBbLy4vLCAnY29tbWVudC5jcyddXG4gICAgICAgIF0sXG4gICAgICAgIHJhem9yUm9vdFRvcExldmVsOiBbXG4gICAgICAgICAgICBbL1xcey8sICdkZWxpbWl0ZXIuYnJhY2tldC5jcycsICdAcmF6b3JSb290J10sXG4gICAgICAgICAgICBbL1xcKC8sICdkZWxpbWl0ZXIucGFyZW50aGVzaXMuY3MnLCAnQHJhem9yUm9vdCddLFxuICAgICAgICAgICAgWy9bfSldLywgJ0ByZW1hdGNoJywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ3Jhem9yQ29tbW9uJyB9XG4gICAgICAgIF0sXG4gICAgICAgIHJhem9yUm9vdDogW1xuICAgICAgICAgICAgWy9cXHsvLCAnZGVsaW1pdGVyLmJyYWNrZXQuY3MnLCAnQHJhem9yUm9vdCddLFxuICAgICAgICAgICAgWy9cXCgvLCAnZGVsaW1pdGVyLnBhcmVudGhlc2lzLmNzJywgJ0ByYXpvclJvb3QnXSxcbiAgICAgICAgICAgIFsvXFx9LywgJ2RlbGltaXRlci5icmFja2V0LmNzJywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvXFwpLywgJ2RlbGltaXRlci5wYXJlbnRoZXNpcy5jcycsICdAcG9wJ10sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdyYXpvckNvbW1vbicgfVxuICAgICAgICBdLFxuICAgICAgICByYXpvckNvbW1vbjogW1xuICAgICAgICAgICAgWy9bYS16QS1aX11cXHcqLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0ByYXpvcktleXdvcmRzJzogeyB0b2tlbjogJ2tleXdvcmQuY3MnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnaWRlbnRpZmllci5jcydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgLy8gYnJhY2tldHNcbiAgICAgICAgICAgIFsvW1xcW1xcXV0vLCAnZGVsaW1pdGVyLmFycmF5LmNzJ10sXG4gICAgICAgICAgICAvLyB3aGl0ZXNwYWNlXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvXSxcbiAgICAgICAgICAgIC8vIGNvbW1lbnRzXG4gICAgICAgICAgICBbL1xcL1xcLy4qJC8sICdjb21tZW50LmNzJ10sXG4gICAgICAgICAgICBbL0BcXCovLCAnY29tbWVudC5jcycsICdAcmF6b3JCbG9ja0NvbW1lbnQnXSxcbiAgICAgICAgICAgIC8vIHN0cmluZ3NcbiAgICAgICAgICAgIFsvXCIoW15cIl0qKVwiLywgJ3N0cmluZy5jcyddLFxuICAgICAgICAgICAgWy8nKFteJ10qKScvLCAnc3RyaW5nLmNzJ10sXG4gICAgICAgICAgICAvLyBzaW1wbGUgaHRtbFxuICAgICAgICAgICAgWy8oPCkoXFx3KykoXFwvPikvLCBbJ2RlbGltaXRlci5odG1sJywgJ3RhZy5odG1sJywgJ2RlbGltaXRlci5odG1sJ11dLFxuICAgICAgICAgICAgWy8oPCkoXFx3KykoPikvLCBbJ2RlbGltaXRlci5odG1sJywgJ3RhZy5odG1sJywgJ2RlbGltaXRlci5odG1sJ11dLFxuICAgICAgICAgICAgWy8oPFxcLykoXFx3KykoPikvLCBbJ2RlbGltaXRlci5odG1sJywgJ3RhZy5odG1sJywgJ2RlbGltaXRlci5odG1sJ11dLFxuICAgICAgICAgICAgLy8gZGVsaW1pdGVyc1xuICAgICAgICAgICAgWy9bXFwrXFwtXFwqXFwlXFwmXFx8XFxeXFx+XFwhXFw9XFw8XFw+XFwvXFw/XFw7XFw6XFwuXFwsXS8sICdkZWxpbWl0ZXIuY3MnXSxcbiAgICAgICAgICAgIC8vIG51bWJlcnNcbiAgICAgICAgICAgIFsvXFxkKlxcZCtbZUVdKFtcXC0rXT9cXGQrKT8vLCAnbnVtYmVyLmZsb2F0LmNzJ10sXG4gICAgICAgICAgICBbL1xcZCpcXC5cXGQrKFtlRV1bXFwtK10/XFxkKyk/LywgJ251bWJlci5mbG9hdC5jcyddLFxuICAgICAgICAgICAgWy8wW3hYXVswLTlhLWZBLUYnXSpbMC05YS1mQS1GXS8sICdudW1iZXIuaGV4LmNzJ10sXG4gICAgICAgICAgICBbLzBbMC03J10qWzAtN10vLCAnbnVtYmVyLm9jdGFsLmNzJ10sXG4gICAgICAgICAgICBbLzBbYkJdWzAtMSddKlswLTFdLywgJ251bWJlci5iaW5hcnkuY3MnXSxcbiAgICAgICAgICAgIFsvXFxkW1xcZCddKi8sICdudW1iZXIuY3MnXSxcbiAgICAgICAgICAgIFsvXFxkLywgJ251bWJlci5jcyddLFxuICAgICAgICBdXG4gICAgfSxcbiAgICByYXpvcktleXdvcmRzOiBbXG4gICAgICAgICdhYnN0cmFjdCcsICdhcycsICdhc3luYycsICdhd2FpdCcsICdiYXNlJywgJ2Jvb2wnLFxuICAgICAgICAnYnJlYWsnLCAnYnknLCAnYnl0ZScsICdjYXNlJyxcbiAgICAgICAgJ2NhdGNoJywgJ2NoYXInLCAnY2hlY2tlZCcsICdjbGFzcycsXG4gICAgICAgICdjb25zdCcsICdjb250aW51ZScsICdkZWNpbWFsJywgJ2RlZmF1bHQnLFxuICAgICAgICAnZGVsZWdhdGUnLCAnZG8nLCAnZG91YmxlJywgJ2Rlc2NlbmRpbmcnLFxuICAgICAgICAnZXhwbGljaXQnLCAnZXZlbnQnLCAnZXh0ZXJuJywgJ2Vsc2UnLFxuICAgICAgICAnZW51bScsICdmYWxzZScsICdmaW5hbGx5JywgJ2ZpeGVkJyxcbiAgICAgICAgJ2Zsb2F0JywgJ2ZvcicsICdmb3JlYWNoJywgJ2Zyb20nLFxuICAgICAgICAnZ290bycsICdncm91cCcsICdpZicsICdpbXBsaWNpdCcsXG4gICAgICAgICdpbicsICdpbnQnLCAnaW50ZXJmYWNlJywgJ2ludGVybmFsJyxcbiAgICAgICAgJ2ludG8nLCAnaXMnLCAnbG9jaycsICdsb25nJywgJ25hbWVvZicsXG4gICAgICAgICduZXcnLCAnbnVsbCcsICduYW1lc3BhY2UnLCAnb2JqZWN0JyxcbiAgICAgICAgJ29wZXJhdG9yJywgJ291dCcsICdvdmVycmlkZScsICdvcmRlcmJ5JyxcbiAgICAgICAgJ3BhcmFtcycsICdwcml2YXRlJywgJ3Byb3RlY3RlZCcsICdwdWJsaWMnLFxuICAgICAgICAncmVhZG9ubHknLCAncmVmJywgJ3JldHVybicsICdzd2l0Y2gnLFxuICAgICAgICAnc3RydWN0JywgJ3NieXRlJywgJ3NlYWxlZCcsICdzaG9ydCcsXG4gICAgICAgICdzaXplb2YnLCAnc3RhY2thbGxvYycsICdzdGF0aWMnLCAnc3RyaW5nJyxcbiAgICAgICAgJ3NlbGVjdCcsICd0aGlzJywgJ3Rocm93JywgJ3RydWUnLFxuICAgICAgICAndHJ5JywgJ3R5cGVvZicsICd1aW50JywgJ3Vsb25nJyxcbiAgICAgICAgJ3VuY2hlY2tlZCcsICd1bnNhZmUnLCAndXNob3J0JywgJ3VzaW5nJyxcbiAgICAgICAgJ3ZhcicsICd2aXJ0dWFsJywgJ3ZvbGF0aWxlJywgJ3ZvaWQnLCAnd2hlbicsXG4gICAgICAgICd3aGlsZScsICd3aGVyZScsICd5aWVsZCcsXG4gICAgICAgICdtb2RlbCcsICdpbmplY3QnIC8vIFJhem9yIHNwZWNpZmljXG4gICAgXSxcbiAgICBlc2NhcGVzOiAvXFxcXCg/OlthYmZucnR2XFxcXFwiJ118eFswLTlBLUZhLWZdezEsNH18dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvLFxufTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/monaco-editor/esm/vs/basic-languages/razor/razor.js\n");

/***/ })

}]);