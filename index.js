let blockSize = 25;
let rows = 20;
let cols = 20;

let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let foodX;
let foodY;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

var gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = blockSize * rows;
  board.width = blockSize * cols;
  context = board.getContext("2d");
  addEventListener("keyup", changeDirection);

  placeFood();
  setInterval(update, 1000 / 10);
};

function update() {
  if (gameOver) {
    return;
  }
  context.fillStyle = "yellow";
  context.fillRect(0, 0, blockSize * rows, blockSize * cols);

  context.fillStyle = "green";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "red";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  // Check for collision with walls
  if (snakeX < 0 || snakeY >= blockSize * cols || snakeY < 0 || snakeX >= blockSize * rows) {
    gameOver = true;
    alert("Game Over");
    return; // Exit the function to prevent further execution
  }

  // Check for collision with own body
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
      return; // Exit the function to prevent further execution
    }
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * rows) * blockSize;
  foodY = Math.floor(Math.random() * cols) * blockSize;
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}
