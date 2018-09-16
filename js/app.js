// Set Game Level
let level, cards, stars, hints, pairs, minMatch, maxStars;

const gameLevels = {
    easy: {
        cards: 12,
        stars: 5,
        maxStars: 5,
        hints: 3,
        pairs: 6,
        minMatch: 2
    },
    medium: {
        cards: 16,
        stars: 4,
        maxStars: 4,
        hints: 2,
        pairs: 8,
        minMatch: 3
    },
    hard: {
        cards: 20,
        stars: 3,
        maxStars: 3,
        hints: 1,
        pairs: 10,
        minMatch: 4
    }
};

const setLevel = level => {
    cards = gameLevels[level].cards;
    stars = gameLevels[level].stars;
    maxStars = gameLevels[level].maxStars;
    hints = gameLevels[level].hints;
    pairs = gameLevels[level].pairs;
    minMatch = gameLevels[level].minMatch;
};


//  Create a list that holds all cards
let cardsImages = [
    'fa-anchor',
    'fa-anchor',
    'fa-bicycle',
    'fa-bicycle',
    'fa-bolt',
    'fa-bolt',
    'fa-bomb',
    'fa-bomb',
    'fa-cube',
    'fa-cube',
    'fa-gem',
    'fa-gem',
    'fa-leaf',
    'fa-leaf',
    'fa-paper-plane',
    'fa-paper-plane',
    'fa-balance-scale',
    'fa-balance-scale',
    'fa-beer',
    'fa-beer',
    'fa-chess',
    'fa-chess',
    'fa-futbol',
    'fa-futbol'
];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// Generate Cards
// Some inspiration from https://www.youtube.com/watch?v=_rUH-sEs68Y
const cardsContainer = document.querySelector('.deck');

function cardsTemplate(img) {
    return `<li class="card"><i class="fa ${img}"></i></li>`;
}

function generateCards(cards) {
    shuffledImages = shuffle(cardsImages.slice(0, cards));
    let cardsHTML = shuffledImages.map(function (img) {
        return cardsTemplate(img);
    });

    cardsContainer.innerHTML = cardsHTML.join('');
}

// Generate Stars
const starsContainer = document.querySelector('.stars');
const starsTemplate = '<li><i class="fa fa-star"></i></li>';

function generateStars(stars) {
    let starsHTML = starsTemplate.repeat(stars);
    starsContainer.innerHTML = starsHTML;
}

// Generate Hints
const hintsContainer = document.querySelector('.hints');
const hintsTemplate = '<li><i class="fa fa-lightbulb"></i></li>';

function generateHints(hints) {
    let hintsHTML = hintsTemplate.repeat(hints);
    hintsContainer.innerHTML = hintsHTML;
}


// Add Timer
// Some inspiration from https://stackoverflow.com/q/20618355
let seconds = 0;
let minutes = 0;
let hours = 0;
const timerContainer = document.querySelector('.time');

function padTime(timeUnit) {
    if (timeUnit < 10) {
        timeUnit = '0' + timeUnit;
    }
    return timeUnit;
}

function setTime() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    timerContainer.textContent = padTime(hours) + ':' + padTime(minutes) + ':' + padTime(seconds);
}

let timer = null;

function startTime() {
    timer = setInterval(setTime, 1000);
}

function stopTime() {
    clearInterval(timer);
}


// Show Cards for 5 seconds
function showCards() {
    document.querySelectorAll('.card').forEach(function (card) {
        card.classList.add('open', 'show');
    });
    setTimeout(function () {
        document.querySelectorAll('.card').forEach(function (card) {
            card.classList.remove('open', 'show');
        });
    }, 5000);
}


// Count Moves
let moves = 0;
const movesContainer = document.querySelector('.moves');

function generateMoves() {
    movesContainer.innerHTML = moves;
}

function addMove() {
    moves++;
    movesContainer.textContent = moves;
}


// Flip Card
function flipCards(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}


// Check if Cards Match
let openCards = [];

function matchCards(selectedCards) {
    if (selectedCards[0].firstElementChild.className === selectedCards[1].firstElementChild.className) {
        selectedCards[0].classList.toggle('match');
        selectedCards[1].classList.toggle('match');
        openCards = [];
        gainLive()
    } else {
        setTimeout(function () {
            flipCards(selectedCards[0]);
            flipCards(selectedCards[1]);
            openCards = [];
        }, 1000);
        loseLive();
    }
}

function gameWon() {
    stopTime();
    finalStats();
    document.querySelector('.game-won').classList.remove('hide');
    toggleModal();
}

