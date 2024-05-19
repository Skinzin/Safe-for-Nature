// "use strict";
// import articles from "../utils/article.json" with { type: "json" }; /* Informando ao interpretado que o arquivo é um JSON | IMPORT ASSERTION*/
import { cardGenerator, fetchListArticle, getRandomArticles, modal } from "../utils/utils.js";

document.addEventListener("DOMContentLoaded", async () => {
    var articles = await fetchListArticle();
    const topViewedArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);
    const recentArticles = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    const randomArticles = getRandomArticles(articles, 3);

    document.getElementById("first_notices").innerHTML = `
        <div id="card-main-news" class="card-main-news">
            <a class="flex-1" href="./artigo.html?article=${randomArticles[0].id}">
                <img class="object-cover" width="100%" height="100%" src="${randomArticles[0].thumb.src}" alt="${randomArticles[0].thumb.ref}">
                <h2 class="title text-justify">${randomArticles[0].title}</h2>
            </a>
        </div>
        <div class="card-secondary-news">
            <div class="card-main-news">
                <a class="flex-1" href="./artigo.html?article=${randomArticles[1].id}">
                    <img class="object-cover" width="100%" height="100%" src="${randomArticles[1].thumb.src}" alt="${randomArticles[1].thumb.ref}">
                    <h2 class="title text-justify">${randomArticles[1].title}</h2>
                </a>
            </div>
            <div class="card-main-news">
                <a class="flex-1" href="./artigo.html?article=${randomArticles[2].id}">
                    <img class="object-cover" width="100%" height="100%" src="${randomArticles[2].thumb.src}" alt="${randomArticles[2].thumb.ref}">
                    <h2 class="title text-justify">${randomArticles[2].title}</h2>
                </a>
            </div>
        </div>
    `;

    document.getElementById("top_articles").innerHTML = topViewedArticles.map((article) => cardGenerator(article)).join('');

    
    document.getElementById("content-recent").innerHTML = recentArticles.map((article) => cardGenerator(article)).join('');


    document.getElementById("send-register").addEventListener("click",() => {
        var email = document.getElementById("email-newsletter").value;

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        if (!validateEmail(email)) {
            modal.style.display = "flex"
            modal.innerHTML = `
                <div class="modal-container">
                    <div class="modal-header">
                        <h2 class="title text-center">Email invalido!</h2>
                    </div>
                    <div class="modal-content">
                        <p>O email informado (${email || "N/A"}) não está correto.</p>
                    </div>
                    <div class="modal-footer">
                        <div class="actions">
                            <button id="close">Fechar</button>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById("close").addEventListener("click", () => {
                modal.innerHTML = "";
                modal.style.display = "none"
            })
            return;
        }

        modal.style.display = "flex"
        modal.innerHTML = `
            <div class="modal-container">
                <div class="modal-header">
                    <h2 class="title text-center">Inscrição feita com sucesso!</h2>
                </div>
                <div class="modal-content">
                    <p>Estamos felizes em informar que seu registro na nossa Newsletter foi confirmado com sucesso!</p>
                    <br>
                    <p>A partir de agora, você receberá regularmente em sua caixa de entrada (<em>${email}</em>) os nossos artigos exclusivos, insights de especialistas e as últimas novidades sobre sustentabilidade ambiental, responsabilidade social e governança corporativa.</p>
                    <br>
                    <p>Obrigado(a) por se juntar a nós nesta jornada!</p>
                </div>
                <div class="modal-footer">
                    <div class="actions">
                        <button id="close">Fechar</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById("close").addEventListener("click", () => {
            modal.innerHTML = "";
            modal.style.display = "none"
        })
    })
});