const choices = ["rock", "paper", "scissors"];
let playerHistory = [];
let playerScore = 0;
let aiScore = 0;

function playRound(playerChoice) {
  playerHistory.push(playerChoice);
  const aiChoice = getAIChoice();
  const result = determineWinner(playerChoice, aiChoice);
  updateUI(playerChoice, aiChoice, result);
}

function getAIChoice() {
  if (playerHistory.length < 5) {
    // Random choice for first 5 moves
    return choices[Math.floor(Math.random() * choices.length)];
  }

  // 30% chance to pick randomly to keep AI unpredictable
  if (Math.random() < 0.3) {
    return choices[Math.floor(Math.random() * choices.length)];
  }

  // Analyze only last 5 player moves
  const recentMoves = playerHistory.slice(-5);
  const count = { rock: 0, paper: 0, scissors: 0 };
  recentMoves.forEach(move => count[move]++);

  // Predict player’s most frequent recent move
  const mostPlayed = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);

  // Return AI move to counter predicted player move
  return counterMove(mostPlayed);
}

function counterMove(move) {
  if (move === "rock") return "paper";
  if (move === "paper") return "scissors";
  return "rock";
}

function determineWinner(player, ai) {
  if (player === ai) return "draw";

  if (
    (player === "rock" && ai === "scissors") ||
    (player === "paper" && ai === "rock") ||
    (player === "scissors" && ai === "paper")
  ) {
    playerScore++;
    return "player";
  } else {
    aiScore++;
    return "ai";
  }
}

function updateUI(player, ai, result) {
  const resultDiv = document.getElementById("result");
  const playerScoreEl = document.getElementById("playerScore");
  const aiScoreEl = document.getElementById("aiScore");

  let message = `You chose ${player} | AI chose ${ai}. `;

  if (result === "draw") {
    message += "It's a draw!";
  } else if (result === "player") {
    message += "You win!";
  } else {
    message += "AI wins!";
  }

  resultDiv.innerText = message;
  playerScoreEl.innerText = playerScore;
  aiScoreEl.innerText = aiScore;
}

function resetGame() {
  playerHistory = [];
  playerScore = 0;
  aiScore = 0;

  document.getElementById("playerScore").innerText = "0";
  document.getElementById("aiScore").innerText = "0";
  document.getElementById("result").innerText = "Game reset! Start playing again.";
}
