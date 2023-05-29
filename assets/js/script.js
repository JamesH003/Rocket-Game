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
// This creates two new variables which will default both to 'undefined'
let randomQuestions, currentQuestion;
// Countdown timer 
let countdownTimer = 30;
let timerId;
let timer = document.getElementById('countdown-timer');
let timerContainer = document.getElementsByClassName('timer-container')[0];
// Score counters
let correctScore = 0;
let incorrectScore = 0;
let scoreIncremented = false;
let scoreDecremented = false;
// Get the modals
let modals = document.querySelectorAll(".modal");
let rulesModal = document.getElementById("rules-modal");
let congratsModal = document.getElementById("congrats-modal");
let failModal = document.getElementById("fail-modal");
// Get the button that opens the modal
let rulesBtn = document.getElementById("rules-button");
// Get the <span> element that closes the modal
let closeRules = document.getElementById("close-rules-btn");
let rocket = document.getElementById('rocket-launch');
let explosion = document.getElementById('explosion');
let fire = document.getElementById('fire');
let twinkle = document.getElementById('twinkle');
let tryAgain = document.getElementById('try-again');
let playAgain = document.getElementById('play-again');
let bgImg = document.getElementById('bg-img');
// Audio variables & controls
let audios = document.querySelectorAll('audio');
let launchAudio = document.getElementById('launch-audio');
let twinkleAudio = document.getElementById('twinkle-audio');
let explosionAudio = document.getElementById('explosion-audio');
let fireAudio = document.getElementById('fire-audio');
let muteAudio = document.getElementById('volume-off-div');
let unmuteAudio = document.getElementById('volume-on-div');

// Event Listeners
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

// To reload the page when clicked
resetBtn.addEventListener("click", function () {
    window.location.reload();
});

// To start countdown timer when 'Start' is clicked
startBtn.addEventListener('click', countdown);

// Runs the openRulesModal function when Rules button is clicked
rulesBtn.addEventListener('click', openRulesModal);

// Runs the closeRulesModal function when the X is clicked
closeRules.addEventListener('click', closeRulesModal);

// Closes a modal when the user clicks anywhere outside the modal
// https://blog.webdevsimplified.com/2023-04/html-dialog/
// loop each modal to allow clicking outside of dialog to close it
modals.forEach(modal => {
    modal.addEventListener("click", e => {
        const dialogDimensions = modal.getBoundingClientRect();
        closeDialog(e, modal, dialogDimensions);
    });
});

// close the specific modal
function closeDialog(e, modal, dialogDimensions) {
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        modal.close();
    }
}

// Calls the mute or unmute functions when clicked
muteAudio.addEventListener('click', enableMute);
unmuteAudio.addEventListener('click', disableMute);

// Functions
// function to start the game when the 'Start' button is clicked
function startQuiz() {
    timerId = setInterval(countdown, 1000);
    // Adds the class of 'hidden' and hides the start button once clicked
    startBtn.classList.add('hidden');
    // Hides the rules button once the start button is clicked
    rulesBtn.classList.add('hidden');
    // Shuffles all relevant questions for us and produces random order
    randomQuestions = questions.sort(() => Math.random() - 0.5);
    // Starts from the very first question in the shuffled questions array
    currentQuestion = 0;
    // Removes the hidden class and allows the question container to be displayed
    questionCard.classList.remove('hidden');
    scoreArea.classList.remove('hidden');
    // calls the next question function
    nextQuestion();
}

// Countdown timer
function countdown() {
    if (countdownTimer < 0 && correctScore < 5) {
        hideElements();
        initiateSelfDestruct();
    } else {
        timer.innerHTML = countdownTimer + ':00';
        countdownTimer--;
    }
}

// This is going to set the next question when the 'Next' button is clicked
function nextQuestion() {
    // Resets everything back to its default state everytime we set a new question
    resetDefault();
    // This shows the next question at the current question index
    displayQuestion(randomQuestions[currentQuestion]);
}

