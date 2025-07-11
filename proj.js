const questions = [
  {
    question: 'Какой язык используется в Веб-разработке?',
    answers: ["Python", "C++", "JavaScript", "Go"],
    correct: 3,
  },

  {
    question: 'Когда был написан язык JavaScript?',
    answers: ["1988", "1956", "1995", "1990"],
    correct: 3,
  },

  {
    question: 'Какие из способов объявления функций в JavaScript считаются верными?',
    answers: [
      "Function Expression",
       "Рекурсивная функция",
      "Линейная функция",
    ],
    correct: 1,
  },
  {
    question: 'Как называется самый первый движок для JavaScript',
    answers: ["JScript", "SpiderMonkey", "JavaScriptCore", "KJS"],
    correct: 2,
  }
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const buttonSub = document.querySelector('#sbmBtn')

let score = 0;
let questionIndex = 0;

clearQuiz()
showQuestion()
buttonSub.onclick = checkAnswer;

function clearQuiz() {
  headerContainer.innerHTML = '';
  listContainer.innerHTML = '';
};

function showQuestion() {

  const headerTemplate = '<h2 class = "title">%title%</h2>';
  const title = headerTemplate.replace('%title%', questions[questionIndex]['question'])

  headerContainer.innerHTML = title;

  let answerNumber = 1;
  for(let answerText of questions[questionIndex]['answers']){

    const questionTemplate = '<li> <label> <input value = "%number%" type= "radio", class = "answer", name = "answer"/> <span>%answers%</span></label></li>';
    
    const answerHTML = questionTemplate.replace('%answers%', answerText).replace('%number%', answerNumber);

    listContainer.innerHTML += answerHTML;

    answerNumber++;

  }
}

function checkAnswer() {
  // Находим выбранную радиокнопку
  const checkRadio = document.querySelector('input[type="radio"]:checked');

  if(!checkRadio){
    buttonSub.blur();
    return
  } 

  const userAnswer = parseInt(checkRadio.value);

  if(userAnswer === questions[questionIndex]['correct']){
    score++;
  }
  
  if(questionIndex !== questions.length - 1){
    questionIndex++;
    clearQuiz()
    showQuestion()
  } else {
    clearQuiz();
    showResults()
  }
}


function showResults() {

  const resultTemplate = `
        <h2 class = "title">%title%</h2>
        <h3 class = "summary">%message%</h3>
        <p class = "results">%results%</p>
        `;


let title, message;

if(score === questions.length) {
  title = 'Поздравляем!';
  message = 'Вы ответили верно на все вопросы!';

} else if((score * 100) / questions.length >= 50) {
  title = 'Неплохо!';
  message = 'Вы ответили на больше половины вопросов';
} else {
  title = 'Надо постараться!';
  message = 'Вы ответили на меньше половины вопросов';
}

let results = `${score} из ${questions.length}`;

const finalResults = resultTemplate.replace('%title%', title).replace('%message%', message).replace('%results%', results);

headerContainer.innerHTML = finalResults;

buttonSub.blur();
buttonSub.innerText = 'Начать заново';
buttonSub.onclick = () => history.go();
}