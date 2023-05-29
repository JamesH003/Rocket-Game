/* jshint esversion: 11 */

// setting a list of questions and initialising it to an array
const questions = [
    {
        question: 'Who was the first animal to orbit the Earth',
        answers: [{
                text: 'Laika the Dog',
                correct: true
            },
            {
                text: 'Edward the Elephant',
                correct: false
            },
            {
                text: 'Bernard the Monkey',
                correct: false
            },
            {
                text: 'Ham the Chimp',
                correct: false
            },
        ]
    },
    {
        question: 'Who was the first man to walk on the moon?',
        answers: [{
                text: 'Michael Jackson',
                correct: false
            },
            {
                text: 'Buzz Lightyear',
                correct: false
            },
            {
                text: 'Neil Armstrong',
                correct: true
            },
            {
                text: 'Michael Collins',
                correct: false
            },
        ]
    },
    {
        question: 'What does the "ISS" stand for?',
        answers: [{
                text: 'Instant Salami Sandwich',
                correct: false
            },
            {
                text: 'Ionic Space Shield',
                correct: false
            },
            {
                text: 'Incredible Space Suit',
                correct: false
            },
            {
                text: 'International Space Station',
                correct: true
            }
        ]
    },
    {
        question: 'How far away is the Sun?',
        answers: [{
                text: '200 Thousand Miles',
                correct: false
            },
            {
                text: '93 Million Miles',
                correct: true
            },
            {
                text: '88 Billion Miles',
                correct: false
            },
            {
                text: 'Quadrillion Miles',
                correct: false
            }
        ]
    },
    {
        question: 'Instead of water, what rains on Jupiter?',
        answers: [{
                text: 'Acid',
                correct: false
            },
            {
                text: 'Iron',
                correct: false
            },
            {
                text: 'Fire',
                correct: false
            },
            {
                text: 'Diamonds',
                correct: true
            }
        ]
    },
    {
        question: 'How long does it take for people to go to the moon?',
        answers: [{
                text: '3 days',
                correct: true
            },
            {
                text: '2 weeks',
                correct: false
            },
            {
                text: '5 hours',
                correct: false
            },
            {
                text: '6 days',
                correct: false
            }
        ]
    },
    {
        question: 'What is the smallest planet in the Solar System?',
        answers: [{
                text: 'Venus',
                correct: false
            },
            {
                text: 'Saturn',
                correct: false
            },
            {
                text: 'Neptune',
                correct: false
            },
            {
                text: 'Mercury',
                correct: true
            }
        ]
    },
    {
        question: 'In what galaxy is the Earth in?',
        answers: [{
                text: 'The Solar Galaxy',
                correct: false
            },
            {
                text: 'The Milky Way',
                correct: true
            },
            {
                text: 'The Shiny Way',
                correct: false
            },
            {
                text: 'Andromeda Galaxy',
                correct: false
            }
        ]
    },
    {
        question: 'How many planets are there in the solar system?',
        answers: [{
                text: '8',
                correct: false
            },
            {
                text: '9',
                correct: true
            },
            {
                text: '7',
                correct: false
            },
            {
                text: '10',
                correct: false
            }
        ]
    },
    {
        question: 'Which planet is named after the Roman god of war?',
        answers: [{
                text: 'Venus',
                correct: false
            },
            {
                text: 'Mars',
                correct: true
            },
            {
                text: 'Jupiter',
                correct: false
            },
            {
                text: 'Saturn',
                correct: false
            }
        ]
    },
    {
        question: 'Which planet has a day which lasts eight months?',
        answers: [{
                text: 'Mercury',
                correct: false
            },
            {
                text: 'Venus',
                correct: true
            },
            {
                text: 'Uranus',
                correct: false
            },
            {
                text: 'Saturn',
                correct: false
            }
        ]
    },
    {
        question: 'What is the term for a natural satellite?',
        answers: [{
                text: 'Nebula',
                correct: false
            },
            {
                text: 'Moon',
                correct: true
            },
            {
                text: 'Comet',
                correct: false
            },
            {
                text: 'Asteroid',
                correct: false
            }
        ]
    },
    {
        question: 'Who was the first man in space?',
        answers: [{
                text: 'Neil Armstrong',
                correct: false
            },
            {
                text: 'Yuri Gagarin',
                correct: true
            },
            {
                text: 'Buzz Aldrin',
                correct: false
            },
            {
                text: 'Chris Hadfield',
                correct: false
            }
        ]
    },
    {
        question: 'How many constellations are there?',
        answers: [{
                text: '77',
                correct: false
            },
            {
                text: '88',
                correct: true
            },
            {
                text: '66',
                correct: false
            },
            {
                text: '99',
                correct: false
            }
        ]
    },
    {
        question: 'What shape is the Milky Way?',
        answers: [{
                text: 'Circle',
                correct: false
            },
            {
                text: 'Spiral',
                correct: true
            },
            {
                text: 'Triangle',
                correct: false
            },
            {
                text: 'Oval',
                correct: false
            }
        ]
    },
    {
        question: 'Which planet takes almost 30 Earth years to orbit the sun?',
        answers: [{
                text: 'Mercury',
                correct: false
            },
            {
                text: 'Saturn',
                correct: true
            },
            {
                text: 'Venus',
                correct: false
            },
            {
                text: 'Jupiter',
                correct: false
            }
        ]
    },
    {
        question: 'What was the name of the Apollo 11 lunar lander?',
        answers: [{
                text: 'Bounty',
                correct: false
            },
            {
                text: 'Eagle',
                correct: true
            },
            {
                text: 'Beagle',
                correct: false
            },
            {
                text: 'Enterprise',
                correct: false
            }
        ]
    },
    {
        question: 'What was the first man-made satellite?',
        answers: [{
                text: 'Voyager',
                correct: false
            },
            {
                text: 'Sputnik',
                correct: true
            },
            {
                text: 'Apollo 8',
                correct: false
            },
            {
                text: 'Telstar',
                correct: false
            }
        ]
    },
    {
        question: 'Which astronaut became the president of an airline?',
        answers: [{
                text: 'John Glenn',
                correct: false
            },
            {
                text: 'Frank Borman',
                correct: true
            },
            {
                text: 'Buzz Aldrin',
                correct: false
            },
            {
                text: 'Neil Armstrong',
                correct: false
            }
        ]
    },
    {
        question: 'What was the first manned flight around the moon?',
        answers: [{
                text: 'Soyuz 12',
                correct: false
            },
            {
                text: 'Apollo 8',
                correct: true
            },
            {
                text: 'Apollo 11',
                correct: false
            },
            {
                text: 'Gemini 2',
                correct: false
            }
        ]
    }

];
