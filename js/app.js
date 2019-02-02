//check if cards match
let openCards = [];
//number of matched cards
let flippedCards = 0;

//cards
const deck = document.querySelector('.deck');
const card = document.getElementsByClassName('card');
const allCards = ['fas fa-dice-three', 'fas fa-cat', 'far fa-grin-stars', 'fas fa-hamburger',
                  'fas fa-cookie-bite', 'fas fa-music', 'fas fa-pizza-slice', 'fas fa-dog',
                  'fas fa-dice-three', 'fas fa-cat', 'far fa-grin-stars', 'fas fa-hamburger',
                  'fas fa-cookie-bite', 'fas fa-music', 'fas fa-pizza-slice', 'fas fa-dog'];

//moves
const getMoves = document.querySelector('.moves');
let moves = 0;

//time
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
let timeOff = true;
let time = 0;
let gameTime;

//stars
const stars = document.querySelectorAll('.stars-list');
let totalStars = 0;

//modal, reset
const starsModal = document.querySelector('.starsNum');
const timeModal = document.querySelector('.timeNum');
const movesModal = document.querySelector('.movesNum');
const playAgain = document.getElementById('play-again');
const modalBox = document.querySelector('.modal-container');
const restartGame = document.querySelector('.restart');

window.onload = () => {
  shuffledCards();
}

//function to shuffle cards from stackoverflow
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
}

//shuffling the cards, creating cards
function shuffledCards() {
  const newCards = shuffle(allCards);
  deck.innerHTML = '';
  newCards.forEach((cards) => {
    const cardList = document.createElement('li');
    cardList.classList.add('card');
    cardList.innerHTML = '<i class="' + cards + ' flip-card"></i>';
    deck.appendChild(cardList);
  });
  for (let i = 0; i < card.length; i++) {
    card[i].addEventListener('click', clickCard);
    card[i].className = 'card';
  }
}

//timer begins when player clicks a card
//only 2 cards can be flipped over per guess
function clickCard() {
  if (moves === 0) {
    if (timeOff) {
      gameCounter();
      timeOff = false;
    } else if (time <= 0) {
      pauseTime();
      gameCounter();
    }
  }

  if (openCards.length < 2 && !openCards.includes(this)) {
    this.classList.toggle('show');
    this.classList.toggle('open');
    openCards.push(this);
    checkMatch();
  }
}

//if match, add to flippedCards, clear openCards
//if no match, flip them over, clear openCards
function checkMatch() {
  if (openCards.length === 2) {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      openCards[0].classList.add('match', 'disable');
      openCards[1].classList.add('match', 'disable');
      flippedCards += 2;
      openCards = [];
      playerMoves();
      newGame();
    } else {
      setTimeout(function() {
        openCards[0].classList.remove('open', 'show');
        openCards[1].classList.remove('open', 'show');
        openCards = [];
        playerMoves();
      }, 350);
    }
  }
}

function displayMoves() {
  getMoves.innerHTML = moves;
}

//number of moves player makes
function playerMoves() {
  moves++;
  displayMoves();
  removeStar();
}

//hides a star when moves increase
function removeStar() {
  switch (moves) {
    case 15:
      stars[2].style.visibility = 'hidden';
      break;
    case 20:
      stars[1].style.visibility = 'hidden';
      break;
    case 25:
      stars[0].style.visibility = 'hidden';
      break;
  }

  //number of stars in modal based on moves
  if (moves < 15) {
    totalStars = 3;
  } if (moves >= 15 && moves < 20) {
    totalStars = 2;
  } if (moves >= 20 && moves < 25) {
    totalStars = 1;
  } if (moves >= 25) {
    totalStars = 0;
  }
}

function displayTime() {
  minutes.innerHTML = ('0' + parseInt(time/60)).substr(-2);
  seconds.innerHTML = ('0' + (time % 60)).substr(-2);
}

//game timer
function gameCounter() {
  gameTime = setInterval(() => {
    time++;
    displayTime();
  }, 1000);
}

function pauseTime() {
  clearInterval(gameTime);
}

//player wins when all cards are matched
function newGame() {
  if (flippedCards === allCards.length) {
    modalOpen();
    clearInterval(gameTime);
    restartGame.classList.add('disable');
  }
}

function resetMoves() {
  moves = 0;
  displayMoves();
}

function addStars() {
  for (let i = 0; i < stars.length; i++) {
    stars[i].removeAttribute('style');
  }
}

//resets the game
restartGame.addEventListener('click', resetButton);
function resetButton() {
  shuffledCards();
  resetMoves();
  addStars();
  time = 0;
  displayTime();
  pauseTime();
  flippedCards = 0;
  openCards = [];
  restartGame.classList.remove('disable');
}

//modal pop up for stats
function modalOpen() {
  modalBox.classList.toggle('hide-modal');
  timeModal.innerHTML = 'Time: ' + minutes.innerText + ':' + seconds.innerText;
  starsModal.innerHTML = 'Stars: ' + totalStars;
  movesModal.innerHTML = 'Moves: ' + moves;
}
//hides modal
modalOpen();

//play again button in modal to reset the game
playAgain.addEventListener('click', () => {
  resetButton();
  modalOpen();
});