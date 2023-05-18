/* jshint esversion: 11 */

let startBtn = document.getElementById('start-btn');

let nextBtn = document.getElementById('next-btn');
let questionCard = document.getElementById('question-card');
let questionElement = document.getElementById('question');
let answerButtons = document.getElementById('answer-buttons');

// this creates two new variables which will default both to 'undefined'
let randomQuestions, currentQuestion;

// countdown timer 
let countdownTimer = 30;
let timerId;
let timer = document.getElementById('countdown-timer');

// score counters
let scoreIncremented = false;
let scoreDecremented = false;

// Get the modal
let rulesModal = document.getElementById("rules-modal");
let congratsModal = document.getElementById("congrats-modal");
let failModal = document.getElementById("fail-modal");

let rocket = document.getElementById('rocket-launch');
let explosion = document.getElementById('explosion');
let fire = document.getElementById('fire');
let twinkle = document.getElementById('twinkle');

// Get the button that opens the modal
let rulesBtn = document.getElementById("rules-button");

// Get the <span> element that closes the modal
let closeBtn = document.getElementsByClassName("close-rules-modal")[0];

// let nightScene = document.getElementsByClassName('background-img-night');
// let dayScene = document.getElementsByClassName('background-img-day');
let bgImg = document.getElementById('bg-img');

// This means that whenever we click on the 'Start' button, it will run the code in the startQuiz function.
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestion++;
    nextQuestion();
});

// To start countdown timer when 'Start' is clicked
startBtn.addEventListener('click', countdown);

// Runs the openModal function when Rules button is clicked
rulesBtn.addEventListener('click', openRulesModal);

// Runs the closeModal function when the X is clicked
closeBtn.addEventListener('click', closeModal);

// bgImg.addEventListener('load', timeOfDay);




// -----------------------------------------FUNCTIONS---------------------------------------------------------------

// function to start the game when the 'Start' button is clicked
function startQuiz() {

    timerId = setInterval(countdown, 1000);

    // this adds the class of 'hidden' and hides the start button once clicked
    startBtn.classList.add('hidden');

    // this hides the rules button once the start button is clicked
    rulesBtn.classList.add('hidden');

    // this shuffles all relevant questions for us and produces random order
    randomQuestions = questions.sort(() => Math.random() - 0.5);

    // this starts from the very first question in the shuffled questions array
    currentQuestion = 0;

    // this removes the hidden class and allows the question container to be displayed
    questionCard.classList.remove('hidden');

    nextQuestion();
}

// countdown timer
function countdown() {
    if (countdownTimer < 0 && correctScore < 5) {
        // no time left, and not enough correct answers
        hideElements();
        initiateSelfDestruct();
    } else {
        timer.innerHTML = countdownTimer + ':00';
        countdownTimer--;
    }
    // if (countdownTimer < 0  && incorrectScore >= 3) {
    //     // no time left, and too many incorrect answers
    //     // do nothing here? not needed? already triggered
    // } else if (countdownTimer < 0 && correctScore < 5) {
    //     // no time left, and not enough correct answers
    //     hideElements();
    //     initiateSelfDestruct();
    // } else {
    //     timer.innerHTML = countdownTimer + ':00';
    //     countdownTimer--;
    // }
}