// Assigns buttons to the various answers for the user to choose from
function displayQuestion(question) {
    questionElement.innerText = question.question;
    let questionAnswers = question.answers.sort(() => Math.random() - 0.5);
    questionAnswers.forEach(answer => {
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

// This is when we actually select an answer
function userAnswer(e) {
    let selectedButton = e.target;
    let correct = selectedButton.dataset.correct;
    setStatus(document.body, correct, selectedButton);
    Array.from(answerButtons.children).forEach(button => {
        button.classList.add('disable');
        setStatus(button, button.dataset.correct, selectedButton);
    });
    if (randomQuestions.length > currentQuestion + 1) {
        // Shows the 'Next' button after you answer a question
        nextBtn.classList.remove('hidden');
        scoreIncremented = false;
        scoreDecremented = false;
    } else {
        startBtn.innerText = 'Restart';
        startBtn.classList.remove('hidden');
    }
}

// Sets the status of both the selected answer button - changes the color to green or red depending on whether the answer is correct or incorrect
function setStatus(element, correct, selectedButton) {
    removeStatus(element);
    if (correct) {
        element.classList.add('correct');
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

function resetDefault() {
    removeStatus(document.body);
    nextBtn.classList.add('hidden');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Clears the status from the previous question (green or red color)
function removeStatus(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

// Increment the number of correct scores
function incrementCorrectScore() {
    correctScore = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++correctScore;
    scoreIncremented = true;
    initiateLaunchSequence();
}

// Increment the number of incorrect scores
function incrementIncorrectScore() {
    incorrectScore = parseInt(document.getElementById('incorrect-score').innerText);
    document.getElementById('incorrect-score').innerText = ++incorrectScore;
    scoreDecremented = true;
    initiateLaunchSequence();
}

// Launches rocket & audio, displays twinkle & audio, displays congrats modal 
function initiateLaunchSequence() {
    if (correctScore >= 5) {
        hideElements();
        rocket.style.animation = 'shake 0.5s infinite, rocket-launch 10s forwards 6s';
        setTimeout(() => {
            playAudio(launchAudio);
        }, 6000);
        setTimeout(() => {
            rocket.classList.add('hidden');
            document.body.style.overflowX = 'hidden';
            twinkle.classList.remove('hidden');
            setTimeout(() => {
                document.body.style.overflowX = 'unset';
                twinkle.classList.add('hidden');
            }, 1000);
        }, 15000);
        setTimeout(() => {
            playAudio(twinkleAudio);
        }, 14500);
        setTimeout(() => {
            congratsModal.showModal();
        }, 16000);
    } else if (incorrectScore >= 3) {
        hideElements();
        initiateSelfDestruct();
    }
}

// Hides all elements during launch or self destruct sequence
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

// Displays explosion & audio, fire & audio and fail modal
function initiateSelfDestruct() {
    setTimeout(() => {
        clearInterval(timerId);
        rocket.classList.add('hidden');
        explosion.classList.remove('hidden');
        timer.classList.add('hidden');
        fire.classList.remove('hidden');
    }, 6000);
    setTimeout(() => {
        playAudio(explosionAudio);
    }, 5705);
    setTimeout(() => {
        playAudio(fireAudio);
    }, 7500);
    setTimeout(() => {
        failModal.showModal();
    }, 9000);
}

// Rules modal
function openRulesModal() {
    rulesModal.showModal();
}

// When the user clicks on <span> (x), close the modal
function closeRulesModal() {
    rulesModal.close();
}

// Time of day
let today = new Date();
let hours = today.getHours();


timeOfDay();
// Changes background image depending on the users time of day
function timeOfDay() {
    if (hours < 18 && hours > 7) {
        bgImg.style.backgroundImage = "url('assets/images/bg-day.jpg')";
    } else {
        bgImg.style.backgroundImage = "url('assets/images/bg-night.jpg')";
    }
}

// restart button
tryAgain.addEventListener("click", function () {
    window.location.reload();
});

playAgain.addEventListener("click", function () {
    window.location.reload();
});

// setup audio file(s)
function playAudio(audio) {
    audio.load();
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 0.025;
    audio.play();
    // loop the audio file if it's the fire crackling
    if (audio.id == 'fire-audio') {
        audio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }
}

// mutes all audio files
function enableMute() {
    audios.forEach(audio => {
        audio.muted = true;
    });
    unmuteAudio.classList.remove('hidden');
    muteAudio.classList.add('hidden');
}

// unmutes all audio files
function disableMute() {
    audios.forEach(audio => {
        audio.muted = false;
    });
    unmuteAudio.classList.add('hidden');
    muteAudio.classList.remove('hidden');
}