// "use strict";
import articles from "../utils/article.json" with { type: "json" }; /* Informando ao interpretado que o arquivo é um JSON | IMPORT ASSERTION*/

/* 
    1. Por que troquei Assert por WITH?
        R: Sugestão do navegador: 'assert' is deprecated in import statements and support will be removed in V8 v12.6 and Chrome 126; use 'with' instead
*/