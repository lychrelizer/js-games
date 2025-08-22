function resetGame() {
  game.lives = MAX_LIVES;
  game.score = 0;
  game.gameOver = false;
  game.started = false;
  scoreDisplayElem.innerText = game.score;
  livesDisplayElem.innerText = game.lives;
  screenGameOverElem.style.display = "none";
  animationRepeat = 0;
}

function gameStart(e) {
  e.preventDefault();
  resetGame();
  cancelAnimationFrame(animationRepeat);
  animationRepeat = requestAnimationFrame(update);
}

function update() {
  if (game.gameOver === false) {
    let pCurrent = paddleElem.offsetLeft;

    if (paddleElem.left && paddleElem.offsetLeft > +25) {
      pCurrent -= 5;
    } else if (
      paddleElem.right &&
      paddleElem.offsetLeft < containerDim.width - paddleElem.offsetWidth - 25
    ) {
      pCurrent += 5;
    }

    paddleElem.style.left = pCurrent + "px";

    if (!game.started) {
      waitingOnPaddle();
    } else {
      ballMove();
    }

    animationRepeat = requestAnimationFrame(update);
  }
}

function waitingOnPaddle() {
  ballElem.style.top = paddleElem.offsetTop - ballElem.offsetHeight + "px";
  ballElem.style.left =
    paddleElem.offsetLeft +
    paddleElem.offsetWidth / 2 -
    ballElem.offsetWidth / 2 +
    "px";
}

function ballMove() {
  let x = ballElem.offsetLeft;
  let y = ballElem.offsetTop;

  x += game.ballDir[0];
  y += game.ballDir[1];

  if (x > containerDim.width - ballElem.offsetWidth - 25 || x < 25) {
    game.ballDir[0] = game.ballDir[0] * -1;
  }

  if (y > containerDim.height - ballElem.offsetHeight - 25 || y < 25) {
    game.ballDir[1] = game.ballDir[1] * -1;
  }

  ballElem.style.top = y + "px";
  ballElem.style.left = x + "px";
}