function initiateSelfDestruct() {
    // if (countdownTimer <= 0) {
        setTimeout(() => {
            clearInterval(timerId);
        rocket.style.display = 'none';
        explosion.style.display = 'block';
        setTimeout(() => {
            timer.classList.add('hidden');
            fire.style.display = 'block';
        }, 6000);  
    // } else {
    //     timer.innerHTML = countdownTimer + ':00';
    //     countdownTimer--;
    // }
}

// Rules modal
// When the user clicks on the button, open the modal
function openRulesModal() {
    rulesModal.style.display = "block";

}

// Congrats modal
// When the user clicks on the button, open the modal
function openCongratsModal() {
    congratsModal.style.display = "block";

}

// Fail modal
// When the user clicks on the button, open the modal
function openFailModal() {
    failModal.style.display = "block";

}

// When the user clicks on <span> (x), close the modal
function closeModal() {
    rulesModal.style.display = 'none';
    congratsModal.style.display = 'none';
    failModal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
// ASK ABOUT THIS???????????---------------------------------------------------------<<<<<<
window.onclick = function (event) {
    if (event.target == modal) {
        rulesModal.style.display = "none";
    }
}




// This is going to set the next question when the 'Next' button is clicked
function nextQuestion() {
    // resets everything back to its default state everytime we set a new question
    resetDefault();
    // this shows the next question at the current question index
    displayQuestion(randomQuestions[currentQuestion]);
}


// ???????????????? question.question
// assigns buttons to the various answers for the user to choose from?
function displayQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        let button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;

        }
        button.addEventListener('click', userAnswer);
        answerButtons.appendChild(button);
    });
}

function resetDefault() {
    removeStatus(document.body);
    nextBtn.classList.add('hidden');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// This is when we actually select an answer
function userAnswer(e) {
    console.log(e);
    let selectedButton = e.target;
    let correct = selectedButton.dataset.correct;
    setStatus(document.body, correct, selectedButton);
    Array.from(answerButtons.children).forEach(button => {
        setStatus(button, button.dataset.correct, selectedButton)
    })
    if (randomQuestions.length > currentQuestion + 1) {
        // shows the 'Next' button after you answer a question
        nextBtn.classList.remove('hidden');
        scoreIncremented = false;
        scoreDecremented = false;
    } else {
        startBtn.innerText = 'Restart';
        startBtn.classList.remove('hidden');
    }

}

// sets the status of both the selected answer button and the body - changes the color to green or red depending on whether the answer is correct or incorrect
function setStatus(element, correct, selectedButton) {
    removeStatus(element);
    if (correct) {
        element.classList.add('correct');
        // increment correct score - *bug* incrementing correct score by 2 and incorrect score by 1

        // only increment if it hasn't already been for this round
        if (!scoreIncremented && selectedButton.dataset.correct) {
            incrementCorrectScore();
        }
    } else {
        element.classList.add('incorrect');
        // only decrement if it hasn't already been for this round
        if (!scoreDecremented && selectedButton.dataset.correct == undefined) {
            incrementIncorrectScore();
        }
    }
}

// clears the status from the previous question (green or red color)
function removeStatus(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

// increment the number of correct scores
function incrementCorrectScore() {
    let oldScore = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++oldScore;
    scoreIncremented = true;
}

// increment the number of incorrect scores
function incrementIncorrectScore() {
    let oldScore = parseInt(document.getElementById('incorrect-score').innerText);
    document.getElementById('incorrect-score').innerText = ++oldScore;
    scoreDecremented = true;
}

function initiateLaunchSequence() {
        setTimeout(() => {
            twinkle.style.display = 'block'
        }, 15000);       
    }
}

// initiateLaunchSequence()

// to get the current time of day
// function getHours() {
//     return
// }


let today = new Date();
let hours = today.getHours();

console.log(hours);
timeOfDay();

function timeOfDay() {
    if (hours < 18 && hours > 7) {
        bgImg.style.backgroundImage = "url('assets/images/bg-day.jpg')";
    } else {
        bgImg.style.backgroundImage = "url('assets/images/bg-night.jpg')";
    }
};


// function incrementScore() {
//     let oldScore = parseInt(document.getElementById('score').innerText);
//     document.getElementById('score').innerText = ++oldScore;
// }


// /**
//  * Gets the current tally of incorrect answers from the DOM and increments it by 1
//  */
// function incrementWrongAnswer() {
//     let oldScore = parseInt(document.getElementById('incorrect').innerText);
//     document.getElementById('incorrect-score').innerText = ++oldScore;
// }



// function to keep score

// function for 30 second timer 

// function for time of day 

// function to initiate launch sequence 