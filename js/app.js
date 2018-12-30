//openCards array
let openCards = [];
//number of matched cards
let flippedCards = 0;
//a single card in the deck
const card = document.querySelectorAll('.card');
//all cards in the deck
const allCards = [...card];
//deck
const deck = document.querySelector('.deck');

//moves
const getMoves = document.querySelector('.moves');
//initial value of moves
let moves = 0;

//time in minutes
const minutes = document.getElementById('minutes');
//time in seconds
const seconds = document.getElementById('seconds');
//time is initially off
let timeOff = true;
//initial value of time
let time = 0;
//variable of gameCounter function
let gameTime;

//stars
const stars = document.querySelectorAll('.stars-list');
//initial value of stars
let totalStars = 0;

//modal pop up
//stars in modal
const starsModal = document.querySelector('.starsNum');
//time in modal
const timeModal = document.querySelector('.timeNum');
//moves in modal
const movesModal = document.querySelector('.movesNum');
//play button in modal
const playAgain = document.getElementById('play-again');
//modal box with stats
const modalBox = document.querySelector('.modal-container');

//shuffle cards before game begins
window.onload = function() {
  shuffledCards();
}

//loop over each individual card
//a click on a single card
for (let i = 0; i < card.length; i++) {
  card[i].addEventListener('click', clickCard);
}

//function for clickCard mentioned previously
function clickCard() {
  //timer is turned on when a card is clicked
  if (timeOff) {
    gameCounter();
    timeOff = false;
  }
  //only 2 cards can be flipped over per guess
  //does not include the current card clicked
  if (openCards.length < 2 && !openCards.includes(this)) {
    //toggling the cards
    this.classList.toggle('show');
    this.classList.toggle('open');
    //if cards match, they are pushed into the openCards array
    openCards.push(this);
    //check if cards match or not
    checkMatch();
  }
}

//check if cards match or not
function checkMatch() {
  //only two cards are allowed
  if (openCards.length === 2) {
    //both must be identical
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      //if cards match, add 'match' to verify match and disable the cards
      openCards[0].classList.add('match', 'disable');
      openCards[1].classList.add('match', 'disable');
      //matched cards placed into flippedCards
      flippedCards += 2;
      //clear openCards for the next two guesses
      openCards = [];
      //number of moves player makes when cards match
      playerMoves();
      //starts a brand new game when all cards are matched
      newGame();
    } else {
      //if cards do not match, flip them over
      setTimeout(function() {
      openCards[0].classList.remove('open', 'show');
      openCards[1].classList.remove('open', 'show');
      //clear openCards for the next two guesses
      openCards = [];
      //number of moves player makes when cards do not match
      playerMoves();
      }, 350);
    }
  }
}

//number of moves player makes
function playerMoves() {
  moves++;
  getMoves.innerHTML = moves;
  //increase in moves results in a star removal
  removeStar();
}

//hides a star when moves increase
//each star will be hidden
function removeStar() {
  if (moves === 15) {
    stars[2].style.visibility = 'hidden';
  } if (moves === 20) {
    stars[1].style.visibility = 'hidden';
  } if (moves === 25) {
    stars[0].style.visibility = 'hidden';
  }

  //totalStars displayed on modal based on moves
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

//function for time
function gameCounter() {
  gameTime = setInterval(function() {
  time++;
  //display minutes and seconds (00:00)
  minutes.innerHTML = ('0' + parseInt(time/60)).substr(-2);
  seconds.innerHTML = ('0' + (time % 60)).substr(-2);
  }, 1000);
}

//player wins when all cards are matched
function newGame() {
  //total flippedCards and allCards are equal
  if (flippedCards === allCards.length) {
    //modal pops up to congratulate
    modalOpen();
    //time paused when modal pops up
    clearInterval(gameTime);
    //disables restart button when modal is open
    restartGame.classList.add('disable');
  }
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

//shuffling the cards
function shuffledCards() {
  const newCards = shuffle(allCards);
  for (let cards of newCards) {
    deck.appendChild(cards);
  }
}

//restart button
const restartGame = document.querySelector('.restart');
//a click to reset the game
restartGame.addEventListener('click', resetButton);
//function to reset game
function resetButton() {
  //resets stars, moves, time, flippedCards, and shuffles the cards
  location.reload();
}

//function for modal pop up
function modalOpen() {
  //toggles modal
  modalBox.classList.toggle('hide-modal');
  //time displayed on modal
  timeModal.innerHTML = 'Time: ' + minutes.innerText + ':' + seconds.innerText;
  //stars displayed on modal
  starsModal.innerHTML = 'Stars: ' + totalStars;
  //moves displayed on modal
  movesModal.innerHTML = 'Moves: ' + moves;
}
//hides modal
modalOpen();

//play again button in modal to restart the game
playAgain.addEventListener('click', function() {
  //resets the game with the resetButton function
  resetButton();
});