function gameOver() {
    stopTime();
    finalStats();
    document.querySelector('.game-over').classList.remove('hide');
    toggleModal();
}

// Add Star for matching cards n times in a row
let matched = 0;
let matchedRow = 0;

function gainLive() {
    matched++;
    matchedRow++;
    if (matchedRow === minMatch) {
        if (stars < maxStars) {
            stars++;
            let starsList = Array.prototype.slice.call(document.querySelectorAll('.fa-star'));
            for (let i = 0; i < starsList.length; i++) {
                if (starsList[i].classList.contains('lost')) {
                    starsList[i].classList.toggle('lost');
                    break;
                }
            }
        };
        matchedRow = 0;
    }
    if (pairs === matched) {
        gameWon();
    }
}


// Remove star for not matching cards
function loseLive() {
    stars--;
    matchedRow = 0;
    let starsList = Array.prototype.slice.call(document.querySelectorAll('.fa-star'));
    for (let i = starsList.length - 1; i >= 0; i--) {
        if (!starsList[i].classList.contains('lost')) {
            starsList[i].classList.toggle('lost');
            break;
        }
    }
    if (stars === 0) {
        gameOver();
    }
}


// Give Hints
// Random card selection logic from https://stackoverflow.com/a/4550514
function giveHint() {
    if (hints >= 1) {
        let unmatchedCards = Array.prototype.slice.call(document.querySelectorAll('li.card:not(.match):not(.open)'));
        let randomCard = unmatchedCards[Math.floor(Math.random() * unmatchedCards.length)];
        flipCards(randomCard);
        setTimeout(function () {
            flipCards(randomCard);
        }, 1000);
        removeHint();
    }
}

function removeHint() {
    hints--;
    let hintsList = Array.prototype.slice.call(document.querySelectorAll('.fa-lightbulb'));
    for (let i = hintsList.length - 1; i >= 0; i--) {
        if (!hintsList[i].classList.contains('used')) {
            hintsList[i].classList.toggle('used');
            break;
        }
    }
}


// Cards interactivity
cardsContainer.addEventListener('click', function (e) {
    const clickTarget = event.target;
    if (clickTarget.classList.contains('card') &&
        !clickTarget.classList.contains('match') &&
        (openCards.length < 2) &&
        !openCards.includes(clickTarget)
    ) {
        flipCards(clickTarget);
        openCards.push(clickTarget);
        if (openCards.length === 2) {
            addMove();
            matchCards(openCards);
        }
    }
});


// Hint interactivity
hintsContainer.addEventListener('click', function () {
    giveHint();
});


// Show game won / over modal
function toggleModal() {
    const modal = document.querySelector('.modal.game-result');
    modal.classList.toggle('hide');
    document.body.classList.toggle('modal-open');
}

// Display stats
function finalStats() {
    document.querySelector('.final-stars').innerHTML = stars;
    document.querySelector('.final-moves').innerHTML = moves;
    document.querySelector('.final-time').textContent = padTime(hours) + ':' + padTime(minutes) + ':' + padTime(seconds);
    document.querySelector('.final-hints').innerHTML = hints;
    document.querySelector('.final-matched').innerHTML = matched;
}


// Close modal
document.querySelectorAll('.close').forEach(function (element) {
    element.addEventListener('click', function () {
        toggleModal();
        startGame(level);
    });
});

// Restart button interactivity
const restartContainer = document.querySelector('.restart');
restartContainer.addEventListener('click', function () {
    startGame(level);
});


// Initiate the game
function startGame(level) {
    document.querySelector('.game-over').classList.add('hide');
    document.querySelector('.game-won').classList.add('hide');
    stopTime();
    seconds = 0;
    minutes = 0;
    hours = 0;
    moves = 0;
    matched = 0;
    matchedRow = 0;
    setLevel(level);
    generateCards(cards);
    generateStars(stars);
    generateHints(hints);
    generateMoves();
    startTime();
    showCards();
}

// Display welcome modal
function toggleWelcomeModal() {
    const modal = document.querySelector('.modal.welcome');
    modal.classList.toggle('hide');
    document.body.classList.toggle('modal-open');
}

// Select game level
document.querySelector('#easy-level').addEventListener('click', function () {
    toggleWelcomeModal();
    level = 'easy';
    startGame(level);
});

document.querySelector('#medium-level').addEventListener('click', function () {
    toggleWelcomeModal();
    level = 'medium';
    startGame(level);
});

document.querySelector('#hard-level').addEventListener('click', function () {
    toggleWelcomeModal();
    level = 'hard';
    startGame(level);
});

// Change level button
document.querySelector('.change-level').addEventListener('click', function () {
    toggleWelcomeModal();
});