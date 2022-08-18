"use strict";
const gameContainer = document.querySelector(".game_container");
const cells = document.querySelectorAll(".game_cell");
const activePlayerText = document.querySelector(".player_active");
const btnRestart = document.querySelector(".btn_restart");

let spaces = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "X";
let winCombo = [];

////////////////////////////
// Add color to cell text //
///////////////////////////
const addColor = (e) => {
  if (currentPlayer === "X") {
    e.target.classList.add("pink");
  }
  if (currentPlayer === "O") {
    e.target.classList.add("yellow");
  }
};

///////////////
// Fill Cell //
//////////////
const updateCell = (e) => {
  if (activePlayerText.textContent.includes("has won")) return;
  e.target.textContent = currentPlayer;
};
/////////////////////////////////////////////////////////////
// Checks if winner exists before updated activePlayerText //
////////////////////////////////////////////////////////////
const checkIfDraw = () => {
  if (!spaces.includes(null)) {
    activePlayerText.textContent = `It's a draw!`;
    return true;
  }
};
/////////////////////////////////////
// Checks for winning combinations //
////////////////////////////////////
const playerHasWon = () => {
  if (spaces[0] === currentPlayer) {
    // Winner top horizonal
    if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
      winCombo = [0, 1, 2];
      return true;
    }
    // Winner top left vertical
    if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
      winCombo = [0, 3, 6];
      return true;
    }
    // Winner diagnal from top left or bottom right
    if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
      winCombo = [0, 4, 8];
      return true;
    }
  }
  if (spaces[8] === currentPlayer) {
    // Winner bottom horizonal
    if (spaces[7] === currentPlayer && spaces[6] === currentPlayer) {
      winCombo = [8, 7, 6];
      return true;
    }
    // Winner bottom right vertical
    if (spaces[5] === currentPlayer && spaces[2] === currentPlayer) {
      winCombo = [8, 5, 2];
      return true;
    }
  }
  if (spaces[4] === currentPlayer) {
    // Winner middle horizonal
    if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
      winCombo = [4, 3, 5];
      return true;
    }
    // Winner middle vertical
    if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
      winCombo = [4, 1, 7];
      return true;
    }
  }
  // Winner diagnal from top right or bottom left
  if (spaces[2] === currentPlayer) {
    if (spaces[4] === currentPlayer && spaces[6] === currentPlayer) {
      winCombo = [2, 4, 6];
      return true;
    }
  }
};
//////////////////////////////////////////////////////////////
// Checks if winner exists before updated activePlayerText //
////////////////////////////////////////////////////////////
const checkIfWinner = () => {
  if (playerHasWon()) {
    activePlayerText.textContent = `${currentPlayer} has won!`;
    winCombo.forEach((cell) => {
      const winningCell = document.getElementById(cell);
      winningCell.classList.add("cell_shadow");
    });
    return true;
  }
};

const cellClicked = (e) => {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    addColor(e);
    updateCell(e);
    if (checkIfWinner()) return;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (checkIfDraw()) return;
    activePlayerText.textContent = `${currentPlayer}'s turn`;
  }
};
///////////////////////
// Reset Everything //
/////////////////////
const restartGame = () => {
  spaces.forEach((_, i) => (spaces[i] = null));
  cells.forEach((cell) => (cell.textContent = ""));
  winCombo = [];
  cells.forEach((cell) => {
    if (cell.classList.contains("pink")) cell.classList.remove("pink");
    if (cell.classList.contains("yellow")) cell.classList.remove("yellow");
    if (cell.classList.contains("cell_shadow"))
      cell.classList.remove("cell_shadow");
  });
  currentPlayer = "X";
  activePlayerText.textContent = `${currentPlayer}'s turn`;
};

restartGame();

gameContainer.addEventListener("click", cellClicked);
btnRestart.addEventListener("click", restartGame);
