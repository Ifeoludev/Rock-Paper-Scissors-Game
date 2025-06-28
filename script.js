const scoreEl = document.getElementById("score");
const resultEl = document.getElementById("result");
const roundLimitSelect = document.getElementById("round-limit");
const restartBtn = document.getElementById("restartBtn");

const rulesBtn = document.querySelector(".rules-btn");
const rulesModal = document.getElementById("rulesModal");
const closeRules = document.getElementById("closeRules");

const choices = ["rock", "paper", "scissors", "lizard", "spock"];
const outcomes = {
  rock: { beats: ["scissors", "lizard"] },
  paper: { beats: ["rock", "spock"] },
  scissors: { beats: ["paper", "lizard"] },
  lizard: { beats: ["spock", "paper"] },
  spock: { beats: ["scissors", "rock"] },
};

let score = parseInt(localStorage.getItem("rpsls-score")) || 0;
let roundLimit = parseInt(roundLimitSelect.value);
let roundsPlayed = 0;
let playerWins = 0;
let cpuWins = 0;

scoreEl.textContent = score;

// Play choice logic
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (roundLimit > 0 && roundsPlayed >= roundLimit) return;

    const player = btn.dataset.choice;
    const cpu = choices[Math.floor(Math.random() * choices.length)];
    const result = getResult(player, cpu);

    if (result === "win") {
      score++;
      playerWins++;
    } else if (result === "lose") {
      score--;
      cpuWins++;
    }

    roundsPlayed++;
    scoreEl.textContent = score;
    resultEl.textContent = `You ${result}! You: ${player} | CPU: ${cpu}`;
    localStorage.setItem("rpsls-score", score);

    if (roundLimit > 0 && roundsPlayed === roundLimit) {
      let finalMsg = "It's a draw!";
      if (playerWins > cpuWins) finalMsg = "You win the game!";
      else if (cpuWins > playerWins) finalMsg = "Computer wins the game!";
      resultEl.textContent += `\n\n${finalMsg}`;
      restartBtn.classList.remove("hidden");
    }
  });
});

// Calculating the result after the game
function getResult(player, cpu) {
  if (player === cpu) return "draw";
  if (outcomes[player].beats.includes(cpu)) return "win";
  return "lose";
}

// Function to restart the game
restartBtn.addEventListener("click", () => {
  score = 0;
  roundsPlayed = 0;
  playerWins = 0;
  cpuWins = 0;
  scoreEl.textContent = 0;
  resultEl.textContent = "";
  restartBtn.classList.add("hidden");
  localStorage.setItem("rpsls-score", 0);
});

roundLimitSelect.addEventListener("change", (e) => {
  roundLimit = parseInt(e.target.value);
  roundsPlayed = 0;
  playerWins = 0;
  cpuWins = 0;
  score = 0;
  scoreEl.textContent = 0;
  resultEl.textContent = "";
  restartBtn.classList.add("hidden");
  localStorage.setItem("rpsls-score", 0);
});

rulesBtn.addEventListener("click", () => rulesModal.classList.remove("hidden"));
closeRules.addEventListener("click", () => rulesModal.classList.add("hidden"));
