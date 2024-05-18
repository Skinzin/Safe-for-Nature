import listQuiz from "../utils/quiz.json" with { type: "json" }
import { modal } from "../utils/utils.js";
const URLParams = new URLSearchParams(window.location.search);

function refreshScreen() {
    location.reload();
}


document.addEventListener("DOMContentLoaded", () => {
    // fetch('./src/utils/article.json')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //     })
    //     .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
    
    const getParamsID = URLParams.get("id");
    var currentQuest = 1;
    
    if(!getParamsID) { 
        window.location.href = "./quiz-list.html"
    }

    const searchQuiz = listQuiz.filter(key => key.id == getParamsID)[0];

    if(!searchQuiz) {
        window.location.href = "./quiz-list.html"
    }

    // #################################################################################################################

    document.title = `${searchQuiz.title} - Safe For Nature`;
    
    const progressDiv = document.getElementById("progress");
    const formQuiz = document.getElementById("form-quiz");
    var answerCorret = 0;

    var i = 0;
    do {
        progressDiv.innerHTML += `<span class="quest-${i}">${i +1}</span>`
        i++
    } while (searchQuiz.questions.length > i);


    const btn = document.getElementsByClassName("btn");

    formQuiz.innerHTML = `
        <h3>${searchQuiz.questions[0].title}</h3>

        <ul class="options">
            ${searchQuiz.questions[0].options.map((question) => {
                return `
                    <li>
                        <button class="text-left" id="${question.id}">${question.answer}</button>
                    </li>
                `
            }).join('')}
        </ul>
    `

    formQuiz.addEventListener("submit", (e) => {
        e.preventDefault();

        const getBtnID = parseInt(e.submitter.id);

        if(searchQuiz.questions[currentQuest - 1].correct_answer == getBtnID) {
            answerCorret++
            e.submitter.classList.add("correct");
            document.getElementsByClassName(`quest-${currentQuest - 1}`)[0].classList.add("correct")
        } else {
            e.submitter.classList.add("incorrect");
            document.getElementsByClassName(`quest-${currentQuest - 1}`)[0].classList.add("incorrect")
            document.getElementById(searchQuiz.questions[currentQuest - 1].correct_answer).classList.add("correct");
        }

        if(currentQuest !== searchQuiz.questions.length) {
            setTimeout(() => {
                formQuiz.innerHTML = `
                    <div class="loader-container">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                `
            }, 1000)
            setTimeout(() => {
                currentQuest++;
                formQuiz.innerHTML = `
                    <h3>${searchQuiz.questions[currentQuest - 1].title}</h3>
    
                    <ul class="options">
                        ${searchQuiz.questions[currentQuest - 1].options.map((question) => {
                            return `
                                <li>
                                    <button class="text-left" id="${question.id}">${question.answer}</button>
                                </li>
                            `
                        }).join('')}
                    </ul>
                `
            }, 1600)
        } else {
            document.getElementById("modal").style.display = "flex";
            modal.innerHTML = `
                <div class="modal-container">
                    <div class="modal-header">
                        <h2 class="title text-center">Fim do quiz!</h2>
                    </div>
                    <div class="modal-content">
                        <p>Parabéns! Você finalizou este quiz e acertou ${answerCorret}/${searchQuiz.questions.length}!<br>Que tal dar uma olhadinha em nosso <a href="./">artigos</a> e ficar por dentro de tudo?</p>
                    </div>
                    <div class="modal-footer">
                        <div class="actions">
                            <button id="repeat">Fazer novamente</button>
                            <a href="./quiz-list.html">Voltar</a>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById("repeat").addEventListener("click", refreshScreen)

        }

        // searchQuiz[0].options.forEach(key => {
            // 
        // })
    })
})