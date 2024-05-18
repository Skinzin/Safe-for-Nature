import listQuiz from "../utils/quiz.json" with { type: "json" }


document.addEventListener("DOMContentLoaded", () => {
    const divContainer = document.getElementsByClassName("container-quiz")[0]


    divContainer.innerHTML += listQuiz.map((quiz) => `
        <div class="card-quiz">
            <div class="card-header">
                <h2 title="${quiz.title}" class="title">${quiz.title}</h2>
            </div>

            <img class="object-cover" src="./public/adam-kool-ndN00KmbJ1c-unsplash.jpg" alt="">

            <a class="text-center" href="./quiz.html?id=${quiz.id}">Iniciar</a>
        </div>
    `).join('')
})