let startBtn = document.getElementById('start-btn');

let nextBtn = document.getElementById('next-btn');

let questionCard = document.getElementById('question-card')

let questionElement = document.getElementById('question')

let answerButtons = document.getElementById('answer-buttons')

// this creates two new variables which will default both to 'undefined'
let randomQuestions, currentQuestion


// This means that whenever we click on the 'Start' button, it will run the code in the startQuiz function.
startBtn.addEventListener('click', startQuiz)
nextBtn.addEventListener('click', () => {
    currentQuestion++
    nextQuestion();
})


// -----------------------------------------FUNCTIONS---------------------------------------------------------------

// function to start the game when the 'Start' button is clicked
function startQuiz() {
   
    // this adds the class of 'hidden' and hides the start button once clicked
    startBtn.classList.add('hidden');

    // this shuffles all relevant questions for us and produces random order
    randomQuestions = questions.sort(() => Math.random() - .5);

    // this starts from the very first question in the shuffled questions array
    currentQuestion = 0;
   
    // this removes the hidden class and allows the question container to be displayed
    questionCard.classList.remove('hidden');

    nextQuestion();
}


// This is going to set the next question when the 'Next' button is clicked
function nextQuestion() {
    // resets everything back to its default state everytime we set a new question
    resetState()
    // this shows the next question at the current question index
    showQuestion(randomQuestions[currentQuestion]);
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
        button.addEventListener('click', userAnswer)
        answerButtons.appendChild(button);
    })
}

function resetState() {
    clearStatusClass(document.body);
    nextBtn.classList.add('hidden');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

// This is when we actually select an answer
function userAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (randomQuestions.length > currentQuestion + 1) {
        // shows the 'Next' button after you answer a question
        nextBtn.classList.remove('hidden') 
    } else {
        startBtn.innerText = 'Restart';
        startBtn.classList.remove('hidden');
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