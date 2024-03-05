let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  loses: 0,
  ties: 0
};
let movesRemaining = 5;

updateScoreElement();

function playGame(playerMove) {
  if (movesRemaining > 0) {
      const computerMove = pickComputerMove();
      let result = '';
      let reason = '';

      if (playerMove === 'scissors') {
          if (computerMove === 'rock') {
              result = 'You lose.';
              reason = 'Rock crushes scissors.';
          } else if (computerMove === 'paper') {
              result = 'You win.';
              reason = 'Scissors cut paper.';
          } else if (computerMove === 'scissors') {
              result = 'Tie.';
              reason = 'It\'s a tie!';
          }
      } else if (playerMove === 'paper') {
          if (computerMove === 'rock') {
              result = 'You win.';
              reason = 'Paper covers rock.';
          } else if (computerMove === 'paper') {
              result = 'Tie.';
              reason = 'It\'s a tie!';
          } else if (computerMove === 'scissors') {
              result = 'You lose.';
              reason = 'Scissors cut paper.';
          }
      } else if (playerMove === 'rock') {
          if (computerMove === 'rock') {
              result = 'Tie.';
              reason = 'It\'s a tie!';
          } else if (computerMove === 'paper') {
              result = 'You lose.';
              reason = 'Paper covers rock.';
          } else if (computerMove === 'scissors') {
              result = 'You win.';
              reason = 'Rock crushes scissors.';
          }
      }

      if (result === 'You win.') {
          score.wins++;
      } else if (result === 'You lose.') {
          score.loses++;
      } else if (result === 'Tie.') {
          score.ties++;
      }

      movesRemaining--;
      localStorage.setItem('score', JSON.stringify(score));

      document.querySelector('.js-score').innerHTML =
          `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;
      updateScoreElement();
      document.querySelector('.js-result').innerHTML = result;
      document.querySelector('.js-moves').innerHTML =
          `You
                  <img src="images/${playerMove}-emoji.png" class="move-icon">
                  <img src="images/${computerMove}-emoji.png" class="move-icon">
                  Computer`;

      if (movesRemaining === 0) {
          displayGameResult();
      }
  } else {
      displayGameResult();
  }
}

function displayGameResult() {
  const overallResult = determineOverallResult();
  const totalResult = `Game Over! ${overallResult}\n`;
  document.querySelector('.js-moves').innerHTML = totalResult;
}

function determineOverallResult() {
  if (score.wins > score.loses) {
      return `You won the overall game! `;
  } else if (score.wins < score.loses) {
      return `You lost the overall game. `;
  } else {
      return `It's a tie in the overall game.`;
  }
}

function resetGame() {
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  movesRemaining = 5;
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML =
      `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
      return 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      return 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      return 'scissors';
  }
}
