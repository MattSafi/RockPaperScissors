let countdownInterval;
let userHasChosen = false;
let lastComputerChoice = "";

let wins = 0;
let losses = 0;
let ties = 0;

let hasWon = false;
let hasLost = false;
let hasTied = false;

function startGame() {
  document.getElementById("countdown").style.visibility = "visible";
  document.getElementById("start-button").disabled = true;
  userHasChosen = false;

  const choices = document.querySelectorAll(".choice");
  choices.forEach((choice) => {
    choice.disabled = false;
  });

  let timeLeft = 10;
  document.getElementById(
    "countdown"
  ).innerText = `Time left to choose: ${timeLeft} seconds`;

  countdownInterval = setInterval(() => {
    timeLeft--;
    document.getElementById(
      "countdown"
    ).innerText = `Time left to choose: ${timeLeft} seconds`;

    if (timeLeft === 0) {
      clearInterval(countdownInterval);
      if (!userHasChosen) {
        endGame();
      }
    }
  }, 1000);
}

function playGame(userChoice) {
  if (!userHasChosen) {
    userHasChosen = true;
    clearInterval(countdownInterval);
    const choices = document.querySelectorAll(".choice");
    choices.forEach((choice) => {
      choice.disabled = true;
    });

    const choicesArray = ["rock", "paper", "scissors"];
    let computerChoice;

    do {
      computerChoice = choicesArray[Math.floor(Math.random() * 3)];
    } while (computerChoice === lastComputerChoice);

    lastComputerChoice = computerChoice;

    document.getElementById("user-choice-img").src = `images/${userChoice}.jpg`;
    document.getElementById(
      "computer-choice-img"
    ).src = `images/${computerChoice}.jpg`;

    let result = "";

    if (userChoice === computerChoice) {
      result = "It's a tie!";
      ties++;
      document.getElementById("tieSound").play();
    } else if (
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "paper" && computerChoice === "rock") ||
      (userChoice === "scissors" && computerChoice === "paper")
    ) {
      result = "You win!";
      wins++;
      document.getElementById("winSound").play();
    } else {
      result = "You lose!";
      losses++;
      document.getElementById("loseSound").play();
    }

    document.getElementById("outcome").innerText = result; // Just set the result
    updateTally();
    document.getElementById("countdown").style.visibility = "hidden"; // Hide countdown
    document.getElementById("start-button").disabled = false;
  }
}

function endGame() {
  document.getElementById("countdown").classList.add("hidden");
  document.getElementById("start-button").disabled = false;

  const choices = document.querySelectorAll(".choice");
  choices.forEach((choice) => {
    choice.disabled = true;
  });

  document.getElementById("outcome").innerText =
    "Time is up! You didn't make a choice.";
}

function updateTally() {
  const tallyElement = document.getElementById("tally");
  tallyElement.innerHTML = `Wins: ${wins} <br> Losses: ${losses} <br> Ties: ${ties}`;

  if (!hasWon && wins >= 10) {
    hasWon = true;
    displayMessage(
      "You reached 10 wins! What a Cool Cat! :D"
    );
  } else if (!hasLost && losses >= 10) {
    hasLost = true;
    displayMessage("You reached 10 losses! Must suck to suck lmao!");
  } else if (!hasTied && ties >= 10) {
    hasTied = true;
    displayMessage(
      "You reached 10 ties! Just be better, bro what's your problem?"
    );
  }
}

function displayMessage(message) {
  alert(message);
}
