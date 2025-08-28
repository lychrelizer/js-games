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
  //cancelAnimationFrame(animationRepeat);
  //animationRepeat = requestAnimationFrame(update);
  update();
}

function update() {
  if (game.gameOver === false) {
    let pCurrent = paddleElem.offsetLeft;

    // handle acc
    if (paddleElem.left && game.paddleAcc > -16) {
      game.paddleAcc--;
    } else if (paddleElem.right && game.paddleAcc < 16) {
      game.paddleAcc++;
    } else {
      if (game.paddleAcc < 0) {
        game.paddleAcc++;
      } else if (game.paddleAcc > 0) {
        game.paddleAcc--;
      }
    }

    if (
      paddleElem.offsetLeft >= 25 &&
      paddleElem.offsetLeft <= containerDim.width - paddleElem.offsetWidth - 25
    ) {
      pCurrent += game.paddleAcc;

      if (
        pCurrent > 25 &&
        pCurrent < containerDim.width - paddleElem.offsetWidth - 25
      ) {
        paddleElem.style.left = pCurrent + "px";
      } else {
        game.paddleAcc = 0;
      }
    }

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

  if (isCollide(ballElem, paddleElem)) {
    game.ballDir[1] = game.ballDir[1] * -1;
    game.ballDir[0] =
      (x - paddleElem.offsetLeft - paddleElem.offsetWidth / 2) / 10;
  }
}

function isCollide(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  if (
    aRect.top + aRect.height >= bRect.top &&
    aRect.left + aRect.width >= bRect.left &&
    aRect.left < bRect.left + bRect.width
  ) {
    return true;
  }

  return false;
}
