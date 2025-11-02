// Object to map user choice to an integer to perform battle mechanisms later
let choice = {
  0: "rock",
  1: "paper",
  2: "scissor"
};

let userCount = 0;
let compCount = 0;

// Function to take random move
function computerChoice() {
  return Math.floor(Math.random() * 3);
}

function display(result, userCount, compCount) {
  const userCounter = document.querySelector(".userCounter");
  const compCounter = document.querySelector(".compCounter");
  const resultDiv = document.querySelector("#result");

  userCounter.textContent = userCount;
  compCounter.textContent = compCount;
  resultDiv.textContent = `${result}`;
}

function versus(userMove) {
  let computerMove = computerChoice();

  if (userMove == computerMove + 1 || (userMove == 0 && computerMove == 2)) {
    userCount++;
    display("You won!!!", userCount, compCount);
  } else if (userMove == computerMove) {
    display("Draw!!!", userCount, compCount);
  } else {
    compCount++;
    display("You lost !!!", userCount, compCount);
  }
}

const moves = document.querySelector(".userMoves");

moves.addEventListener("click", (e) => {
  const clicked = e.target.closest(".move");
  if (!clicked) return; // Clicked outside buttons

  let userInput;
  clicked.style.backgroundColor = "grey";

  if (clicked.classList.contains("rock")) {
    userInput = 0;
  } else if (clicked.classList.contains("paper")) {
    userInput = 1;
  } else if (clicked.classList.contains("scissor")) {
    userInput = 2;
  }

  versus(userInput);

  setInterval(() => {
    clicked.style.backgroundColor = "#E0E0E0";
  }, 100);
});
