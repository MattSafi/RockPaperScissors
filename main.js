// Initialize tally counters
let wins = 0;
let draws = 0;
let losses = 0;

function playGame(playerChoice) {
  const countdownElement = document.getElementById("countdown");
  const opponentChoiceElement = document.getElementById("opponent-choice");
  const opponentImage = document.getElementById("opponent-image");
  const resultMessageElement = document.getElementById("result-message");
  const resetButton = document.getElementById("reset-button");
  const tallyElement = document.getElementById("tally");

  // Hide other buttons
  const buttons = document.querySelectorAll(".choice");
  buttons.forEach((button) => {
    button.disabled = true;
    if (button.id !== playerChoice) {
      button.style.display = "none";
    }
  });

  // Show countdown
  let countdown = 3;
  countdownElement.style.visibility = "visible";
  countdownElement.textContent = countdown;

  const countdownInterval = setInterval(() => {
    countdown--;
    countdownElement.textContent = countdown;

    if (countdown === 0) {
      clearInterval(countdownInterval);
      countdownElement.style.visibility = "hidden";

      // Generate opponent's random choice
      const choices = ["rock", "paper", "scissors"];
      const opponentChoice =
        choices[Math.floor(Math.random() * choices.length)];

      // Determine the winner
      let resultMessage;
      if (playerChoice === opponentChoice) {
        resultMessage = "It's a draw!";
        draws++;
      } else if (
        (playerChoice === "rock" && opponentChoice === "scissors") ||
        (playerChoice === "scissors" && opponentChoice === "paper") ||
        (playerChoice === "paper" && opponentChoice === "rock")
      ) {
        resultMessage = "You win!";
        wins++;
      } else {
        resultMessage = "You lose!";
        losses++;
      }

      // Update tally
      tallyElement.textContent = `Wins: ${wins} - Draws: ${draws} - Losses: ${losses}`;

      // Display the opponent's choice image and result
      opponentChoiceElement.textContent = `Opponent chose:`;
      opponentImage.src = `images/${opponentChoice}.jpg`; // Use images matching your file names
      opponentImage.style.display = "block";
      resultMessageElement.textContent = resultMessage;

      // Show the reset button
      resetButton.style.display = "block";
    }
  }, 1000);
}

function resetGame() {
  const buttons = document.querySelectorAll(".choice");
  const countdownElement = document.getElementById("countdown");
  const opponentChoiceElement = document.getElementById("opponent-choice");
  const opponentImage = document.getElementById("opponent-image");
  const resultMessageElement = document.getElementById("result-message");
  const resetButton = document.getElementById("reset-button");

  // Reset visibility of all buttons
  buttons.forEach((button) => {
    button.style.display = "inline-block";
    button.disabled = false;
  });

  // Hide countdown, opponent's choice, result message, and reset button
  countdownElement.style.visibility = "hidden";
  opponentChoiceElement.textContent = "";
  opponentImage.style.display = "none";
  resultMessageElement.textContent = "";
  resetButton.style.display = "none";
}
