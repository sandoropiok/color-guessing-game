// Initialize variables
let numSquares = 6; // Default mode is "Hard" with 6 squares
let colors = [];
let correctColor;

// Select DOM elements
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("color-display");
const messageDisplay = document.getElementById("message");
const resetButton = document.getElementById("reset");
const modeButtons = document.querySelectorAll(".mode");
const header = document.querySelector("h1"); // Select the header element to change its color

// Initialize the game
init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

// Set up mode buttons for difficulty selection
function setupModeButtons() {
  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove the "selected" class from all buttons
      modeButtons.forEach((btn) => btn.classList.remove("selected"));
      // Add the "selected" class to the clicked button
      button.classList.add("selected");
      // Set numSquares based on button text
      numSquares = button.textContent === "Easy" ? 3 : 6;
      reset();
    });
  });
}

// Set up squares with event listeners
function setupSquares() {
  squares.forEach((square) => {
    square.addEventListener("click", () => {
      const clickedColor = square.style.backgroundColor;
      if (clickedColor === correctColor) {
        messageDisplay.textContent = "CORRECT!";
        changeColors(correctColor);
        header.style.backgroundColor = correctColor; // Change header color to correct color
        resetButton.textContent = "Play Again?";
      } else {
        square.style.backgroundColor = "#232323"; // Hide the wrong square
        messageDisplay.textContent = "TRY AGAIN";
      }
    });
  });
}

// Reset the game with new colors and update the UI
function reset() {
  colors = generateRandomColors(numSquares);
  correctColor = pickCorrectColor();
  colorDisplay.textContent = correctColor;
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";
  header.style.backgroundColor = "#2C8E99"; // Reset header background color

  squares.forEach((square, index) => {
    if (colors[index]) {
      square.style.display = "block";
      square.style.backgroundColor = colors[index];
    } else {
      square.style.display = "none"; // Hide extra squares for easy mode
    }
  });
}

// Change all squares to the correct color when guessed correctly
function changeColors(color) {
  squares.forEach((square) => {
    square.style.backgroundColor = color;
  });
}

// Pick a random color from the colors array as the "correct" color
function pickCorrectColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// Generate an array of random colors
function generateRandomColors(num) {
  const colors = [];
  for (let i = 0; i < num; i++) {
    colors.push(randomColor());
  }
  return colors;
}

// Generate random rgb
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Reset button event listener to start a new game
resetButton.addEventListener("click", reset);
