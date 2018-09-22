let level,
  cards,
  pairs,
  stars,
  maxStars,
  moves,
  hints,
  seconds,
  minutes,
  hours,
  timer,
  matched,
  bonusStar,
  matchedRow,
  gameResult,
  currentGameID,
  gameScore,
  historicalGameIDs,
  storageStats;

// GAME'S DIFFICULTY LEVEL

// Define levels
const gameLevels = {
  Easy: {
    cards: 12,
    stars: 5,
    maxStars: 5,
    hints: 3,
    pairs: 6,
    bonusStar: 2
  },
  Medium: {
    cards: 16,
    stars: 4,
    maxStars: 4,
    hints: 2,
    pairs: 8,
    bonusStar: 3
  },
  Hard: {
    cards: 18,
    stars: 3,
    maxStars: 3,
    hints: 1,
    pairs: 9,
    bonusStar: 4
  }
};

// Set variables according to the difficulty level
const setLevel = level => {
  cards = gameLevels[level].cards;
  stars = gameLevels[level].stars;
  maxStars = gameLevels[level].maxStars;
  hints = gameLevels[level].hints;
  pairs = gameLevels[level].pairs;
  bonusStar = gameLevels[level].bonusStar;
};

// GENERATE CARDS

//  Cards images
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
function shuffle (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Generate Cards and add to the DOM, some inspiration from https://www.youtube.com/watch?v=_rUH-sEs68Y
const cardsContainer = document.querySelector('.deck');
const cardsTemplate = img => `<li class="card-wrapper"><div class="card"><i class="fa ${img}"></i></div></li>`;

const generateCards = cards => {
  let shuffledImages = shuffle(cardsImages.slice(0, cards));
  let cardsHTML = shuffledImages.map(img => cardsTemplate(img));
  cardsContainer.innerHTML = cardsHTML.join('');
};

// GENERATE STARS

// Generate Stars and add to the DOM
const starsContainer = document.querySelector('.stars-wrapper');
const starsTemplate = '<li><i class="fa fa-star"></i></li>';

const generateStars = stars => {
  let starsHTML = starsTemplate.repeat(stars);
  starsContainer.innerHTML = starsHTML;
};

// CREATE TIMER

// Pad function adapted from https://stackoverflow.com/q/20618355
const padTime = timeUnit => timeUnit < 10 ? (timeUnit = '0' + timeUnit) : timeUnit;

// Create Timer and add to the DOM
const timerContainer = document.querySelector('.time');
const setTime = () => {
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
};

// Start Timer
const startTime = () => { timer = setInterval(setTime, 1000); };

// Stop Timer
const stopTime = () => clearInterval(timer);

// CREATE MOVES COUNTER

// Generate Moves counter and add to the DOM
const movesContainer = document.querySelector('.moves');
const generateMoves = () => { movesContainer.innerHTML = moves; };

// Once the user makes the move, increment number of moves and update the DOM
const addMove = () => {
  moves++;
  movesContainer.textContent = moves;
};

// CREATE HINTS

// Generate Hints and add to the DOM
const hintsContainer = document.querySelector('.hints-wrapper');
const hintsTemplate = '<li><i class="fa fa-lightbulb"></i></li>';

const generateHints = hints => {
  let hintsHTML = hintsTemplate.repeat(hints);
  hintsContainer.innerHTML = hintsHTML;
};

// CREATE SCOREBOARDs

// Save current game statistics
function currentGameStats () {
  gameScore = {
    [currentGameID]: {
      level: level,
      result: gameResult,
      stars: stars,
      moves: moves,
      hints: hints,
      time: padTime(hours) + ':' + padTime(minutes) + ':' + padTime(seconds),
      matched: matched
    }
  };
  return gameScore;
}

// Save statistics of current game in the local storage
const saveGameStats = () => {
  if ('GameStats' in window.localStorage) {
    storageStats = JSON.parse(window.localStorage.getItem('GameStats'));
    historicalGameIDs = Object.keys(storageStats).map(Number);
    currentGameID = Math.max(...historicalGameIDs) + 1;
    gameScore = currentGameStats();
    storageStats = { ...storageStats,
      ...gameScore
    };
  } else {
    currentGameID = 1;
    storageStats = currentGameStats();
  }

  let gameStats = JSON.stringify(storageStats);
  window.localStorage.setItem('GameStats', gameStats);
};

// Scoreboard template
const scoreboardTemplate = (level, result, matched, stars, moves, hints, time) =>
  `<tr class="score">
    <td>${level}</td>
    <td>${result}</td>
    <td>${matched}</td>
    <td>${stars}</td>
    <td>${moves}</td>
    <td>${hints}</td>
    <td>${time}</td>
    </tr>`;

// Generate scoreboard and add to the DOM
const scoreboardContainer = document.querySelector('.scoreboard-results');
const generateScoreboard = () => {
  if ('GameStats' in window.localStorage) {
    storageStats = Object.values(JSON.parse(window.localStorage.getItem('GameStats')));
    let scoresHTML = storageStats.slice(storageStats.length - 5).map(record => scoreboardTemplate(record.level, record.result, record.matched, record.stars, record.moves, record.hints, record.time));
    scoreboardContainer.innerHTML = scoresHTML.reverse().join('');
  }
};

// Generate result for the current game and add to the DOM
const resultContainer = document.querySelector('.final-result');
const generateFinalResult = () => {
  let finalResult = currentGameStats();
  currentGameID = Object.keys(finalResult)[0];
  let finalResultHTML = scoreboardTemplate(
    finalResult[currentGameID].level,
    finalResult[currentGameID].result,
    finalResult[currentGameID].matched,
    finalResult[currentGameID].stars,
    finalResult[currentGameID].moves,
    finalResult[currentGameID].hints,
    finalResult[currentGameID].time
  );
  resultContainer.innerHTML = finalResultHTML;
};

// MODALS

// Welcome modal
const toggleWelcomeModal = () => {
  const modal = document.querySelector('.modal.welcome');
  modal.classList.toggle('hide');
  document.body.classList.toggle('modal-open');
};

// Game won / over modal
const toggleResultModal = () => {
  const modal = document.querySelector('.modal.game-result');
  modal.classList.toggle('hide');
  document.body.classList.toggle('modal-open');
};

// Scoreboard modal
const toggleScoreModal = () => {
  const scoreModal = document.querySelector('.modal.score');
  generateScoreboard();
  scoreModal.classList.toggle('hide');
  document.body.classList.toggle('modal-open');
};

// GAME LOGIC

// Show Cards for the first 5 seconds of the game
const htmlElement = document.querySelector('html');
const showCards = () => {
  document.querySelectorAll('.card').forEach(card => card.classList.add('show', 'cards-blink'));
  htmlElement.classList.add('avoid-clicks');
  setTimeout(() => {
    document.querySelectorAll('.card').forEach(card => card.classList.remove('show', 'cards-blink'));
    htmlElement.classList.remove('avoid-clicks');
  }, 6000);
};

// Flip Cards on click
const flipCards = card => {
  card.classList.toggle('open');
  card.classList.toggle('show');
};

// Hint - show a random card for 1 second when the user clicks on the hint icon
// Once hint is used, decrement number of hints and update the DOM
// Random card selection logic from https://stackoverflow.com/a/4550514

const removeHint = () => {
  hints--;
  let hintsList = Array.from(document.querySelectorAll('.fa-lightbulb'));
  for (let i = hintsList.length - 1; i >= 0; i--) {
    if (!hintsList[i].classList.contains('used')) {
      hintsList[i].classList.toggle('used');
      break;
    }
  }
};

const giveHint = () => {
  if (hints >= 1) {
    let unmatchedCards = Array.from(document.querySelectorAll('div.card:not(.match):not(.open)'));
    let randomCard = unmatchedCards[Math.floor(Math.random() * unmatchedCards.length)];
    flipCards(randomCard);
    setTimeout(() => {
      flipCards(randomCard);
    }, 1000);
    removeHint();
  }
};

// Check if selected cards match
let openCards = [];

const matchCards = selectedCards => {
  if (selectedCards[0].firstElementChild.className === selectedCards[1].firstElementChild.className) {
    selectedCards[0].classList.toggle('match');
    selectedCards[1].classList.toggle('match');
    openCards = [];
    cardsMatch();
  } else {
    setTimeout(() => {
      flipCards(selectedCards[0]);
      flipCards(selectedCards[1]);
      openCards = [];
    }, 1000);
    cardsDontMatch();
  }
};

// If the cards match, give a bonus star for matching cards n times in a row, check if the game is won
const cardsMatch = () => {
  matched++;
  matchedRow++;
  if (matchedRow === bonusStar) {
    if (stars < maxStars) {
      stars++;
      let starsList = Array.from(document.querySelectorAll('.fa-star'));
      for (let i = 0; i < starsList.length; i++) {
        if (starsList[i].classList.contains('lost')) {
          starsList[i].classList.toggle('lost');
          break;
        }
      }
    }
    matchedRow = 0;
  }
  if (pairs === matched) {
    gameResult = 'Won';
    gameWon();
  }
};

// If cards do not match, remove star, check if game is over
const cardsDontMatch = () => {
  stars--;
  matchedRow = 0;
  let starsList = Array.from(document.querySelectorAll('.fa-star'));
  for (let i = starsList.length - 1; i >= 0; i--) {
    if (!starsList[i].classList.contains('lost')) {
      starsList[i].classList.toggle('lost');
      break;
    }
  }
  if (stars === 0) {
    gameResult = 'Lost';
    gameOver();
  }
};

// If the game is over, stop time, collect stats and display modal with the game result
const gameWon = () => {
  stopTime();
  saveGameStats();
  generateFinalResult();
  document.querySelector('.game-won').classList.remove('hide');
  toggleResultModal();
};

// If the game is over, stop time, collect stats and display modal with the game result
const gameOver = () => {
  stopTime();
  saveGameStats();
  generateFinalResult();
  document.querySelector('.game-over').classList.remove('hide');
  toggleResultModal();
};

// INITIATE THE GAME
const startGame = level => {
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
};

// Toggle humburger menu
const navbarSettings = document.querySelector('.navbar-settings');
const toggleHamburger = () => { navbarSettings.classList.toggle('navbar-list-show'); };

// EVENT LISTENERS

const humburgerButton = document.querySelector('.navbar-hamburger');
humburgerButton.addEventListener('click', () => {
  toggleHamburger();
});

// Select game level
const easyLevelButton = document.querySelector('#easy-level');
easyLevelButton.addEventListener('click', () => {
  toggleWelcomeModal();
  level = 'Easy';
  startGame(level);
});

const mediumLevelButton = document.querySelector('#medium-level');
mediumLevelButton.addEventListener('click', () => {
  toggleWelcomeModal();
  level = 'Medium';
  startGame(level);
});

const hardLevelButton = document.querySelector('#hard-level');
hardLevelButton.addEventListener('click', () => {
  toggleWelcomeModal();
  level = 'Hard';
  startGame(level);
});

// Cards
// Some inspiration from https://matthewcranford.com/memory-game-walkthrough-part-3-matching-pairs/
cardsContainer.addEventListener('click', e => {
  const clickTarget = e.target;
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

// Hints
hintsContainer.addEventListener('click', () => giveHint());

// Toogle game won / over modal
const playAgainButton = document.querySelector('.play-again');
playAgainButton.addEventListener('click', () => {
  toggleResultModal();
  startGame(level);
});

// Scoreboard
const mainShowScoreboardButton = document.querySelector('.main-show-scoreboard');
const resultsShowScoreboardButton = document.querySelector('.results-show-scoreboard');
const scoreboardCloseButton = document.querySelector('.scoreboard-close');

// Scoreboard show button - main screen
mainShowScoreboardButton.addEventListener('click', () => {
  toggleScoreModal();
});

// Scoreboard show button -  game won / over modal
resultsShowScoreboardButton.addEventListener('click', () => {
  scoreboardCloseButton.classList.add('back-results');
  toggleResultModal();
  toggleScoreModal();
});

// Scoreboard back button
scoreboardCloseButton.addEventListener('click', e => {
  const clickTarget = e.target;
  if (clickTarget.classList.contains('back-results')) {
    toggleScoreModal();
    toggleResultModal();
    clickTarget.classList.remove('back-results');
  } else {
    toggleScoreModal();
  }
});

// Restart game button
const restartGameButton = document.querySelector('.restart-button');
restartGameButton.addEventListener('click', () => startGame(level));

// Change level button
const changeLevelButton = document.querySelector('.level-button');
changeLevelButton.addEventListener('click', () => {
  toggleWelcomeModal();
});
    toggleScoreModal();
  }
});

// Restart game button
const restartGameButton = document.querySelector('.restart-button');
restartGameButton.addEventListener('click', () => startGame(level));

// Change level button - main page
const changeLevelButton = document.querySelector('.level-button');
changeLevelButton.addEventListener('click', () => {
  toggleWelcomeModal();
});

// Change level button - modal
const changeLevelButtonModal = document.querySelector('.change-level');
changeLevelButtonModal.addEventListener('click', () => {
  toggleResultModal();
  toggleWelcomeModal();
});