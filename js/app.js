
//  Create a list that holds all cards
let cards = Array.prototype.slice.call(document.getElementsByClassName('card'));

/*
 * Array.from is not supported in Internet Exploter
 * let cards = Array.from(document.getElementsByClassName('card'));
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// Shuffle the list of cards
cards = shuffle(cards);

// Loop through each card and create its HTML
const cardsList = document.createDocumentFragment();

for (let i = 0; i < cards.length; i++) {
    cardsList.appendChild(cards[i]);
};

/*
 * for...of loop is not supported in Internet Exploter
 * for (let card of shuffledCards) {
 *     cardsList.appendChild(card);
 *  }
 */

// Add card's HTML to the page
const cardDeck = document.querySelector('.deck');
cardDeck.appendChild(cardsList);

// Reset game when restart button is clicked
const restartGame = document.querySelector('.restart');
restartGame.addEventListener('click', function() { window.location.reload();})

// Add timer
// Some inspiration taken from https://stackoverflow.com/q/20618355
let seconds = 0;
let minutes = 0;
let hours = 0;
const timerHTML = document.querySelector('.time');

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
    timerHTML.textContent = padTime(hours) + ':' + padTime(minutes) + ':' + padTime(seconds);
}

setInterval(setTime, 1000);


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */