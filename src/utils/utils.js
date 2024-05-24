const modal = document.getElementById("modal");


/**
 * Function that returns the quiz list
 * @returns {Array<{id: number, title: string, thumb: string, questions: Array<{id: number, answer: string}>, correct_answer: number}>}
 */
async function fetchListQuiz() {
    var fetchListQuiz = await fetch('./src/utils/quiz.json')//.then(response => response.json())
    var quiz = await fetchListQuiz.json();

    return quiz;
}

/**
 * Function that returns the list of articles
 *  @returns {Array<{id: number, title: string, subtitle: string, content: string, author: Array<{link: string, name: string}>, thumb: {src: string, ref: string}, images: Array<{id: number, src: string, alt: string, source: string}>, createdAt: string, originRef: string, views: number}>}
 */

async function fetchListArticle() {
    var fetchListArticle = await fetch('./src/utils/article.json')//.then(response => response.json())
    var articles = await fetchListArticle.json();

    return articles;
}

/**
 * @returns {Array<{id: number, title: string, subtitle: string, content: string, author: Array<{link: string, name: string}>, thumb: {src: string, ref: string}, images: Array<{id: number, src: string, alt: string, source: string}>, createdAt: string, originRef: string, views: number}>}
  */
function getRandomArticles(list, num) {
    const articles = [...list];
    const randomArticles = [];

    while (randomArticles.length < num && articles.length > 0) {
        const randomIndex = Math.floor(Math.random() * articles.length);
        const randomArticle = articles.splice(randomIndex, 1)[0];
        if (!randomArticles.some(article => article.id === randomArticle.id)) {
            randomArticles.push(randomArticle);
        }
    }

    return randomArticles;
}

function cardGenerator(article) {
    return `
        <div class="card">
            <a class="flex-1" href="/artigo.html?article=${article.id}">
                <img src="${article.thumb.src}" alt="Thumb - ${article.title}">
                <div class="card-info">
                    <h3 title="${article.title}">${article.title}</h3>
                    <p title="${article.subtitle}">${article.subtitle}</p>
                </div>
            </a>
        </div>
    `
}


export {
    getRandomArticles,
    cardGenerator,
    modal,
    fetchListQuiz,
    fetchListArticle
}

