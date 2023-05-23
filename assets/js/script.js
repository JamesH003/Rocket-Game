/* jshint esversion: 11 */

let startBtn = document.getElementById('start-btn');
let mainBox = document.getElementById('main-box');
let nextBtn = document.getElementById('next-btn');
let scoreArea = document.getElementById('score-area');
let questionCard = document.getElementById('question-card');
let questionElement = document.getElementById('question');
let answerButtons = document.getElementById('answer-buttons');
let tminus = document.getElementById('tminus');
let resetBtn = document.getElementById('reset-btn');

// this creates two new variables which will default both to 'undefined'
let randomQuestions, currentQuestion;

// countdown timer 
let countdownTimer = 30;
let timerId;
let timer = document.getElementById('countdown-timer');
let timerContainer = document.getElementsByClassName('timer-container')[0];

resetBtn.addEventListener("click", function() {
    window.location.reload();
});

// score counters
let correctScore = 0;
let incorrectScore = 0;
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
let closeRules = document.getElementById("close-rules-btn");
// let closeCongrats = document.getElementById("close-congrats-btn");
// let closeFail = document.getElementById("close-fail-btn");

let tryAgain = document.getElementById('try-again');
let playAgain = document.getElementById('play-again');

// let nightScene = document.getElementsByClassName('background-img-night');
// let dayScene = document.getElementsByClassName('background-img-day');
let bgImg = document.getElementById('bg-img');

// This means that whenever we click on the 'Start' button, it will run the code in the startQuiz function.
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    mainBox.style.boxShadow = '0 0 10px 2px';
    Array.from(answerButtons.children).forEach(button => {
        button.classList.remove('disable');
    });
    currentQuestion++;
    nextQuestion();
});

// To start countdown timer when 'Start' is clicked
startBtn.addEventListener('click', countdown);

// Runs the openModal function when Rules button is clicked
rulesBtn.addEventListener('click', openRulesModal);

// Runs the closeModal function when the X is clicked
closeRules.addEventListener('click', closeRulesModal);

// https://blog.webdevsimplified.com/2023-04/html-dialog/
rulesModal.addEventListener("click", e => {
    const dialogDimensions = rulesModal.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      rulesModal.close()
    }
  })
// closeCongrats.addEventListener('click', closeCongratsModal);
// closeFail.addEventListener('click', closeFailModal);

// bgImg.addEventListener('load', timeOfDay);

let launchAudio = document.getElementById('launch-audio');
let twinkleAudio = document.getElementById('twinkle-audio');
let explosionAudio = document.getElementById('explosion-audio');
let fireAudio = document.getElementById('fire-audio');
let muteAudio = document.getElementById('volume-off-div');
let unmuteAudio = document.getElementById('volume-on-div');

muteAudio.addEventListener('click', enableMute);
unmuteAudio.addEventListener('click', disableMute);


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

    scoreArea.classList.remove('hidden');

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
            timer.classList.add('hidden');
            fire.style.display = 'block';
        }, 6000);
        setTimeout(() => {
            playExplosionAudio()
        }, 5705);  
        setTimeout(() => {
            playFireAudio()
        }, 7500);  
        setTimeout(() => {
            failModal.showModal()
        }, 9000);     
    // } else {
    //     timer.innerHTML = countdownTimer + ':00';
    //     countdownTimer--;
    // }
}

// Rules modal
// When the user clicks on the button, open the modal
function openRulesModal() {
    rulesModal.showModal();
}

// Congrats modal
// When the user clicks on the button, open the modal
function openCongratsModal() {
    congratsModal.showModal()
}

// Fail modal
// When the user clicks on the button, open the modal
function openFailModal() {
    failModal.showModal();

}

// When the user clicks on <span> (x), close the modal
function closeRulesModal() {
    rulesModal.close();
}

// function closeCongratsModal() {
//     congratsModal.close();
// }

// function closeFailModal() {
//     failModal.close();
// }

// When the user clicks anywhere outside of the modal, close it
// ASK ABOUT THIS???????????---------------------------------------------------------<<<<<<
// window.onclick = function (event) {
//     if (event.target == modal) {
//         rulesModal.style.display = "none";
//     }
// }




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
        button.classList.add('disable');
        setStatus(button, button.dataset.correct, selectedButton);
    });
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
            mainBox.style.boxShadow = '0 0 50px 2px rgba(0, 255, 0, 1)';
            incrementCorrectScore();
        }
    } else {
        element.classList.add('incorrect');
        // only decrement if it hasn't already been for this round
        if (!scoreDecremented && selectedButton.dataset.correct == undefined) {
            mainBox.style.boxShadow = '0 0 50px 2px rgba(255, 0, 0, 1)';
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
    correctScore = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++correctScore;
    scoreIncremented = true;
    initiateLaunchSequence();
}

// increment the number of incorrect scores
function incrementIncorrectScore() {
    incorrectScore = parseInt(document.getElementById('incorrect-score').innerText);
    document.getElementById('incorrect-score').innerText = ++incorrectScore;
    scoreDecremented = true;
    initiateLaunchSequence();
}

function initiateLaunchSequence() {
    if (correctScore >= 5) {
        hideElements();
        rocket.style.animation = 'shake 0.5s infinite, rocket-launch 10s forwards 6s';
        setTimeout(() => {
            playLaunchAudio();
        }, 6000);
        setTimeout(() => {
            twinkle.style.display = 'block';
        }, 15000);  
        setTimeout(() => {
            playTwinkleAudio();
        }, 14500);  
        setTimeout(() => {
            congratsModal.showModal()
            console.log('congrats modal')
        }, 16000);     
    } else if (incorrectScore >= 3) {
        hideElements();
        initiateSelfDestruct();
    }
}

function hideElements() {
    rocket.style.animation = 'shake 0.5s infinite';
    tminus.classList.remove('hidden');
    timer.style.fontSize = '2em';
    timerContainer.style.backgroundColor = 'rgba(50, 50, 50, 0)';
    timerContainer.style.margin = 'auto';
    countdownTimer = 5;
    timer.innerHTML = countdownTimer + ':00';
    mainBox.classList.add('hidden');
    scoreArea.classList.add('hidden');
    setTimeout(() => {
        tminus.classList.add('hidden');
        timer.classList.add('hidden');
    }, 6000);
}

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
}

// restart button
tryAgain.addEventListener("click", function() {
    window.location.reload();
});

playAgain.addEventListener("click", function() {
    window.location.reload();
});

// audio
function playLaunchAudio() {
    launchAudio.play();
  }

  function playTwinkleAudio() {
    twinkleAudio.play();
  }

  function playExplosionAudio() {
    explosionAudio.play();
  }

  function playFireAudio() {
    fireAudio.play();
  }
  
  function pauseAudio() {
    launchAudio.pause();
  }

  function enableMute() {
    launchAudio.muted = true;
    twinkleAudio.muted = true;
    explosionAudio.muted = true;
    fireAudio.muted = true;
    unmuteAudio.style.display = 'block';
    muteAudio.style.display = 'none';
  }

  function disableMute() {
    launchAudio.muted = false;
    twinkleAudio.muted = false;
    explosionAudio.muted = false;
    fireAudio.muted = false;
    unmuteAudio.style.display = 'none';
    muteAudio.style.display = 'block';
  }