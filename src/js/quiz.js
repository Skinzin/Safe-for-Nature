import listQuiz from "../utils/quiz.json" with { type: "json" }
const URLParams = new URLSearchParams(window.location.search);


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

    const progressDiv = document.getElementById("progress");
    const formQuiz = document.getElementById("form-quiz");

    var i = 0;
    do {
        console.log(searchQuiz.questions.length)
        progressDiv.innerHTML += `<span>${i +1}</span>`
        i++
    } while (searchQuiz.questions.length > i);


    const btn = document.getElementsByClassName("btn");

    formQuiz.innerHTML = `
        <h3>${searchQuiz.questions[0].title}</h3>

        <ul class="options">
            ${searchQuiz.questions[0].options.map((question) => {
                return `
                    <li>
                        <button class="text-left" id="${question.id}">${question.awnser}</button>
                    </li>
                `
            }).join('')}
        </ul>
    `

    formQuiz.addEventListener("submit", (e) => {
        e.preventDefault()
        // console.log(e.submitter)

        const getBtnID = parseInt(e.submitter.id);

        if(searchQuiz.idVerifyAwnser == getBtnID) {
            e.submitter.classList.add("correct");
        } else {
            e.submitter.classList.add("incorrect");

            // console.log(document.getElementById(searchQuiz.idVerifyAwnser).classList.add("correct"))
        }

        setTimeout(() => {
            currentQuest++;
            formQuiz.innerHTML = `
                <h3>${searchQuiz.questions[currentQuest - 1].title}</h3>

                <ul class="options">
                    ${searchQuiz.questions[currentQuest - 1].options.map((question) => {
                        return `
                            <li>
                                <button class="text-left" id="${question.id}">${question.awnser}</button>
                            </li>
                        `
                    }).join('')}
                </ul>
            `
        }, 1500)

        // searchQuiz[0].options.forEach(key => {
            // 
        // })
    })
})