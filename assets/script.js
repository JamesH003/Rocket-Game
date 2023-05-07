// defines the var startButton as the 'Start' button 
const startButton = document.getElementById('start-btn');

// This means that whenever we click on the 'Start' button, it will run the code in the startGame function.
startButton.addEventListener('click', startGame)

// function to start the game when the 'Start' button is clicked
function startGame() {
    console.log('Started');
    // this adds the class of 'hide' and hides the start button once clicked
    startButton.classList.add('hide');
}

// This is going to set the next question when the 'Next' button is clicked
function setNextQuestion() {

}

// This is when we actually select an answer
function selectAnswer() {

}

