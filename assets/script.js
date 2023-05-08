// defines the var startButton as the 'Start' button 
const startButton = document.getElementById('start-btn');
// defines the var questionContainerElement as the Question container
const questionContainerElement = document.getElementById('question-container')

// defines the var questionElement as the question div
const questionElement = document.getElementById('question')

// defines the var answerButtonsElement as the answer buttons div
const answerButtonsElement = document.getElementById('answer-buttons')

// this just creates two new variables which will default both to 'undefined'
let shuffledQuestions, currentQuestionIndex


// This means that whenever we click on the 'Start' button, it will run the code in the startGame function.
startButton.addEventListener('click', startGame)


// -----------------------------------------FUNCTIONS---------------------------------------------------------------

// function to start the game when the 'Start' button is clicked
function startGame() {
    console.log('Started');
   
    // this adds the class of 'hide' and hides the start button once clicked
    startButton.classList.add('hide');

    // this shuffles all relevant questions for us
    shuffledQuestions = questions.sort(() => Math.random() - .5);

    // this starts from the very first question in the shuffled questions array
    currentQuestionIndex = 0
   
    // this removes the hide class and allows the question container to be displayed
    questionContainerElement.classList.remove('hide');

    setNextQuestion();
}

// This is going to set the next question when the 'Next' button is clicked
function setNextQuestion() {
    // this shows the next question at the current question index
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}


// ???????????????? question.question
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        } 
        button.addEventListener('click', selectAnswer)
    })
}

// This is when we actually select an answer
function selectAnswer(e) {

}


// setting a list of questions and initialising it to an array
const questions = [
    {
        question: 'What is 2 + 2?', 
        answers: [
            { text: '4', correct: true},
            { text: '22', correct: false}
        ]
    }
]