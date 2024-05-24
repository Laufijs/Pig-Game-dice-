'use strict';

const player1Element = document.querySelector('.player--1');
const player0Element = document.querySelector('.player--0');
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');
const buttonRules = document.querySelector('.btn--rules');
const currentScorePlayerOne = document.getElementById('current--0');
const currentScorePlayerTwo = document.getElementById('current--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const buttonCloseModal = document.querySelector('.close-modal');
const buttonOpenModal = document.querySelector('.show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

let currentScore, activePlayer, playingGame;
let scores = [0, 0];

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playingGame = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScorePlayerOne.textContent = 0;
  currentScorePlayerTwo.textContent = 0;

  diceElement.classList.add('hidden');

  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');

  document.querySelector('#name--0').textContent = 'Player One Score :';
  document.querySelector('#name--1').textContent = 'Player Two Score :';
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

const checkWinner = function () {
  if (scores[activePlayer] >= 50) {
    playingGame = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    diceElement.classList.add('hidden');

    // Display winner message
    document.getElementById(`name--${activePlayer}`).textContent =
      'Congratulations, you Win! 🎉';
    document.getElementById(`name--${activePlayer === 0 ? 1 : 0}`).textContent =
      'Better luck next time! 😕';
  }
};

buttonRoll.addEventListener('click', function () {
  if (playingGame) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

buttonHold.addEventListener('click', function () {
  if (playingGame) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    checkWinner();
    if (playingGame) {
      switchPlayer();
    }
  }
});

buttonNew.addEventListener('click', init);
buttonRules.addEventListener('click', openModal);
buttonCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
