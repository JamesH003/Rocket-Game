// defines the var startButton as the 'Start' button 
const startButton = document.getElementById('start-btn');
// defines the var questionContainerElement as the Question container

// defines the var nextButton as the 'Next' button
const nextButton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container')

// defines the var questionElement as the question div
const questionElement = document.getElementById('question')

// defines the var answerButtonsElement as the answer buttons div
const answerButtonsElement = document.getElementById('answer-buttons')

// this just creates two new variables which will default both to 'undefined'
let shuffledQuestions, currentQuestionIndex


// This means that whenever we click on the 'Start' button, it will run the code in the startGame function.
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion();
})


// -----------------------------------------FUNCTIONS---------------------------------------------------------------

// function to start the game when the 'Start' button is clicked
function startGame() {
   
    // this adds the class of 'hide' and hides the start button once clicked
    startButton.classList.add('hide');

    // this shuffles all relevant questions for us
    shuffledQuestions = questions.sort(() => Math.random() - .5);

    // this starts from the very first question in the shuffled questions array
    currentQuestionIndex = 0;
   
    // this removes the hide class and allows the question container to be displayed
    questionContainerElement.classList.remove('hide');

    setNextQuestion();
}


// This is going to set the next question when the 'Next' button is clicked
function setNextQuestion() {
    // resets everything back to its default state everytime we set a new question
    resetState()
    // this shows the next question at the current question index
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}


// ???????????????? question.question
// assigns buttons to the various answers for the user to choose from?
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        } 
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button);
    })
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

// This is when we actually select an answer
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        // shows the 'Next' button after you answer a question
        nextButton.classList.remove('hide') 
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
    
}

// sets the status of both the selected answer button and the body - changes the color to green or red depending on whether the answer is correct or incorrect
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('incorrect')
    }
}

// clears the status from the previous question (green or red color)
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}



// setting a list of questions and initialising it to an array
const questions = [
    {
        question: 'Who was the first animal to orbit the Earth', 
        answers: [
            { text: 'Laika the Dog', correct: true},
            { text: 'Edward the Elephany', correct: false},
            { text: 'Bernard the Monkey', correct: false},
            { text: 'Ham the Chimp', correct: false},
        ]
    },
    {
        question: 'Who was the first man to walk on the moon?', 
        answers: [
            { text: 'Michael Jackson', correct: false},
            { text: 'Buzz Lightyear', correct: false},
            { text: 'Neil Armstrong', correct: true},
            { text: 'Michael Collins', correct: false},
        ]
    }, 
    {
        question: 'What does the "ISS" stand for?', 
        answers: [
            { text: 'Instant Salami Sandwich', correct: false},
            { text: 'Ionic Space Shield', correct: false},
            { text: 'Incredible Space Suit', correct: false},
            { text: 'International Space Station', correct: true}
        ]
    },
    {
        question: 'How far away is the Sun?', 
        answers: [
            { text: '200 Thousand Miles', correct: false},
            { text: '93 Million Miles', correct: true},
            { text: '88 Billion Miles', correct: false},
            { text: 'Quadrillion Miles', correct: false}
        ]
    },
    {
        question: 'Instead of water, what rains on Jupiter?', 
        answers: [
            { text: 'Acid', correct: false},
            { text: 'Iron', correct: false},
            { text: 'Fire', correct: false},
            { text: 'Diamonds', correct: true}
        ]
    },
    {
        question: 'How long does it take for people to go to the moon?', 
        answers: [
            { text: '3 days', correct: true},
            { text: '2 weeks', correct: false},
            { text: '5 hours', correct: false},
            { text: '6 days', correct: false}
        ]
    },
    {
        question: 'What is the smallest planet in the Solar System?', 
        answers: [
            { text: 'Venus', correct: false},
            { text: 'Saturn', correct: false},
            { text: 'Neptune', correct: false},
            { text: 'Mercury', correct: true}
        ]
    },
    {
        question: 'In what galaxy is the Earth in?', 
        answers: [
            { text: 'The Solar Galaxy', correct: false},
            { text: 'The Milky Way', correct: true},
            { text: 'The Shiny Way', correct: false},
            { text: 'Andromeda Galaxy', correct: false}
        ]
    },

]




// function to keep score

// function for 30 second timer 

// function for time of day 

// function to initiate launch sequence 