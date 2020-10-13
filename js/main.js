

function getQuestions() {
    const questionsQuantity = document.getElementById('questions-number').value
    fetch(`https://opentdb.com/api.php?amount=${questionsQuantity}`)
        .then(response => response.json())
        .then(data => printCards(data.results))
}

function SelectCategory() {
    fetch(`https://opentdb.com/api_category.php`)
    .then(response => response.json())
    .then(data => printSelectCategory(data.trivia_categories))
}

function printSelectCategory(categorys) {

    const container = document.getElementById('category-number');
    container.innerHTML = '';
    categorys.forEach(category => {
        const list = returnSelectCategory(category);
        container.innerHTML += list;
    });

    
}

function returnSelectCategory(category) {
    const list = `<option value=${category.id}> ${category.name} </option> `;
    return list;
}



function printCards(questions) {
    const container = document.getElementById('container-cards');
    container.innerHTML = '';
    questions.forEach(question => {
        const card = returnCardHTML(question);
        container.innerHTML += card;
    });
}

function returnCardHTML(q) {
    const card = `<div class="card">
                    <div class="card-body">
                    <h5 class="card-title">${q.category}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${q.question}</h6>
                        ${returnAnswersHTML(q.correct_answer, q.incorrect_answers)}           
                    </div>
                </div>`
    return card;
}


function returnAnswersHTML(correct, incorrects) {
    const correctHTML = `<div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                            <label class="form-check-label" for="exampleRadios1">
                            ${correct}
                            </label>
                        </div>`;


    let incorrectHTML = '';
    incorrects.forEach((incorrect) => {
        incorrectHTML += `<div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                            <label class="form-check-label" for="exampleRadios1">
                            ${incorrect}
                            </label>
                        </div>`;
    })


    return correctHTML + incorrectHTML;

}


SelectCategory();

window.getQuestions = getQuestions;
