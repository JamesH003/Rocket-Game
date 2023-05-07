// defines the var startButton as the 'Start' button 
const startButton = document.getElementById('start-btn');
// defines the var questionContainerElement as the Question container
const questionContainerElement = document.getElementById('question-container')

// this just creates two new variables which will default both to 'undefined'
const shuffledQuestions, currentQuestionIndex


// This means that whenever we click on the 'Start' button, it will run the code in the startGame function.
startButton.addEventListener('click', startGame)



// function to start the game when the 'Start' button is clicked
function startGame() {
    console.log('Started');
   
    // this adds the class of 'hide' and hides the start button once clicked
    startButton.classList.add('hide');

    // this shuffles all relevant questions for us
    shuffledQuestions = questions.sort(() => Math.random() - .5);
   
    // this removes the hide class and allows the question container to be displayed
    questionContainerElement.classList.remove('hide');

    setNextQuestion();
}

// This is going to set the next question when the 'Next' button is clicked
function setNextQuestion() {

}

// This is when we actually select an answer
function selectAnswer() {

}


// setting a list of questions and initialising it to an array
const questions = [
    {
        question: 'What is 2 + 2', 
        answers: [
            { text: '4', correct: true},
            { text: '22', correct: false}
        ]
    }
]