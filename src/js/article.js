// import listArticle from "../utils/article.json" with { type: "json" }; /* Informando ao interpretado que o arquivo é um JSON | IMPORT ASSERTION*/
import { cardGenerator, fetchListArticle, getRandomArticles } from "../utils/utils.js"
const URLParams = new URLSearchParams(window.location.search);

document.addEventListener("DOMContentLoaded", async () => {
    var listArticle = await fetchListArticle();
    const getParamsID = URLParams.get("article");
    const article = listArticle.filter(article => article.id == getParamsID)[0];
    if(!getParamsID || !article) { 
        window.location.href = "./";
    }

    document.title = `${article.title} - Safe For Nature`

    const containerArticle = document.getElementById("container-article");

    function formatDate(date) {
        var convertForDate = new Date(date);
        return `${String(convertForDate.getDate() + 1).padStart(2, '0')}/${String(convertForDate.getMonth() + 1).padStart(2, '0')}/${convertForDate.getFullYear()}`;
    }
    
    function convertContent(content) {
        let newContent = content;
        if (newContent.includes("{{img-")) {
            const regex = /{{img-(\d+)}}/g;
            const matches = newContent.match(regex);
            if (matches) {
                matches.forEach(match => {
                    const imgID = match.match(/\d+/)[0];
                    const image = article.images.find(img => img.id == imgID);
                    if (image) {
                        newContent = newContent.replace(match, `<figure><img width="600px" src="${image.src}" alt="${image.alt}"><figcaption>${image.source}</figcaption></figure>`);
                    }
                });
            }
        }
        return newContent;
    }

    containerArticle.innerHTML = `
        <div class='article'>
            <h1 class="text-center" style="font-size: 40px;">${article.title}</h1>
            ${article.author.length > 0 ? `
                <h3>
                    By ${article.author.map(author => `<a href='${author.link}'>${author.name}</a>`).join(" & ")}
                </h3>
            ` : ""}
            <p>${formatDate(article.createdAt)}</p>
            
            <img class="thumb" width="100%" height="231" src="${article.thumb.src}" alt="${article.thumb.ref}">
        
            <div class='article-content'>
                ${convertContent(article.content)}
            </div>

            <br>
            <p><em>Este artigo foi retirado/referenciado, clique <a href="${article.originRef}" target="_blank">aqui</a></em></p>
        </div>
    `;

    const relatedArticlesContainer = document.createElement("div");
    relatedArticlesContainer.classList.add("related-articles");

    const relatedArticlesContent = document.createElement("div");
    relatedArticlesContent.classList.add("flex", "gap-3")

    const title = document.createElement("h2");
    title.classList.add("title")
    title.textContent = "Leia também";

    relatedArticlesContainer.appendChild(title);
    relatedArticlesContainer.appendChild(relatedArticlesContent)

    getRandomArticles(listArticle, 5).forEach(article => relatedArticlesContent.innerHTML += cardGenerator(article));

    containerArticle.appendChild(relatedArticlesContainer);

    
})