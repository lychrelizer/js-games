const gameElem = document.getElementById("game");
const ballElem = document.getElementById("ball");
const paddleElem = document.getElementById("paddle");

const scoreDisplayElem = document.getElementById("game-display-score");
const livesDisplayElem = document.getElementById("game-display-lives");

const screenGameOverElem = document.getElementById("game-screen-gameover");

const btnStartGame = document.getElementById("game-btn-start");

btnStartGame.addEventListener("click", gameStart);
