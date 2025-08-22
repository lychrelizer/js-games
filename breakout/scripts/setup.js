const gameElem = document.getElementById("game");
const ballElem = document.getElementById("ball");
const paddleElem = document.getElementById("paddle");
const scoreDisplayElem = document.getElementById("game-display-score");
const livesDisplayElem = document.getElementById("game-display-lives");
const screenGameOverElem = document.getElementById("game-screen-gameover");
const btnStartGame = document.getElementById("game-btn-start");

// basic game setup
const MAX_LIVES = 3;

const game = {
  gameOver: true,
  started: false,
  score: 0,
  lives: MAX_LIVES,
  ballDir: [5, 5, 5],
};

let animationRepeat;
let containerDim = gameElem.getBoundingClientRect();

console.log(containerDim);

// set events
btnStartGame.addEventListener("click", gameStart);

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  let key = e.key;
  console.log(key);
  if (key === "ArrowLeft") paddleElem.left = true;
  else if (key === "ArrowRight") paddleElem.right = true;
  else if (key === " ") game.started = true;
});
document.addEventListener("keyup", (e) => {
  e.preventDefault();
  let key = e.key;
  if (key === "ArrowLeft") paddleElem.left = false;
  else if (key === "ArrowRight") paddleElem.right = false;
});
