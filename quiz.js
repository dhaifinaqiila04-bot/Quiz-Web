const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which language is used for web development?",
        options: ["Python", "HTML", "Java", "C++"],
        answer: "HTML"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Jupiter"
    }
];

let currentQuestion = 0;
let score = 0;
let questionNo = 0;
let timeLeft = 30;
let timerInterval;

const timerElem = document.getElementById('time');
const timeBlockElem = document.getElementById('timer');
const questionElem = document.getElementById('question');
const optionElem = document.getElementById('options');
const pickOptionElem = document.getElementById('pickOption')
const noQuestElem = document.getElementById('noQuestion');
const numberElem = document.getElementById('number');
const resultElem = document.getElementById('result');
const scoreElem = document.getElementById('score');
const restartElem = document.getElementById('restart-btn');
const startElem = document.getElementById('start-btn');
const quizElem = document.getElementById('quiz')

function loadQuestion() {
    if (currentQuestion >= quizData.length){
        endQuiz();
        return;
    }
    clearInterval(timerInterval);
    timeLeft = 30;
    timerElem.textContent = timeLeft; 
    startTimer();

    questionNo = currentQuestion + 1; 
    numberElem.textContent = questionNo; 

    const currentQuiz = quizData[currentQuestion];
    questionElem.textContent = currentQuiz.question;
    optionElem.innerHTML = ''; 
    
    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionElem.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    if (selectedOption === quizData[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    loadQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElem.textContent = timeLeft;
        if (timeLeft <= 0){
            clearInterval(timerInterval);
            currentQuestion++; 
            loadQuestion();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    questionElem.style.display = 'none';
    optionElem.style.display = 'none'; 
    resultElem.style.display = 'block';
    scoreElem.textContent = score;
    restartElem.style.display = 'block'; 
    pickOptionElem.style.display = 'none';
    noQuestElem.style.display = 'none';
    timeBlockElem.style.display = 'none';
}


restartElem.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    timeLeft = 30;
    timerElem.textContent = timeLeft; 
    questionElem.style.display = 'flex'; 
    optionElem.style.display = 'flex';     
    resultElem.style.display = 'none';     
    restartElem.style.display = 'none';  
    pickOptionElem.style.display = 'block'
    noQuestElem.style.display = 'block';
    timeBlockElem.style.display = 'block';

    loadQuestion();
});

startElem.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    timeLeft = 30;
    quizElem.style.display = 'block';
    startElem.style.display = 'none';
    
    loadQuestion();
});
